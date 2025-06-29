// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @title CarbonMint
 * @dev Contrato para emissão e gestão de tokens de carbono baseados em dados verificáveis de telemetria veicular
 * @custom:security-contact security@sealsafe.com.br
 */
contract CarbonMint is ERC1155, AccessControl, Pausable, ERC1155Burnable, ERC1155Supply {
    using ECDSA for bytes32;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    // Tipos de tokens
    uint256 public constant CARBON_CREDIT = 0;
    uint256 public constant SAFETY_CERTIFICATE = 1;
    
    // Estrutura para metadados do token
    struct TokenMetadata {
        string dataHash;           // Hash SHA-256 dos dados originais
        uint256 timestamp;         // Timestamp da emissão
        address verifier;          // Endereço do verificador
        string vehicleId;          // Identificador do veículo
        uint256 emissionReduction; // Redução de emissão em gramas de CO2
        string certificationStandard; // Padrão de certificação (Verra, Gold Standard, etc.)
        bool retired;              // Indica se o crédito foi aposentado (queimado)
    }
    
    // Mapeamento de ID do token para seus metadados
    mapping(uint256 => TokenMetadata) public tokenMetadata;
    
    // Contador para geração de IDs únicos de tokens
    uint256 private _tokenIdCounter;
    
    // Mapeamento de hashes de dados para IDs de tokens
    mapping(string => uint256) private _dataHashToTokenId;
    
    // Mapeamento de veículos para seus tokens
    mapping(string => uint256[]) private _vehicleTokens;
    
    // Endereços dos verificadores autorizados
    mapping(address => bool) public authorizedVerifiers;
    
    // URI base para metadados
    string private _baseURI;
    
    // Eventos
    event CarbonCreditMinted(uint256 indexed tokenId, string dataHash, uint256 amount, string vehicleId);
    event CarbonCreditRetired(uint256 indexed tokenId, address indexed retiree, uint256 amount);
    event VerifierAdded(address indexed verifier);
    event VerifierRemoved(address indexed verifier);
    event BaseURIUpdated(string newBaseURI);

    /**
     * @dev Construtor do contrato
     * @param baseURI_ URI base para metadados dos tokens
     */
    constructor(string memory baseURI_) ERC1155(baseURI_) {
        _baseURI = baseURI_;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(VERIFIER_ROLE, msg.sender);
        _tokenIdCounter = 1; // Começamos do ID 1
    }

    /**
     * @dev Pausa todas as transferências de tokens
     * @notice Apenas administradores podem chamar esta função
     */
    function pause() public onlyRole(ADMIN_ROLE) {
        _pause();
    }

    /**
     * @dev Despausa todas as transferências de tokens
     * @notice Apenas administradores podem chamar esta função
     */
    function unpause() public onlyRole(ADMIN_ROLE) {
        _unpause();
    }

    /**
     * @dev Adiciona um novo verificador autorizado
     * @param verifier Endereço do verificador a ser adicionado
     * @notice Apenas administradores podem chamar esta função
     */
    function addVerifier(address verifier) public onlyRole(ADMIN_ROLE) {
        authorizedVerifiers[verifier] = true;
        grantRole(VERIFIER_ROLE, verifier);
        emit VerifierAdded(verifier);
    }

    /**
     * @dev Remove um verificador autorizado
     * @param verifier Endereço do verificador a ser removido
     * @notice Apenas administradores podem chamar esta função
     */
    function removeVerifier(address verifier) public onlyRole(ADMIN_ROLE) {
        authorizedVerifiers[verifier] = false;
        revokeRole(VERIFIER_ROLE, verifier);
        emit VerifierRemoved(verifier);
    }

    /**
     * @dev Atualiza a URI base para metadados
     * @param newBaseURI Nova URI base
     * @notice Apenas administradores podem chamar esta função
     */
    function setBaseURI(string memory newBaseURI) public onlyRole(ADMIN_ROLE) {
        _baseURI = newBaseURI;
        emit BaseURIUpdated(newBaseURI);
    }

    /**
     * @dev Retorna a URI para um token específico
     * @param tokenId ID do token
     * @return string URI do token
     */
    function uri(uint256 tokenId) public view override returns (string memory) {
        require(exists(tokenId), "URI query for nonexistent token");
        return string(abi.encodePacked(_baseURI, _toString(tokenId)));
    }

    /**
     * @dev Emite novos créditos de carbono baseados em dados verificados
     * @param dataHash Hash SHA-256 dos dados originais
     * @param signature Assinatura digital dos dados pelo dispositivo
     * @param vehicleId Identificador do veículo
     * @param emissionReduction Redução de emissão em gramas de CO2
     * @param certificationStandard Padrão de certificação
     * @param amount Quantidade de tokens a serem emitidos
     * @param recipient Endereço que receberá os tokens
     * @return uint256 ID do token emitido
     * @notice Apenas verificadores autorizados podem chamar esta função
     */
    function mintCarbonCredit(
        string memory dataHash,
        bytes memory signature,
        string memory vehicleId,
        uint256 emissionReduction,
        string memory certificationStandard,
        uint256 amount,
        address recipient
    ) public onlyRole(VERIFIER_ROLE) whenNotPaused returns (uint256) {
        // Verifica se o hash já foi usado
        require(_dataHashToTokenId[dataHash] == 0, "Data hash already used");
        
        // Verifica a assinatura digital
        require(_verifySignature(dataHash, signature), "Invalid signature");
        
        // Gera um novo ID de token
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        // Registra o mapeamento do hash para o ID do token
        _dataHashToTokenId[dataHash] = tokenId;
        
        // Adiciona o token à lista de tokens do veículo
        _vehicleTokens[vehicleId].push(tokenId);
        
        // Armazena os metadados do token
        tokenMetadata[tokenId] = TokenMetadata({
            dataHash: dataHash,
            timestamp: block.timestamp,
            verifier: msg.sender,
            vehicleId: vehicleId,
            emissionReduction: emissionReduction,
            certificationStandard: certificationStandard,
            retired: false
        });
        
        // Emite os tokens para o destinatário
        _mint(recipient, tokenId, amount, "");
        
        emit CarbonCreditMinted(tokenId, dataHash, amount, vehicleId);
        
        return tokenId;
    }

    /**
     * @dev Aposenta (queima) créditos de carbono
     * @param tokenId ID do token a ser aposentado
     * @param amount Quantidade a ser aposentada
     * @notice Qualquer detentor dos tokens pode aposentá-los
     */
    function retireCarbonCredit(uint256 tokenId, uint256 amount) public whenNotPaused {
        require(exists(tokenId), "Token does not exist");
        require(balanceOf(msg.sender, tokenId) >= amount, "Insufficient balance");
        
        // Marca o token como aposentado nos metadados
        tokenMetadata[tokenId].retired = true;
        
        // Queima os tokens
        _burn(msg.sender, tokenId, amount);
        
        emit CarbonCreditRetired(tokenId, msg.sender, amount);
    }

    /**
     * @dev Retorna todos os tokens associados a um veículo
     * @param vehicleId Identificador do veículo
     * @return uint256[] Array de IDs de tokens
     */
    function getVehicleTokens(string memory vehicleId) public view returns (uint256[] memory) {
        return _vehicleTokens[vehicleId];
    }

    /**
     * @dev Verifica se um token existe pelo hash dos dados
     * @param dataHash Hash SHA-256 dos dados
     * @return bool Verdadeiro se o token existe
     */
    function tokenExistsByHash(string memory dataHash) public view returns (bool) {
        return _dataHashToTokenId[dataHash] != 0;
    }

    /**
     * @dev Retorna o ID do token associado a um hash de dados
     * @param dataHash Hash SHA-256 dos dados
     * @return uint256 ID do token
     */
    function getTokenIdByHash(string memory dataHash) public view returns (uint256) {
        require(_dataHashToTokenId[dataHash] != 0, "Token does not exist for this hash");
        return _dataHashToTokenId[dataHash];
    }

    /**
     * @dev Verifica a assinatura digital dos dados
     * @param dataHash Hash dos dados
     * @param signature Assinatura digital
     * @return bool Verdadeiro se a assinatura é válida
     */
    function _verifySignature(string memory dataHash, bytes memory signature) internal view returns (bool) {
        bytes32 messageHash = keccak256(abi.encodePacked(dataHash));
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();
        address signer = ethSignedMessageHash.recover(signature);
        
        // Verifica se o assinante é um verificador autorizado
        return authorizedVerifiers[signer];
    }

    /**
     * @dev Converte um uint256 para string
     * @param value Valor a ser convertido
     * @return string Representação em string
     */
    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        
        uint256 temp = value;
        uint256 digits;
        
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        
        bytes memory buffer = new bytes(digits);
        
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        
        return string(buffer);
    }

    /**
     * @dev Hook que é chamado antes de qualquer transferência de tokens
     */
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) whenNotPaused {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    /**
     * @dev Verifica se uma conta tem um papel específico
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
