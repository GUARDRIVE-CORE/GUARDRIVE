// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title CarbonToken
 * @dev Implementação de token ERC-1155 para representar créditos de carbono
 * verificáveis baseados em dados de telemetria veicular do sistema GuardDrive | Selfbelt.
 * 
 * Este contrato permite a emissão, transferência e queima de tokens que representam
 * reduções verificáveis de emissões de CO₂, alinhadas aos padrões GHG Protocol,
 * TCFD e ISO 14064.
 *
 * @author GuardDrive | Selfbelt
 * @notice Este contrato é parte do ecossistema de tokenização ESG do GuardDrive
 * @custom:security-contact security@guardrive.com
 */
contract CarbonToken is ERC1155, AccessControl, Pausable, ERC1155Burnable, ERC1155Supply {
    using Counters for Counters.Counter;
    using Strings for uint256;

    // Definição de roles para controle de acesso
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    // Contador para IDs de tokens
    Counters.Counter private _tokenIdCounter;

    // Mapeamento de metadados para cada tipo de token
    mapping(uint256 => TokenMetadata) private _tokenMetadata;

    // Estrutura para metadados do token
    struct TokenMetadata {
        string name;           // Nome do token (ex: "GuardDrive Carbon Credit 2025")
        string description;    // Descrição detalhada
        string tokenURI;       // URI para metadados externos
        uint256 creationDate;  // Timestamp de criação
        address validator;     // Endereço do validador
        bytes32 dataHash;      // Hash dos dados de origem
        uint256 carbonAmount;  // Quantidade de CO₂ em gramas
        string standard;       // Padrão de verificação (ex: "GHG Protocol")
        string vehicleId;      // Identificador do veículo (anonimizado)
        string batchId;        // Identificador do lote de emissão
    }

    // Eventos
    event TokenMinted(uint256 indexed tokenId, address indexed to, uint256 amount, bytes32 dataHash);
    event TokenBurned(uint256 indexed tokenId, address indexed from, uint256 amount);
    event TokenValidated(uint256 indexed tokenId, address indexed validator, bytes32 dataHash);
    event MetadataUpdated(uint256 indexed tokenId, string tokenURI);

    /**
     * @dev Construtor do contrato
     * @param uri_ URI base para metadados dos tokens
     */
    constructor(string memory uri_) ERC1155(uri_) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
    }

    /**
     * @dev Cria um novo tipo de token de carbono
     * @param to Endereço do destinatário
     * @param amount Quantidade de tokens a serem criados
     * @param metadata Metadados do token
     * @param data Dados adicionais para o hook onERC1155Received
     * @return tokenId ID do token criado
     */
    function mintToken(
        address to,
        uint256 amount,
        TokenMetadata memory metadata,
        bytes memory data
    ) public onlyRole(MINTER_ROLE) whenNotPaused returns (uint256) {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        
        _tokenMetadata[tokenId] = metadata;
        _tokenMetadata[tokenId].creationDate = block.timestamp;
        
        _mint(to, tokenId, amount, data);
        
        emit TokenMinted(tokenId, to, amount, metadata.dataHash);
        
        return tokenId;
    }

    /**
     * @dev Valida um token existente por um oráculo autorizado
     * @param tokenId ID do token a ser validado
     * @param dataHash Hash dos dados validados
     */
    function validateToken(uint256 tokenId, bytes32 dataHash) 
        public 
        onlyRole(ORACLE_ROLE) 
        whenNotPaused 
    {
        require(exists(tokenId), "Token does not exist");
        
        _tokenMetadata[tokenId].validator = msg.sender;
        _tokenMetadata[tokenId].dataHash = dataHash;
        
        emit TokenValidated(tokenId, msg.sender, dataHash);
    }

    /**
     * @dev Atualiza a URI de metadados para um token específico
     * @param tokenId ID do token
     * @param newTokenURI Nova URI de metadados
     */
    function setTokenURI(uint256 tokenId, string memory newTokenURI) 
        public 
        onlyRole(ADMIN_ROLE) 
    {
        require(exists(tokenId), "Token does not exist");
        
        _tokenMetadata[tokenId].tokenURI = newTokenURI;
        
        emit MetadataUpdated(tokenId, newTokenURI);
    }

    /**
     * @dev Retorna os metadados de um token
     * @param tokenId ID do token
     * @return Metadados do token
     */
    function getTokenMetadata(uint256 tokenId) 
        public 
        view 
        returns (TokenMetadata memory) 
    {
        require(exists(tokenId), "Token does not exist");
        return _tokenMetadata[tokenId];
    }

    /**
     * @dev Retorna a URI para os metadados de um token específico
     * @param tokenId ID do token
     * @return URI string
     */
    function uri(uint256 tokenId) 
        public 
        view 
        override 
        returns (string memory) 
    {
        require(exists(tokenId), "URI query for nonexistent token");
        
        string memory baseURI = super.uri(tokenId);
        string memory tokenURI = _tokenMetadata[tokenId].tokenURI;
        
        if (bytes(tokenURI).length > 0) {
            return tokenURI;
        }
        
        return string(abi.encodePacked(baseURI, tokenId.toString()));
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
     * @dev Verifica se um endereço suporta uma interface
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
