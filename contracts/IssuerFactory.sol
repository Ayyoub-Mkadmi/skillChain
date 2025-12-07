// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./SkillChainCertificate.sol";

contract IssuerFactory {
    event IssuerCreated(address indexed issuer, address certificateContract);

    address[] public allCertificates;
    mapping(address => address[]) public certificatesByIssuer;

    function createIssuerCertificate() external returns (address certAddr) {
        SkillChainCertificate cert = new SkillChainCertificate(msg.sender);
        certAddr = address(cert);
        allCertificates.push(certAddr);
        certificatesByIssuer[msg.sender].push(certAddr);
        emit IssuerCreated(msg.sender, certAddr);
    }

    function getIssuerCertificates(address issuer) external view returns (address[] memory) {
        return certificatesByIssuer[issuer];
    }
}
