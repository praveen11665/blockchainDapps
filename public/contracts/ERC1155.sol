// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Context.sol";

contract MyToken is Context, ERC1155 {
    constructor() ERC1155("https://example.com/tokens/{id}.json") {}

    function mint(address account, uint256 id, uint256 amount, bytes memory data) public {
        _mint(account, id, amount, data);
    }

    function burn(address account, uint256 id, uint256 amount) public {
        _burn(account, id, amount);
    }

    function transfer(address from, address to, uint256 id, uint256 amount, bytes memory data) public {
        _safeTransferFrom(from, to, id, amount, data);
    }
}
