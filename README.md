RentSure DApp

1. Description of the Problem Addressed by the DApp and Steps Required to Execute the Application
   Problem addressed:
   RentSure is a blockchain-based rental agreement system designed to create and store rental agreements securely using a smart contract. It records details such as the tenant's Ethereum address, property details, security deposit, deposit payment status, and agreement completion status on the blockchain.
   Steps to execute the application:
1. Start the local blockchain network using the configured local Ethereum network.
1. Deploy the RentSure smart contract using Remix IDE.
1. Copy the deployed contract address.
1. Update the contract address in the RentSure frontend.
1. Start the frontend using:cd ~/RentSure
   python3 -m http.server 3000 --directory frontend
1. Open http://localhost:3000 in the browser.
1. Connect MetaMask to the local blockchain network.
1. Use the frontend to load contract information, create rental agreements, and view existing agreements.
1. Steps to Connect MetaMask and Interact with the Smart Contract
1. Open the RentSure application in the browser.
1. Make sure MetaMask is connected to the localhost network.
1. Click Connect MetaMask.
1. Select the required MetaMask account and approve the connection.
1. Click Load Contract Data to retrieve the landlord address and total number of agreements.
1. To create an agreement, enter:
   - Tenant Address: Ethereum address of the tenant.
   - Property Details: Rental property information.
   - Security Deposit: Deposit amount in ETH.
1. Click Create Agreement.
1. Confirm the transaction in MetaMask.
1. After confirmation, the agreement is stored on the blockchain and the total agreement count increases.
1. The Rental Agreements section displays the stored agreement details.
1. Enter an Agreement ID in the View Rental Agreement section to retrieve a particular agreement.
1. Deployment Network and Deployed Smart Contract Address
   Deployment Network: Localhost Ethereum Network
   Deployed Smart Contract: RentSure
   Contract Address:
   0xfc07C70F4e9ADDDB2d5A3367DF27e325FaBE5a08

Network: localhost
Chain ID: 1337
![frontend](<Screenshot 2026-10-17 031507-1.png>)
![Assignment Details](<Screenshot 2026-10-17 031530-1.png>)
![Assignment Details](<Screenshot 2026-10-17 031549-1.png>)
![Assignment Details](<Screenshot 2026-10-17 031610-1.png>)
![Assignment Details](<Screenshot 2026-10-17 032541-1.png>)![Assignment Details](<Screenshot 2026-10-17 032601-1.png>)
![input](<Screenshot 2026-10-17 032653-1.png>)![Confirmation](<Screenshot 2026-10-17 032721-1.png>)
![After confirmation added Assignment Details](<Screenshot 2026-10-17 032738-1.png>)
![search of Specific Assignment](<Screenshot 2026-10-17 032748-1.png>)
![Remix Confirmation](<Screenshot 2026-10-17 033145-1.png>)
![Transaction successful](<Screenshot 2026-10-17 033733.png>)
![Transaction Error](<Screenshot 2026-10-17 033827.png>)
