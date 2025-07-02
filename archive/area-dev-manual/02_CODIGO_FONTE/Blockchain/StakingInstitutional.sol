// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

/**
 * @title StakingInstitutional
 * @dev Contrato para staking institucional e governança do ecossistema SealSafe
 * @custom:security-contact security@sealsafe.com.br
 */
contract StakingInstitutional is AccessControl, Pausable, ReentrancyGuard, ERC1155Holder {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");
    
    // Interface para o contrato CarbonMint
    IERC1155 public carbonToken;
    
    // Tipos de instituições
    enum InstitutionType { MUNICIPALITY, INSURER, FLEET_OPERATOR, REGULATOR }
    
    // Estrutura para representar uma instituição
    struct Institution {
        string name;
        InstitutionType institutionType;
        address wallet;
        uint256 reputationScore;
        bool isActive;
        uint256 registrationTime;
    }
    
    // Estrutura para representar um stake
    struct Stake {
        uint256 tokenId;
        uint256 amount;
        uint256 startTime;
        uint256 lockPeriod;
        bool isActive;
    }
    
    // Estrutura para representar uma proposta de governança
    struct Proposal {
        string description;
        address proposer;
        uint256 startTime;
        uint256 endTime;
        uint256 forVotes;
        uint256 againstVotes;
        bool executed;
        bool passed;
        bytes executionData;
        mapping(address => bool) hasVoted;
    }
    
    // Mapeamento de endereços para instituições
    mapping(address => Institution) public institutions;
    
    // Mapeamento de instituições para seus stakes
    mapping(address => Stake[]) public institutionStakes;
    
    // Array de todas as instituições registradas
    address[] public registeredInstitutions;
    
    // Contador de propostas
    uint256 private _proposalCounter;
    
    // Mapeamento de IDs de propostas para propostas
    mapping(uint256 => Proposal) public proposals;
    
    // Período mínimo de lock para staking (30 dias em segundos)
    uint256 public constant MIN_LOCK_PERIOD = 30 days;
    
    // Período máximo de lock para staking (365 dias em segundos)
    uint256 public constant MAX_LOCK_PERIOD = 365 days;
    
    // Período de votação para propostas (7 dias em segundos)
    uint256 public constant VOTING_PERIOD = 7 days;
    
    // Eventos
    event InstitutionRegistered(address indexed institution, string name, InstitutionType institutionType);
    event InstitutionActivated(address indexed institution);
    event InstitutionDeactivated(address indexed institution);
    event TokensStaked(address indexed institution, uint256 tokenId, uint256 amount, uint256 lockPeriod);
    event TokensUnstaked(address indexed institution, uint256 tokenId, uint256 amount);
    event ReputationUpdated(address indexed institution, uint256 newScore);
    event ProposalCreated(uint256 indexed proposalId, address proposer, string description);
    event VoteCast(uint256 indexed proposalId, address voter, bool support, uint256 weight);
    event ProposalExecuted(uint256 indexed proposalId, bool passed);
    event RewardDistributed(address indexed institution, uint256 amount);

    /**
     * @dev Construtor do contrato
     * @param _carbonToken Endereço do contrato CarbonMint
     */
    constructor(address _carbonToken) {
        require(_carbonToken != address(0), "Invalid token address");
        carbonToken = IERC1155(_carbonToken);
        
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(GOVERNANCE_ROLE, msg.sender);
        
        _proposalCounter = 1; // Começamos do ID 1
    }

    /**
     * @dev Pausa todas as operações do contrato
     * @notice Apenas administradores podem chamar esta função
     */
    function pause() public onlyRole(ADMIN_ROLE) {
        _pause();
    }

    /**
     * @dev Despausa todas as operações do contrato
     * @notice Apenas administradores podem chamar esta função
     */
    function unpause() public onlyRole(ADMIN_ROLE) {
        _unpause();
    }

    /**
     * @dev Registra uma nova instituição
     * @param name Nome da instituição
     * @param institutionType Tipo da instituição
     * @param institutionWallet Endereço da carteira da instituição
     * @notice Apenas administradores podem chamar esta função
     */
    function registerInstitution(
        string memory name,
        InstitutionType institutionType,
        address institutionWallet
    ) public onlyRole(ADMIN_ROLE) {
        require(institutionWallet != address(0), "Invalid wallet address");
        require(institutions[institutionWallet].wallet == address(0), "Institution already registered");
        
        institutions[institutionWallet] = Institution({
            name: name,
            institutionType: institutionType,
            wallet: institutionWallet,
            reputationScore: 100, // Score inicial
            isActive: true,
            registrationTime: block.timestamp
        });
        
        registeredInstitutions.push(institutionWallet);
        
        // Concede papel de governança para a instituição
        grantRole(GOVERNANCE_ROLE, institutionWallet);
        
        emit InstitutionRegistered(institutionWallet, name, institutionType);
    }

    /**
     * @dev Ativa uma instituição
     * @param institutionWallet Endereço da carteira da instituição
     * @notice Apenas administradores podem chamar esta função
     */
    function activateInstitution(address institutionWallet) public onlyRole(ADMIN_ROLE) {
        require(institutions[institutionWallet].wallet != address(0), "Institution not registered");
        require(!institutions[institutionWallet].isActive, "Institution already active");
        
        institutions[institutionWallet].isActive = true;
        
        // Restaura papel de governança
        grantRole(GOVERNANCE_ROLE, institutionWallet);
        
        emit InstitutionActivated(institutionWallet);
    }

    /**
     * @dev Desativa uma instituição
     * @param institutionWallet Endereço da carteira da instituição
     * @notice Apenas administradores podem chamar esta função
     */
    function deactivateInstitution(address institutionWallet) public onlyRole(ADMIN_ROLE) {
        require(institutions[institutionWallet].wallet != address(0), "Institution not registered");
        require(institutions[institutionWallet].isActive, "Institution already inactive");
        
        institutions[institutionWallet].isActive = false;
        
        // Remove papel de governança
        revokeRole(GOVERNANCE_ROLE, institutionWallet);
        
        emit InstitutionDeactivated(institutionWallet);
    }

    /**
     * @dev Realiza stake de tokens
     * @param tokenId ID do token a ser colocado em stake
     * @param amount Quantidade de tokens
     * @param lockPeriod Período de lock em segundos
     * @notice Apenas instituições registradas e ativas podem chamar esta função
     */
    function stakeTokens(
        uint256 tokenId,
        uint256 amount,
        uint256 lockPeriod
    ) public whenNotPaused nonReentrant {
        require(institutions[msg.sender].wallet != address(0), "Institution not registered");
        require(institutions[msg.sender].isActive, "Institution not active");
        require(amount > 0, "Amount must be greater than zero");
        require(lockPeriod >= MIN_LOCK_PERIOD, "Lock period too short");
        require(lockPeriod <= MAX_LOCK_PERIOD, "Lock period too long");
        
        // Transfere tokens do remetente para este contrato
        carbonToken.safeTransferFrom(msg.sender, address(this), tokenId, amount, "");
        
        // Cria um novo stake
        Stake memory newStake = Stake({
            tokenId: tokenId,
            amount: amount,
            startTime: block.timestamp,
            lockPeriod: lockPeriod,
            isActive: true
        });
        
        // Adiciona o stake à lista de stakes da instituição
        institutionStakes[msg.sender].push(newStake);
        
        emit TokensStaked(msg.sender, tokenId, amount, lockPeriod);
    }

    /**
     * @dev Retira tokens do stake após o período de lock
     * @param stakeIndex Índice do stake na lista de stakes da instituição
     * @notice Apenas o proprietário do stake pode chamar esta função
     */
    function unstakeTokens(uint256 stakeIndex) public whenNotPaused nonReentrant {
        require(institutions[msg.sender].wallet != address(0), "Institution not registered");
        require(stakeIndex < institutionStakes[msg.sender].length, "Invalid stake index");
        
        Stake storage stake = institutionStakes[msg.sender][stakeIndex];
        require(stake.isActive, "Stake not active");
        require(block.timestamp >= stake.startTime + stake.lockPeriod, "Lock period not ended");
        
        uint256 tokenId = stake.tokenId;
        uint256 amount = stake.amount;
        
        // Marca o stake como inativo
        stake.isActive = false;
        
        // Transfere tokens de volta para a instituição
        carbonToken.safeTransferFrom(address(this), msg.sender, tokenId, amount, "");
        
        emit TokensUnstaked(msg.sender, tokenId, amount);
    }

    /**
     * @dev Atualiza o score de reputação de uma instituição
     * @param institutionWallet Endereço da carteira da instituição
     * @param newScore Novo score de reputação
     * @notice Apenas administradores podem chamar esta função
     */
    function updateReputationScore(address institutionWallet, uint256 newScore) public onlyRole(ADMIN_ROLE) {
        require(institutions[institutionWallet].wallet != address(0), "Institution not registered");
        require(newScore <= 1000, "Score too high"); // Máximo de 1000 pontos
        
        institutions[institutionWallet].reputationScore = newScore;
        
        emit ReputationUpdated(institutionWallet, newScore);
    }

    /**
     * @dev Cria uma nova proposta de governança
     * @param description Descrição da proposta
     * @param executionData Dados para execução da proposta se aprovada
     * @notice Apenas instituições com papel de governança podem chamar esta função
     */
    function createProposal(
        string memory description,
        bytes memory executionData
    ) public onlyRole(GOVERNANCE_ROLE) whenNotPaused {
        require(institutions[msg.sender].isActive, "Institution not active");
        
        uint256 proposalId = _proposalCounter;
        _proposalCounter++;
        
        Proposal storage newProposal = proposals[proposalId];
        newProposal.description = description;
        newProposal.proposer = msg.sender;
        newProposal.startTime = block.timestamp;
        newProposal.endTime = block.timestamp + VOTING_PERIOD;
        newProposal.executionData = executionData;
        
        emit ProposalCreated(proposalId, msg.sender, description);
    }

    /**
     * @dev Vota em uma proposta
     * @param proposalId ID da proposta
     * @param support Verdadeiro para votar a favor, falso para votar contra
     * @notice Apenas instituições com papel de governança podem chamar esta função
     */
    function castVote(uint256 proposalId, bool support) public onlyRole(GOVERNANCE_ROLE) whenNotPaused {
        require(institutions[msg.sender].isActive, "Institution not active");
        
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp >= proposal.startTime, "Voting not started");
        require(block.timestamp <= proposal.endTime, "Voting ended");
        require(!proposal.hasVoted[msg.sender], "Already voted");
        
        // Calcula o peso do voto baseado no stake total e reputação
        uint256 voteWeight = _calculateVoteWeight(msg.sender);
        require(voteWeight > 0, "No voting power");
        
        proposal.hasVoted[msg.sender] = true;
        
        if (support) {
            proposal.forVotes += voteWeight;
        } else {
            proposal.againstVotes += voteWeight;
        }
        
        emit VoteCast(proposalId, msg.sender, support, voteWeight);
    }

    /**
     * @dev Executa uma proposta após o período de votação
     * @param proposalId ID da proposta
     * @notice Qualquer um pode chamar esta função após o período de votação
     */
    function executeProposal(uint256 proposalId) public whenNotPaused {
        Proposal storage proposal = proposals[proposalId];
        require(block.timestamp > proposal.endTime, "Voting not ended");
        require(!proposal.executed, "Already executed");
        
        proposal.executed = true;
        
        // Verifica se a proposta passou
        if (proposal.forVotes > proposal.againstVotes) {
            proposal.passed = true;
            // Aqui seria implementada a lógica para executar a proposta
            // usando os dados em proposal.executionData
        }
        
        emit ProposalExecuted(proposalId, proposal.passed);
    }

    /**
     * @dev Distribui recompensas para instituições baseado em contribuições
     * @param institutions Array de endereços das instituições
     * @param amounts Array de quantidades de recompensas
     * @param tokenId ID do token de recompensa
     * @notice Apenas administradores podem chamar esta função
     */
    function distributeRewards(
        address[] memory institutions,
        uint256[] memory amounts,
        uint256 tokenId
    ) public onlyRole(ADMIN_ROLE) whenNotPaused {
        require(institutions.length == amounts.length, "Arrays length mismatch");
        
        for (uint256 i = 0; i < institutions.length; i++) {
            address institution = institutions[i];
            uint256 amount = amounts[i];
            
            require(this.institutions(institution).wallet != address(0), "Institution not registered");
            require(this.institutions(institution).isActive, "Institution not active");
            
            // Transfere tokens de recompensa para a instituição
            carbonToken.safeTransferFrom(address(this), institution, tokenId, amount, "");
            
            emit RewardDistributed(institution, amount);
        }
    }

    /**
     * @dev Retorna o número total de instituições registradas
     * @return uint256 Número de instituições
     */
    function getInstitutionCount() public view returns (uint256) {
        return registeredInstitutions.length;
    }

    /**
     * @dev Retorna o número de stakes de uma instituição
     * @param institution Endereço da instituição
     * @return uint256 Número de stakes
     */
    function getStakeCount(address institution) public view returns (uint256) {
        return institutionStakes[institution].length;
    }

    /**
     * @dev Retorna o stake total de uma instituição
     * @param institution Endereço da instituição
     * @return uint256 Stake total
     */
    function getTotalStake(address institution) public view returns (uint256) {
        uint256 total = 0;
        Stake[] memory stakes = institutionStakes[institution];
        
        for (uint256 i = 0; i < stakes.length; i++) {
            if (stakes[i].isActive) {
                total += stakes[i].amount;
            }
        }
        
        return total;
    }

    /**
     * @dev Calcula o peso do voto de uma instituição
     * @param institution Endereço da instituição
     * @return uint256 Peso do voto
     */
    function _calculateVoteWeight(address institution) internal view returns (uint256) {
        uint256 totalStake = getTotalStake(institution);
        uint256 reputation = institutions[institution]
(Content truncated due to size limit. Use line ranges to read in chunks)