# Decentralized Management of Patient Health Records Using Blockchain

## Overview

This project implements a decentralized system for managing patient health records using blockchain technology, IPFS (InterPlanetary File System), and layer-2 scaling solutions like Optimism. The system is designed to provide secure, transparent, and patient-controlled health data management, reducing costs and complexity while ensuring data integrity and privacy.

## Key Features

- **Decentralized Architecture:** Utilizes Ethereum wallets for both patients and doctors to store and manage health records on the blockchain.
- **IPFS Integration:** Non-critical patient data is updated and accessed through IPFS during hospital stays, reducing the need for continuous blockchain transactions.
- **Optimism for Cost Efficiency:** A layer-2 solution is employed to minimize the cost and increase the efficiency of blockchain interactions.
- **User-Friendly Interface:** Provides an intuitive interface for generating and managing Ethereum wallets, with private keys securely stored on the user's device.
- **Decentralized Identity (DID) with Biometric Authentication:** DID technology is used for managing patient authentication and private key recovery through biometric data.

## System Components

- **Patient Wallets:** Ethereum wallets for storing health records. The private keys are securely stored on the patient's device.
- **Doctor Wallets:** Ethereum wallets used by doctors to upload data to patient wallets during discharge. The private keys are stored on the doctor’s device.
- **IPFS for Data Handling:** All health data during the patient's hospital stay is handled through IPFS, ensuring cost-effective and efficient data management.
- **Optimism Layer-2:** Employed to reduce costs and optimize blockchain transactions.

## Data Flow

1. **Patient Admission:** 
   - An Ethereum wallet is generated for the patient and linked to their profile.
   - The private key is securely stored on the patient’s device.

2. **Hospital Stay:** 
   - Patient data is updated and accessed through IPFS, minimizing the need for blockchain transactions.

3. **Patient Discharge:** 
   - Doctors sign a transaction from their wallet to the patient’s wallet on the blockchain via Optimism, finalizing patient records.

4. **Revisiting Patient:** 
   - New admission data is appended to the existing wallet, providing future doctors with access to the complete patient history.

## Advantages

- **Cost-Effective:** By leveraging IPFS and Optimism, the system minimizes costs and reduces the complexity of blockchain interactions.
- **Scalable:** The use of layer-2 solutions like Optimism ensures that the system can scale efficiently to accommodate a growing number of users.
- **Secure and Private:** Health data is securely stored on the blockchain, with access controlled by smart contracts and DID technology.
- **Fully Decentralized:** Both patients and doctors have full control over their data, with private keys securely stored on their devices.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/patient-health-records-blockchain.git
   cd patient-health-records-blockchain
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables for Ethereum and IPFS configuration in a `.env` file:
   ```bash
   cp .env.example .env
   # Update the .env file with your configuration
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Usage

- **Patient:** Create and manage your Ethereum wallet for storing health records.
- **Doctor:** Authenticate and manage patient records using your Ethereum wallet.
- **Hospital Administrator:** Manage user accounts and oversee access to patient records.
- **Diagnostic Center:** Upload test results directly to the patient’s blockchain wallet.
- **Insurance Company:** Access specific insurance claim documents via IPFS.

## Contributing

We welcome contributions! Please fork the repository and submit a pull request with your changes. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For questions or suggestions, please contact the project maintainers at [devanshguddeti9@gmail.com](mailto:devanshguddeti9@gmail.com).
