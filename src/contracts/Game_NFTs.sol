// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GamingNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct GameNFT {
        string name;
        string game;
        uint256 level;
        uint256 attack;
        uint256 defense;
        uint256 health;
    }

    mapping(uint256 => GameNFT) private _gameNFTs;

    constructor() ERC721("GamingNFT", "GNFT") {}

    function createGameNFT(
        address player,
        string memory name,
        string memory game,
        uint256 level,
        uint256 attack,
        uint256 defense,
        uint256 health
    ) public returns (uint256) {
        _tokenIds.increment();
        uint256 newNFTId = _tokenIds.current();

        _mint(player, newNFTId);

        _gameNFTs[newNFTId] = GameNFT(name, game, level, attack, defense, health);

        return newNFTId;
    }

    function getGameNFT(uint256 tokenId) public view returns (GameNFT memory) {
        return _gameNFTs[tokenId];
    }

    function setGameNFTStats(
        uint256 tokenId,
        uint256 level,
        uint256 attack,
        uint256 defense,
        uint256 health
    ) public {
        GameNFT storage gameNFT = _gameNFTs[tokenId];
        require(_exists(tokenId), "GamingNFT: token does not exist");
        require(msg.sender == ownerOf(tokenId), "GamingNFT: caller is not the owner of the token");

        gameNFT.level = level;
        gameNFT.attack = attack;
        gameNFT.defense = defense;
        gameNFT.health = health;
    }
}
