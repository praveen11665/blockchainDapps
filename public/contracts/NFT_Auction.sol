// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NftAuction is ERC721 {
    using Counters for Counters.Counter;

    address public owner;
    Counters.Counter private auctionId;
    uint256 public minimumBid;
    uint256 public auctionEndTime;
    bool public ended;
    address public highestBidder;
    uint256 public highestBid;

    event NewHighestBid(address bidder, uint256 amount);
    event AuctionEnded(address winner, uint256 amount);

    constructor(string memory name, string memory symbol, string memory baseURI, uint256 _minimumBid, uint256 _auctionDuration) ERC721(name, symbol) {
        owner = msg.sender;
        minimumBid = _minimumBid;
        auctionEndTime = block.timestamp + _auctionDuration;
        _setBaseURI(baseURI);
    }

    function bid() public payable {
        require(!ended, "Auction has already ended.");
        require(msg.value >= minimumBid, "Bid amount is too low.");
        require(msg.value > highestBid, "There is already a higher bid.");

        if (highestBid != 0) {
            payable(highestBidder).transfer(highestBid);
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
        emit NewHighestBid(highestBidder, highestBid);
    }

    function endAuction() public {
        require(msg.sender == owner, "Only the owner can end the auction.");
        require(!ended, "Auction has already ended.");

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        _safeMint(highestBidder, auctionId.current());
        auctionId.increment();
    }

    function withdraw() public {
        require(msg.sender == highestBidder, "Only the highest bidder can withdraw their bid.");
        require(ended, "Auction has not yet ended.");

        payable(msg.sender).transfer(highestBid);
        highestBid = 0;
        highestBidder = address(0);
    }
}
