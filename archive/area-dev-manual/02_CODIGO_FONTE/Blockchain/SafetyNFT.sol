// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title SafetyNFT
 * @dev Implementação de token ERC-721 para certificados de segurança veicular
 * baseados em dados de telemetria do sistema GuardDrive | Selfbelt.
 * 
 * Este contrato permite a emissão de certificados não-fungíveis que representam
 * comportamentos seguros verificáveis, como uso correto do cinto de segurança,
 * proteção de passageiros vulneráveis e padrões de condução seguros.
 *
 * @author GuardDrive | Selfbelt
 * @notice Este contrato é parte do ecossistema de tokenização ESG do GuardDrive
 * @custom:security-contact security@guardrive.com
 */
contract SafetyNFT is ERC721, ERC721URIStorage, ERC721Enumerable, AccessControl, Pausable {
    using Counters for Counters.Counter;
    using Strings for uint256;

    // Definição de roles para controle de acesso
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant VALIDATOR_ROLE = keccak256("VALIDATOR_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    // Contador para IDs de certificados
    Counters.Counter private _tokenIdCounter;

    // Mapeamento de metadados para cada certificado
    mapping(uint256 => SafetyCertificate) private _certificates;

    // Estrutura para certificado de segurança
    struct SafetyCertificate {
        string name;               // Nome do certificado (ex: "Selfbelt Safety Certificate Q2 2025")
        string description;        // Descrição detalhada
        uint256 creationDate;      // Timestamp de criação
        uint256 expirationDate;    // Timestamp de expiração
        address validator;         // Endereço do validador
        bytes32 dataHash;          // Hash dos dados de origem
        uint256 safetyScore;       // Pontuação de segurança (0-100)
        string vehicleId;          // Identificador do veículo (anonimizado)
        string certificateType;    // Tipo de certificado (ex: "Seatbelt Usage", "Child Protection")
        string[] metrics;          // Lista de métricas avaliadas
        uint256[] scores;          // Pontuações para cada métrica
        bool isVerified;           // Status de verificação
    }

    // Eventos
    event CertificateMinted(uint256 indexed tokenId, address indexed to, bytes32 dataHash, string certificateType);
    event CertificateVerified(uint256 indexed tokenId, address indexed validator, bool status);
    event CertificateRevoked(uint256 indexed tokenId, address indexed revoker, string reason);
    event CertificateRenewed(uint256 indexed tokenId, uint256 newExpirationDate);

    /**
     * @dev Construtor do contrato
     * @param name_ Nome do token NFT
     * @param symbol_ Símbolo do token NFT
     */
    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(VALIDATOR_ROLE, msg.sender);
    }

    /**
     * @dev Cria um novo certificado de segurança
     * @param to Endereço do destinatário
     * @param certificate Dados do certificado
     * @param tokenURI URI dos metadados do certificado
     * @return tokenId ID do certificado criado
     */
    function mintCertificate(
        address to,
        SafetyCertificate memory certificate,
        string memory tokenURI
    ) public onlyRole(MINTER_ROLE) whenNotPaused returns (uint256) {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        
        _certificates[tokenId] = certificate;
        _certificates[tokenId].creationDate = block.timestamp;
        _certificates[tokenId].isVerified = false;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        emit CertificateMinted(tokenId, to, certificate.dataHash, certificate.certificateType);
        
        return tokenId;
    }

    /**
     * @dev Verifica um certificado existente por um validador autorizado
     * @param tokenId ID do certificado a ser verificado
     * @param status Status de verificação
     */
    function verifyCertificate(uint256 tokenId, bool status) 
        public 
        onlyRole(VALIDATOR_ROLE) 
        whenNotPaused 
    {
        require(_exists(tokenId), "Certificate does not exist");
        
        _certificates[tokenId].validator = msg.sender;
        _certificates[tokenId].isVerified = status;
        
        emit CertificateVerified(tokenId, msg.sender, status);
    }

    /**
     * @dev Revoga um certificado
     * @param tokenId ID do certificado a ser revogado
     * @param reason Motivo da revogação
     */
    function revokeCertificate(uint256 tokenId, string memory reason) 
        public 
        onlyRole(ADMIN_ROLE) 
    {
        require(_exists(tokenId), "Certificate does not exist");
        
        _certificates[tokenId].isVerified = false;
        
        emit CertificateRevoked(tokenId, msg.sender, reason);
    }

    /**
     * @dev Renova um certificado, estendendo sua validade
     * @param tokenId ID do certificado a ser renovado
     * @param newExpirationDate Nova data de expiração (timestamp)
     */
    function renewCertificate(uint256 tokenId, uint256 newExpirationDate) 
        public 
        onlyRole(MINTER_ROLE) 
        whenNotPaused 
    {
        require(_exists(tokenId), "Certificate does not exist");
        require(newExpirationDate > block.timestamp, "Expiration must be in the future");
        
        _certificates[tokenId].expirationDate = newExpirationDate;
        
        emit CertificateRenewed(tokenId, newExpirationDate);
    }

    /**
     * @dev Retorna os dados de um certificado
     * @param tokenId ID do certificado
     * @return Dados do certificado
     */
    function getCertificate(uint256 tokenId) 
        public 
        view 
        returns (SafetyCertificate memory) 
    {
        require(_exists(tokenId), "Certificate does not exist");
        return _certificates[tokenId];
    }

    /**
     * @dev Verifica se um certificado está válido (verificado e não expirado)
     * @param tokenId ID do certificado
     * @return Status de validade
     */
    function isValidCertificate(uint256 tokenId) 
        public 
        view 
        returns (bool) 
    {
        require(_exists(tokenId), "Certificate does not exist");
        
        SafetyCertificate memory cert = _certificates[tokenId];
        return cert.isVerified && (cert.expirationDate == 0 || cert.expirationDate > block.timestamp);
    }

    /**
     * @dev Pausa todas as transferências de tokens
     */
    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    /**
     * @dev Despausa todas as transferências de tokens
     */
    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    /**
     * @dev Hook que é chamado antes de qualquer transferência de tokens
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    /**
     * @dev Função necessária para sobrescrever devido a herança múltipla
     */
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    /**
     * @dev Retorna a URI para os metadados de um token específico
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    /**
     * @dev Verifica se um endereço suporta uma interface
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
