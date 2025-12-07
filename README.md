# SkillChain

**SkillChain** is a decentralized application that allows the issuance and verification of certificates securely on the blockchain. This dApp leverages **Ethereum** blockchain technology and **smart contracts** to ensure the integrity and authenticity of issued certificates. Built using **React** for the frontend and **Solidity** for the smart contract, this project ensures that certificate data remains tamper-proof and accessible to everyone.

## 🇫🇷 Concept & Architecture

1. 🎓 Plateforme de Certification et Partage de Compétences "SkillChain"

   Concept : Une DApp qui permet aux universités (ou formateurs) d'émettre des certificats numériques vérifiables (**NFTs ERC-721**) pour les compétences/formations. Les étudiants peuvent ensuite partager sélectivement leurs certifications avec des recruteurs en utilisant des **Zero-Knowledge Proofs (ZKP)** pour prouver qu'ils possèdent un certificat sans en révéler tous les détails (note, date exacte).

   Pourquoi c'est excellent :

   - Directement lié au cours : **SSI (Self-Sovereign Identity)**, **Verifiable Credentials**, **NFTs ERC-721**, et **ZKP**.
   - Résout un vrai problème : **Fraude aux diplômes**, **lourdeur de la vérification**, **respect de la vie privée**.
   - Architecture riche : Plusieurs smart contracts (**Factory** pour les émetteurs, **NFT** pour les certificats), logique de **partage** et de **preuve**.
   - Démonstration visuelle forte : Interface où l'on voit le **NFT**, puis un bouton "**Générer une preuve ZK**" pour le partager.

   Acteurs :

   - **Émetteur (Université)** : Déploie un contrat via `IssuerFactory`, émet des **NFT-certificats**.
   - **Étudiant (Holder)** : Reçoit le NFT dans son wallet, peut **générer une preuve**.
   - **Recruteur (Vérificateur)** : Reçoit une **preuve ZK** et la **vérifie** sur la blockchain.

## 📦 Contracts (ERC-721 + Factory)

- `contracts/SkillChainCertificate.sol` : Contrat **ERC-721** avec métadonnées de certificat on-chain et **mint** contrôlé par l'owner (l'émetteur).
- `contracts/IssuerFactory.sol` : Permet à chaque émetteur de **déployer son propre** contrat `SkillChainCertificate` dont il est propriétaire.

> Remarque : Les imports OpenZeppelin nécessitent un environnement de build (ex: **Hardhat**). Déployez d'abord les contrats, puis mettez à jour les **ABI** et **adresses** côté frontend.

## ✨ Features

- **Issue Certificates:** Only the admin account (who deployed the smart contract) can issue new certificates by connecting to MetaMask.
- **View Certificates:** Anyone can view issued certificates by connecting their MetaMask wallet.
- **Blockchain Storage:** All certificate details are stored on the blockchain, ensuring they are secure, immutable, and verifiable.
- **MetaMask Integration:** Connect your MetaMask wallet to interact with the DApp. Ensure you're on the correct network to interact with the deployed smart contract.

## 🚀 Getting Started

To get SkillChain up and running on your local machine, follow these steps:

### Prerequisites

Ensure you have **Node.js**, **MetaMask**, and a preferred smart contract deployment tool installed.

### Smart Contract Deployment

1. **Deploy the Smart Contract:**

   - Deploy `IssuerFactory.sol` (optionnel) puis **SkillChainCertificate.sol** (par factory ou direct).
   - Exportez l'ABI du contrat **SkillChainCertificate** et remplacez le contenu dans `src/scdata/Cert.json` (clé `abi`).
   - Ajoutez l'adresse déployée du contrat dans `src/scdata/deployed_addresses.json` sous la clé `SkillChainCertificate`.

### Installation

2. **Clone the repository:**

   ```bash
   git clone https://github.com/akhilkailas017/Certificate-dApp.git
   cd certificate-dapp
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Connect MetaMask:**

   - Open MetaMask in your browser.
   - Connect to the correct network where the smart contract is deployed.

6. **Done!** Now you can start issuing and viewing certificates on the blockchain.

## 🔗 Connecting to MetaMask

- Before issuing or viewing certificates, make sure to connect your MetaMask wallet.
- Only the **admin account** (the account that deployed the smart contract) can issue certificates.
- Any connected user can view the issued certificates.

## 📜 Smart Contract Details

- **Technology Used:** React, Solidity
- **Smart Contract Deployment:** Can be deployed using **Hardhat**, **Truffle**, **Remix**, or any preferred application.
- **Smart Contract ABI and Address:**
  - ABI: Stored in `src/scdata/Cert.json` (ABI du contrat `SkillChainCertificate`).
  - Address: Stored in `src/scdata/deployed_addresses.json` (`SkillChainCertificate`).

## 👤 Admin Access

- The account that deploys the smart contract becomes the **admin**. This account has exclusive rights to issue certificates.
- Ensure that your MetaMask wallet is connected to the admin account to access the certificate issuance page.

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Blockchain:** Ethereum
- **Smart Contract Language:** Solidity
- **Wallet Integration:** MetaMask

## 📝 Usage

1. **Issue Certificate (NFT):**

   - Allez sur la page "Issue Certificate".
   - Connectez MetaMask en tant qu'**émetteur (owner)** du contrat.
   - Renseignez l'**adresse du destinataire** et les détails (`name`, `course`, `grade`, `date`), puis cliquez sur **Issue** (mint NFT).

2. **View Certificate:**

   - Navigate to the "View Certificate" page.
   - Connect to MetaMask with any account.
   - Entrez l'**ID du NFT** (`tokenId`) pour voir les détails du certificat.
