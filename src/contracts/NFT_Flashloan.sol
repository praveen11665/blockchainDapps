// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IERC721.sol";
import "./IERC3156FlashBorrower.sol";
import "./IERC3156FlashLender.sol";

contract NFTFlashLoan is IERC3156FlashLender {
    
    mapping(address => uint256) private _balances;
    mapping(bytes32 => uint256) private _commitments;

    function maxFlashLoan(address token) public view override returns (uint256) {
        return IERC721(token).balanceOf(address(this));
    }

    function flashFee(address token, uint256 amount) public view override returns (uint256) {
        return amount / 10;
    }

    function flashLoan(IERC3156FlashBorrower borrower, address token, uint256 amount, bytes memory data) public override returns (bool) {
        uint256 fee = flashFee(token, amount);
        uint256 total = amount + fee;
        require(IERC721(token).balanceOf(address(this)) >= total, "Insufficient balance");
        _balances[token] -= amount;
        _balances[address(this)] += amount;
        bytes32 commitment = keccak256(abi.encodePacked(this, borrower, token, amount, data));
        _commitments[commitment] = total;
        require(borrower.onFlashLoan(msg.sender, token, amount, fee, data) == IERC3156FlashBorrower.onFlashLoan.selector, "Unsupported borrower");
        require(_balances[token] >= amount, "Flash loan failed");
        _balances[token] -= fee;
        _balances[address(this)] += fee;
        require(IERC721(token).balanceOf(address(this)) >= _balances[token], "Invariant violation");
        emit FlashLoan(address(this), token, amount, fee);
        return true;
    }

    function onFlashLoan(address initiator, address token, uint256 amount, uint256 fee, bytes memory data) external override returns (bytes32) {
        bytes32 commitment = keccak256(abi.encodePacked(this, initiator, token, amount, data));
        require(_commitments[commitment] == amount + fee, "Invalid commitment");
        _balances[address(this)] -= amount;
        _balances[token] += amount;
        require(IERC721(token).balanceOf(address(this)) >= _balances[token], "Invariant violation");
        emit FlashLoan(address(this), token, amount, fee);
        return keccak256("ERC3156FlashBorrower.onFlashLoan");
    }

    function balanceOf(address account, address token) public view returns (uint256) {
        if (account == address(this)) {
            return IERC721(token).balanceOf(address(this)) - _balances[token];
        } else {
            return _balances[token];
        }
    }

    event FlashLoan(address indexed initiator, address indexed token, uint256 amount, uint256 fee);
}
