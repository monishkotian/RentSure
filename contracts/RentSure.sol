// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RentSure {

    address public landlord;
    uint256 public agreementCount;

    struct Agreement {
        address tenant;
        string propertyDetails;
        uint256 depositAmount;
        bool depositPaid;
        bool completed;
    }

    constructor() {
        landlord = msg.sender;
        agreementCount = 0;
    }
}