import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.17.0/+esm";

// =====================================================
// RENT SURE CONFIGURATION
// =====================================================

const CONTRACT_ADDRESS =
    "0xfc07C70F4e9ADDDB2d5A3367DF27e325FaBE5a08";

const CONTRACT_ABI = [
    "function landlord() view returns (address)",

    "function agreementCount() view returns (uint256)",

    "function agreements(uint256) view returns (address tenant, string propertyDetails, uint256 depositAmount, bool depositPaid, bool completed)",

    "function createAgreement(address _tenant, string _propertyDetails, uint256 _depositAmount)"
];


// =====================================================
// GLOBAL VARIABLES
// =====================================================

let provider = null;
let signer = null;
let contract = null;
let userAddress = null;


// =====================================================
// CONNECT METAMASK
// =====================================================

document
    .getElementById("connectWalletBtn")
    .addEventListener("click", connectWallet);


async function connectWallet() {

    try {

        if (!window.ethereum) {

            showMessage(
                "MetaMask is not installed.",
                true
            );

            return;
        }


        // Create provider
        provider =
            new ethers.BrowserProvider(window.ethereum);


        // Ask MetaMask for account access
        await provider.send(
            "eth_requestAccounts",
            []
        );


        // Get signer
        signer =
            await provider.getSigner();


        // Get connected account
        userAddress =
            await signer.getAddress();


        // Create contract instance
        contract =
            new ethers.Contract(
                CONTRACT_ADDRESS,
                CONTRACT_ABI,
                signer
            );


        // Display wallet address
        document.getElementById(
            "walletAddress"
        ).textContent =
            "Connected: " + userAddress;


        showMessage(
            "MetaMask connected successfully."
        );


        // Automatically load contract data
        await loadContractData();


    } catch (error) {

        console.error(
            "MetaMask connection error:",
            error
        );


        showMessage(
            "Failed to connect MetaMask: " +
            getErrorMessage(error),
            true
        );
    }
}


// =====================================================
// LOAD CONTRACT DATA
// =====================================================

document
    .getElementById("loadContractBtn")
    .addEventListener(
        "click",
        loadContractData
    );


async function loadContractData() {

    try {

        if (!contract) {

            showMessage(
                "Please connect MetaMask first.",
                true
            );

            return;
        }


        // Get landlord
        const landlord =
            await contract.landlord();


        // Get agreement count
        const count =
            await contract.agreementCount();


        // Display landlord
        document.getElementById(
            "landlordAddress"
        ).textContent =
            landlord;


        // Display agreement count
        document.getElementById(
            "agreementCount"
        ).textContent =
            count.toString();


        // Load all agreements
        await loadAllAgreements();


        showMessage(
            "Contract data loaded successfully."
        );


    } catch (error) {

        console.error(
            "Error loading contract data:",
            error
        );


        showMessage(
            "Failed to load contract data: " +
            getErrorMessage(error),
            true
        );
    }
}


// =====================================================
// LOAD ALL AGREEMENTS
// =====================================================

async function loadAllAgreements() {

    try {

        if (!contract) {

            return;
        }


        // Get number of agreements
        const count =
            await contract.agreementCount();


        // Find agreement container
        const container =
            document.getElementById(
                "agreementsList"
            );


        // Safety check
        if (!container) {

            console.error(
                "agreementsList element not found."
            );

            return;
        }


        // No agreements
        if (Number(count) === 0) {

            container.innerHTML =
                "<p>No rental agreements found.</p>";

            return;
        }


        // Clear previous agreements
        container.innerHTML = "";


        // Load every agreement
        for (
            let i = 1;
            i <= Number(count);
            i++
        ) {

            const agreement =
                await contract.agreements(i);


            // Read agreement values
            const tenant =
                agreement.tenant;

            const propertyDetails =
                agreement.propertyDetails;

            const depositAmount =
                agreement.depositAmount;

            const depositPaid =
                agreement.depositPaid;

            const completed =
                agreement.completed;


            // Create agreement card
            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "agreement";


            // Display agreement
            card.innerHTML = `
                <h3>Agreement #${i}</h3>

                <p>
                    <strong>Tenant:</strong><br>
                    ${tenant}
                </p>

                <p>
                    <strong>Property:</strong><br>
                    ${propertyDetails}
                </p>

                <p>
                    <strong>Deposit:</strong><br>
                    ${ethers.formatEther(
                        depositAmount
                    )} ETH
                </p>

                <p>
                    <strong>Deposit Paid:</strong>
                    ${depositPaid ? "Yes" : "No"}
                </p>

                <p>
                    <strong>Completed:</strong>
                    ${completed ? "Yes" : "No"}
                </p>
            `;


            container.appendChild(
                card
            );
        }


    } catch (error) {

        console.error(
            "Error loading agreements:",
            error
        );


        showMessage(
            "Could not load agreements: " +
            getErrorMessage(error),
            true
        );
    }
}


// =====================================================
// CREATE RENTAL AGREEMENT
// =====================================================

document
    .getElementById(
        "createAgreementBtn"
    )
    .addEventListener(
        "click",
        createAgreement
    );


async function createAgreement() {

    try {

        if (!contract) {

            showMessage(
                "Please connect MetaMask first.",
                true
            );

            return;
        }


        // Get tenant address
        const tenant =
            document
                .getElementById("tenant")
                .value
                .trim();


        // Get property details
        const propertyDetails =
            document
                .getElementById(
                    "propertyDetails"
                )
                .value
                .trim();


        // Get deposit
        const deposit =
            document
                .getElementById("deposit")
                .value
                .trim();


        // =============================================
        // VALIDATION
        // =============================================

        if (!ethers.isAddress(tenant)) {

            showMessage(
                "Please enter a valid tenant Ethereum address.",
                true
            );

            return;
        }


        if (!propertyDetails) {

            showMessage(
                "Please enter property details.",
                true
            );

            return;
        }


        if (
            !deposit ||
            Number(deposit) <= 0
        ) {

            showMessage(
                "Deposit must be greater than zero.",
                true
            );

            return;
        }


        // Convert ETH to Wei
        const depositAmount =
            ethers.parseEther(
                deposit
            );


        // =============================================
        // SEND TRANSACTION
        // =============================================

        showMessage(
            "Please confirm the transaction in MetaMask..."
        );


        const tx =
            await contract.createAgreement(
                tenant,
                propertyDetails,
                depositAmount
            );


        showMessage(
            "Transaction submitted. Waiting for confirmation..."
        );


        // Wait for blockchain confirmation
        await tx.wait();


        showMessage(
            "Rental agreement created successfully!"
        );


        // Clear form
        document.getElementById(
            "tenant"
        ).value = "";

        document.getElementById(
            "propertyDetails"
        ).value = "";

        document.getElementById(
            "deposit"
        ).value = "";


        // Refresh contract data
        await loadContractData();


    } catch (error) {

        console.error(
            "Create agreement error:",
            error
        );


        showMessage(
            "Transaction failed: " +
            getErrorMessage(error),
            true
        );
    }
}


// =====================================================
// GET SINGLE AGREEMENT
// =====================================================

document
    .getElementById(
        "getAgreementBtn"
    )
    .addEventListener(
        "click",
        getAgreement
    );


async function getAgreement() {

    try {

        if (!contract) {

            showMessage(
                "Please connect MetaMask first.",
                true
            );

            return;
        }


        // Get agreement ID
        const id =
            document
                .getElementById(
                    "agreementId"
                )
                .value
                .trim();


        if (
            !id ||
            Number(id) <= 0
        ) {

            showMessage(
                "Please enter a valid agreement ID.",
                true
            );

            return;
        }


        // Check if agreement exists
        const count =
            await contract.agreementCount();


        if (Number(id) > Number(count)) {

            showMessage(
                `Agreement #${id} does not exist.`,
                true
            );

            return;
        }


        // Get agreement
        const agreement =
            await contract.agreements(id);


        // Display ID
        document.getElementById(
            "resultId"
        ).textContent =
            id;


        // Display tenant
        document.getElementById(
            "resultTenant"
        ).textContent =
            agreement.tenant;


        // Display property
        document.getElementById(
            "resultProperty"
        ).textContent =
            agreement.propertyDetails;


        // Display deposit
        document.getElementById(
            "resultDeposit"
        ).textContent =
            ethers.formatEther(
                agreement.depositAmount
            );


        // Display deposit status
        document.getElementById(
            "resultDepositPaid"
        ).textContent =
            agreement.depositPaid
                ? "Yes"
                : "No";


        // Display completion status
        document.getElementById(
            "resultCompleted"
        ).textContent =
            agreement.completed
                ? "Yes"
                : "No";


        // Show result box
        document.getElementById(
            "agreementResult"
        ).style.display =
            "block";


        showMessage(
            `Agreement #${id} loaded successfully.`
        );


    } catch (error) {

        console.error(
            "Get agreement error:",
            error
        );


        showMessage(
            "Could not load agreement: " +
            getErrorMessage(error),
            true
        );
    }
}


// =====================================================
// SHOW MESSAGE
// =====================================================

function showMessage(
    message,
    error = false
) {

    const element =
        document.getElementById(
            "message"
        );


    if (!element) {

        console.log(message);

        return;
    }


    element.textContent =
        message;


    element.style.display =
        "block";


    if (error) {

        element.style.background =
            "#fee2e2";

        element.style.color =
            "#991b1b";

    } else {

        element.style.background =
            "#dcfce7";

        element.style.color =
            "#166534";
    }
}


// =====================================================
// ERROR MESSAGE
// =====================================================

function getErrorMessage(error) {

    if (error?.reason) {

        return error.reason;
    }


    if (error?.shortMessage) {

        return error.shortMessage;
    }


    if (error?.message) {

        return error.message;
    }


    return "Unknown error";
}


// =====================================================
// METAMASK ACCOUNT CHANGE
// =====================================================

if (window.ethereum) {

    window.ethereum.on(
        "accountsChanged",
        function () {

            window.location.reload();
        }
    );
}
