// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NFTStorage {
    mapping(uint256 => address) private _owners;
    mapping(address => uint256[]) private _ownedTokens;
    mapping(uint256 => string) private _tokenURIs;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event TokenURIUpdated(uint256 indexed tokenId, string indexed tokenURI);

    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "Token does not exist");
        return owner;
    }

    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(_owners[tokenId] != address(0), "Token does not exist");
        return _tokenURIs[tokenId];
    }

    function updateTokenURI(uint256 tokenId, string memory tokenURI_) public {
        require(_owners[tokenId] == msg.sender, "Sender is not token owner");
        _tokenURIs[tokenId] = tokenURI_;
        emit TokenURIUpdated(tokenId, tokenURI_);
    }

    function transfer(address to, uint256 tokenId) public {
        require(to != address(0), "Invalid recipient");
        require(_owners[tokenId] == msg.sender, "Sender is not token owner");

        _transfer(msg.sender, to, tokenId);
    }

    function _transfer(address from, address to, uint256 tokenId) internal {
        _ownedTokens[from].remove(tokenId);
        _ownedTokens[to].push(tokenId);
        _owners[tokenId] = to;
        emit Transfer(from, to, tokenId);
    }

    function mint(address to, uint256 tokenId, string memory tokenURI_) public {
        require(to != address(0), "Invalid recipient");
        require(_owners[tokenId] == address(0), "Token already exists");

        _owners[tokenId] = to;
        _ownedTokens[to].push(tokenId);
        _tokenURIs[tokenId] = tokenURI_;
        emit Transfer(address(0), to, tokenId);
        emit TokenURIUpdated(tokenId, tokenURI_);
    }

    function ownedTokens(address owner) public view returns (uint256[] memory) {
        return _ownedTokens[owner];
    }
}
