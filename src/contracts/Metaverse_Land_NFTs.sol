// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MetaverseLandNFT is ERC721, Ownable {
    string public constant METALAND_PROVENANCE = "INSERT METALAND PROVENANCE HERE";
    uint256 public constant MAX_METALAND_SUPPLY = 10000;
    uint256 public constant MAX_PURCHASE_PER_TRANSACTION = 10;
    uint256 public constant PRICE = 0.1 ether;
    bool public saleActive = false;

    constructor() ERC721("Metaverse Land NFT", "MLN") {}

    function mint(uint256 _amount) public payable {
        require(saleActive, "Sale is not active");
        require(_amount > 0, "Amount must be greater than 0");
        require(_amount <= MAX_PURCHASE_PER_TRANSACTION, "Exceeds maximum purchase per transaction");
        require(totalSupply() + _amount <= MAX_METALAND_SUPPLY, "Exceeds maximum supply");
        require(msg.value >= _amount * PRICE, "Ether value sent is not correct");

        for (uint256 i = 0; i < _amount; i++) {
            uint256 tokenId = totalSupply();
            _safeMint(msg.sender, tokenId);
        }
    }

    function setSaleActive(bool _active) public onlyOwner {
        saleActive = _active;
    }

    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}
