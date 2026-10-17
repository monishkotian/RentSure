// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RentSure {

    // Address of the landlord who deployed the contract
    address public landlord;

    // Number of rental agreements created
    uint256 public agreementCount;

    // Structure representing a rental agreement
    struct Agreement {
        address tenant;
        string propertyDetails;
        uint256 depositAmount;
        bool depositPaid;
        bool completed;
    }

    // Stores agreements using their unique ID
    mapping(uint256 => Agreement) public agreements;

    // Constructor runs once when the contract is deployed
    constructor() {
        landlord = msg.sender;
        agreementCount = 0;
    }

    // Create a new rental agreement
    function createAgreement(
        address _tenant,
        string memory _propertyDetails,
        uint256 _depositAmount
    ) public {

        // Only the landlord can create an agreement
        require(
            msg.sender == landlord,
            "Only landlord can create agreement"
        );

        // Tenant address cannot be the zero address
        require(
            _tenant != address(0),
            "Invalid tenant address"
        );

        // Deposit must be greater than zero
        require(
            _depositAmount > 0,
            "Deposit must be greater than zero"
        );

        // Generate a new agreement ID
        agreementCount++;

        // Store the agreement
        agreements[agreementCount] = Agreement({
            tenant: _tenant,
            propertyDetails: _propertyDetails,
            depositAmount: _depositAmount,
            depositPaid: false,
            completed: false
        });
    }
}