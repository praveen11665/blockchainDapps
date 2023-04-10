pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
}

contract TokenSwap {
    address public token1Address;
    address public token2Address;
    address public owner;

    event Swapped(address sender, uint256 amount);

    constructor(address _token1Address, address _token2Address) {
        token1Address = _token1Address;
        token2Address = _token2Address;
        owner = msg.sender;
    }

    function swap(uint256 amount) public {
        require(amount > 0, "Amount must be greater than 0");

        IERC20 token1 = IERC20(token1Address);
        IERC20 token2 = IERC20(token2Address);

        uint256 token1Balance = token1.balanceOf(msg.sender);
        require(token1Balance >= amount, "Insufficient balance of token1");

        uint256 token2Balance = token2.balanceOf(address(this));
        require(token2Balance >= amount, "Insufficient balance of token2");

        token1.transferFrom(msg.sender, address(this), amount);
        token2.transfer(msg.sender, amount);

        emit Swapped(msg.sender, amount);
    }

    function withdrawTokens(address tokenAddress, uint256 amount) public {
        require(msg.sender == owner, "Only owner can withdraw tokens");

        IERC20 token = IERC20(tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        require(balance >= amount, "Insufficient balance");

        token.transfer(owner, amount);
    }

    function withdrawETH() public {
        require(msg.sender == owner, "Only owner can withdraw ETH");

        uint256 balance = address(this).balance;
        require(balance > 0, "Insufficient balance");

        payable(owner).transfer(balance);
    }
}
