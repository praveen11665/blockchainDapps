// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTBorrowing is ERC721 {
    struct Borrower {
        address borrowerAddress;
        uint256 borrowTime;
        uint256 returnTime;
        bool returned;
    }
    
    uint256 public maxBorrowDays;
    uint256 public lateFeePerDay;
    mapping (uint256 => Borrower) public borrowers;

    constructor(string memory name, string memory symbol, uint256 _maxBorrowDays, uint256 _lateFeePerDay) ERC721(name, symbol) {
        maxBorrowDays = _maxBorrowDays;
        lateFeePerDay = _lateFeePerDay;
    }

    function borrowNFT(uint256 tokenId, uint256 borrowDays) public {
        require(borrowDays <= maxBorrowDays, "Borrow time exceeds maximum allowed");
        require(ownerOf(tokenId) == msg.sender, "You must own the NFT to borrow it");
        require(borrowers[tokenId].borrowerAddress == address(0), "This NFT is already borrowed");

        uint256 borrowTime = block.timestamp;
        uint256 returnTime = borrowTime + borrowDays * 1 days;
        
        borrowers[tokenId] = Borrower(msg.sender, borrowTime, returnTime, false);
        
        _transfer(msg.sender, address(this), tokenId);
    }

    function returnNFT(uint256 tokenId) public {
        require(borrowers[tokenId].borrowerAddress == msg.sender, "You didn't borrow this NFT");
        require(borrowers[tokenId].returned == false, "This NFT is already returned");

        uint256 returnTime = block.timestamp;
        uint256 borrowTime = borrowers[tokenId].borrowTime;
        uint256 borrowDays = (returnTime - borrowTime) / 1 days;

        uint256 lateDays = 0;
        if (returnTime > borrowers[tokenId].returnTime) {
            lateDays = (returnTime - borrowers[tokenId].returnTime) / 1 days;
        }
        
        uint256 lateFee = lateDays * lateFeePerDay;
        if (lateFee > 0) {
            // Transfer the late fee to the contract owner
            payable(owner()).transfer(lateFee);
        }
        
        _transfer(address(this), msg.sender, tokenId);
        borrowers[tokenId].returned = true;
    }
}
