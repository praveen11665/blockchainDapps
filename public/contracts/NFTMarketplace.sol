// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract NFTMarketplace is ERC721 {
    using SafeMath for uint256;

    struct Sale {
        uint256 tokenId;
        address payable seller;
        uint256 price;
        bool isSold;
    }

    Sale[] public sales;

    mapping (uint256 => Sale) public tokenIdToSale;

    event SaleCreated(uint256 saleIndex, uint256 tokenId, address seller, uint256 price);
    event SaleSuccessful(uint256 saleIndex, uint256 tokenId, address buyer, uint256 price);
    event SaleCancelled(uint256 saleIndex, uint256 tokenId, address seller);

    constructor() ERC721("NFTMarketplace", "NFTM") {}

    function createSale(uint256 tokenId, uint256 price) public {
        require(_exists(tokenId), "Token ID does not exist");
        require(price > 0, "Price must be greater than zero");
        require(tokenIdToSale[tokenId].isSold == false, "Token already sold");

        Sale memory sale = Sale(tokenId, payable(msg.sender), price, false);
        tokenIdToSale[tokenId] = sale;
        sales.push(sale);

        emit SaleCreated(sales.length - 1, tokenId, msg.sender, price);
    }

    function buy(uint256 saleIndex) public payable {
        Sale storage sale = sales[saleIndex];
        require(sale.isSold == false, "Token already sold");
        require(msg.value >= sale.price, "Not enough ether sent");

        sale.isSold = true;

        // Transfer NFT to buyer
        _safeTransfer(sale.seller, msg.sender, sale.tokenId, "");

        // Transfer ether to seller
        sale.seller.transfer(msg.value);

        emit SaleSuccessful(saleIndex, sale.tokenId, msg.sender, sale.price);
    }

    function cancelSale(uint256 saleIndex) public {
        Sale storage sale = sales[saleIndex];
        require(msg.sender == sale.seller, "You are not the seller");
        require(sale.isSold == false, "Token already sold");

        tokenIdToSale[sale.tokenId] = Sale(0, address(0), 0, false);
        sale.isSold = true;

        emit SaleCancelled(saleIndex, sale.tokenId, msg.sender);
    }

    function getSales() public view returns (Sale[] memory) {
        return sales;
    }
}
