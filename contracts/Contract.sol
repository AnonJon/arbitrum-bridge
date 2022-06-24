// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {

    constructor(uint256 _initSupply) ERC20("test", "TST") {
        _mint(msg.sender, _initSupply);
    }
}
