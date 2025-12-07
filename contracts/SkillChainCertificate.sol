// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SkillChainCertificate is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct Certificate {
        string name;
        string course;
        string grade;
        string date;
    }

    mapping(uint256 => Certificate) private certificates;

    event Issued(address indexed to, uint256 indexed tokenId, string course, string grade);

    constructor(address issuer) ERC721("SkillChain Certificate", "SKILLCERT") {
        _transferOwnership(issuer);
    }

    function mintCertificate(
        address to,
        string memory name_,
        string memory course_,
        string memory grade_,
        string memory date_
    ) external onlyOwner returns (uint256 tokenId) {
        _tokenIdCounter.increment();
        tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        certificates[tokenId] = Certificate(name_, course_, grade_, date_);
        emit Issued(to, tokenId, course_, grade_);
    }

    function getCertificate(uint256 tokenId) external view returns (Certificate memory) {
        require(_exists(tokenId), "Token does not exist");
        return certificates[tokenId];
    }
}
