// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract HashStorage {
    struct Paper {
        string title;
        string ipfsHash;
    }

    // Store all papers for browsing
    mapping(address => Paper[]) private userPapers;

    // Quick lookup: user => (title => IPFS hash)
    mapping(address => mapping(string => string)) private titleToHash;

    event PaperStored(address indexed user, string title, string ipfsHash);

    // Store a paper with title and hash
    function storePaper(string memory _title, string memory _ipfsHash) public {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");

        // Save in array
        userPapers[msg.sender].push(
            Paper({title: _title, ipfsHash: _ipfsHash})
        );

        // Save for quick lookup
        titleToHash[msg.sender][_title] = _ipfsHash;

        emit PaperStored(msg.sender, _title, _ipfsHash);
    }

    // Retrieve the IPFS hash by paper title
    function getIPFSHashByTitle(
        address user,
        string memory _title
    ) public view returns (string memory) {
        string memory hash = titleToHash[user][_title];
        require(
            bytes(hash).length > 0,
            "No paper found with that title for this user"
        );
        return hash;
    }

    // Optional: get all papers for browsing (title + hash)
    function getAllPapers(address user) public view returns (Paper[] memory) {
        return userPapers[user];
    }

    // --- Result Hash Section ---
    mapping(address => string[]) private userResultHashes;

    event ResultHashStored(address indexed user, string resultHash);

    function storeResultHash(string memory _resultHash) public {
        require(bytes(_resultHash).length != 0, "Result hash cannot be empty");

        userResultHashes[msg.sender].push(_resultHash);

        emit ResultHashStored(msg.sender, _resultHash);
    }

    function getAllResultHashes(
        address user
    ) public view returns (string[] memory) {
        return userResultHashes[user];
    }
}
