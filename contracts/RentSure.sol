// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RentSure {

    address public landlord;
    uint256 public agreementCount;

    constructor() {
        landlord = msg.sender;
        agreementCount = 0;
    }
}