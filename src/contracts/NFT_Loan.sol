// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTLoan {
    struct Loan {
        address borrower;
        address lender;
        uint256 tokenId;
        uint256 amount;
        uint256 interestRate;
        uint256 duration;
        uint256 start;
        bool active;
    }

    mapping (uint256 => Loan) public loans;

    event LoanCreated(address borrower, address lender, uint256 tokenId, uint256 amount, uint256 interestRate, uint256 duration);
    event LoanRepaid(address borrower, address lender, uint256 tokenId, uint256 amount);

    function createLoan(address _nftContract, uint256 _tokenId, uint256 _amount, uint256 _interestRate, uint256 _duration) external {
        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "You must own the NFT to create a loan");

        // Approve transfer of NFT to contract
        nft.approve(address(this), _tokenId);

        // Create loan struct
        Loan memory loan = Loan({
            borrower: msg.sender,
            lender: address(0),
            tokenId: _tokenId,
            amount: _amount,
            interestRate: _interestRate,
            duration: _duration,
            start: block.timestamp,
            active: true
        });

        // Store loan in mapping
        loans[_tokenId] = loan;

        emit LoanCreated(msg.sender, address(0), _tokenId, _amount, _interestRate, _duration);
    }

    function takeLoan(uint256 _tokenId) external {
        Loan storage loan = loans[_tokenId];
        require(loan.active, "Loan is not active");
        require(loan.lender == address(0), "Loan has already been taken");

        // Transfer ERC20 tokens from lender to borrower
        IERC20 token = IERC20(0x123456...); // Replace with actual ERC20 token address
        token.transferFrom(msg.sender, loan.borrower, loan.amount);

        // Update loan struct
        loan.lender = msg.sender;

        emit LoanCreated(loan.borrower, msg.sender, _tokenId, loan.amount, loan.interestRate, loan.duration);
    }

    function repayLoan(uint256 _tokenId) external {
        Loan storage loan = loans[_tokenId];
        require(loan.active, "Loan is not active");
        require(loan.lender == msg.sender, "Only lender can repay loan");

        // Transfer ERC20 tokens from borrower to lender
        IERC20 token = IERC20(0x123456...); // Replace with actual ERC20 token address
        token.transferFrom(loan.borrower, msg.sender, loan.amount);

        // Transfer NFT back to borrower
        IERC721 nft = IERC721(0x123456...); // Replace with actual NFT contract address
        nft.safeTransferFrom(address(this), loan.borrower, loan.tokenId);

        // Mark loan as inactive
        loan.active = false;

        emit LoanRepaid(loan.borrower, msg.sender, _tokenId, loan.amount);
    }

    function getLoan(uint256 _tokenId) external view returns (Loan memory) {
        return loans[_tokenId];
    }
}
