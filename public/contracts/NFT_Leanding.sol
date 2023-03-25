// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract NFTLending {

    struct Loan {
        address borrower;
        uint256 nftId;
        uint256 loanAmount;
        uint256 interestRate;
        uint256 duration;
        uint256 startTime;
        bool isActive;
    }

    mapping(uint256 => Loan) public loans;
    uint256 public numLoans;

    // function to create a new loan offer
    function createLoanOffer(
        uint256 _nftId,
        uint256 _loanAmount,
        uint256 _interestRate,
        uint256 _duration
    ) public {
        // check that the caller is the owner of the NFT
        require(msg.sender == ownerOf(_nftId), "Caller must be the owner of the NFT");

        // transfer the NFT to the contract
        safeTransferFrom(msg.sender, address(this), _nftId);

        // create a new loan
        loans[numLoans] = Loan({
            borrower: msg.sender,
            nftId: _nftId,
            loanAmount: _loanAmount,
            interestRate: _interestRate,
            duration: _duration,
            startTime: block.timestamp,
            isActive: true
        });

        // increment the number of loans
        numLoans++;
    }

    // function to repay a loan
    function repayLoan(uint256 _loanId) public payable {
        // check that the loan exists and is active
        require(loans[_loanId].isActive, "Loan must be active");

        // check that the caller is the borrower
        require(msg.sender == loans[_loanId].borrower, "Caller must be the borrower");

        // check that the repayment amount is correct
        require(msg.value == loans[_loanId].loanAmount, "Repayment amount must be equal to loan amount");

        // transfer the NFT back to the borrower
        safeTransferFrom(address(this), msg.sender, loans[_loanId].nftId);

        // mark the loan as inactive
        loans[_loanId].isActive = false;

        // transfer the interest to the lender
        uint256 interest = (loans[_loanId].loanAmount * loans[_loanId].interestRate * loans[_loanId].duration) / 100;
        payable(ownerOf(loans[_loanId].nftId)).transfer(interest);

        // transfer the remaining amount back to the borrower
        payable(msg.sender).transfer(msg.value - interest);
    }
}
