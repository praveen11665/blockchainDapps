pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyToken is ERC721 {
    mapping (uint256 => string) private _tokenNames;
    mapping (uint256 => string) private _tokenMetadata;

    constructor() ERC721("MyToken", "MTK") {}

    function setTokenName(uint256 tokenId, string memory newName) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not approved or owner");
        _tokenNames[tokenId] = newName;
    }

    function setTokenMetadata(uint256 tokenId, string memory newMetadata) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not approved or owner");
        _tokenMetadata[tokenId] = newMetadata;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "URI query for nonexistent token");
        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId)) : "";
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "https://example.com/tokens/";
    }
}
