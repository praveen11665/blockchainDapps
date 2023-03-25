pragma solidity ^0.8.0;

contract IPFSStorage {
    mapping (bytes32 => bool) public fileExists;
    mapping (bytes32 => string) public fileHashes;
    
    function uploadFile(bytes32 _fileId, string memory _ipfsHash) public {
        require(!fileExists[_fileId], "File already exists");
        
        fileExists[_fileId] = true;
        fileHashes[_fileId] = _ipfsHash;
    }
    
    function getFile(bytes32 _fileId) public view returns (string memory) {
        require(fileExists[_fileId], "File does not exist");
        
        return fileHashes[_fileId];
    }
    
    function deleteFile(bytes32 _fileId) public {
        require(fileExists[_fileId], "File does not exist");
        
        delete fileHashes[_fileId];
        fileExists[_fileId] = false;
    }
}
