// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.14;

import "forge-std/Test.sol";
import {console} from "forge-std/console.sol";
import "../contracts/Contract.sol";

contract ContractTest is Test {
    Token token;
    string t = "test";
    function setUp() public {
        token = new Token(100);
    }
    function testToken() public {
        console.log();
        assertTrue(keccak256(abi.encodePacked(token.name())) == keccak256(abi.encodePacked(t)));
    }
}
