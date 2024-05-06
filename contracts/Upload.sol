// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Upload {
    struct Access {
        address user;
        mapping(string => bool) fileAccess; // Mapping to track access for each file
    }

    mapping(address => string[]) private files; // Mapping to store files uploaded by each user
    mapping(address => mapping(address => Access)) private accessList; // Mapping to track access granted to each user
    mapping(string => address[]) private imageAccessList; // New mapping to store accessible accounts for each image

    event FileAdded(address indexed user, string url);
    event AccessGranted(
        address indexed owner,
        address indexed user,
        string file
    );
    event AccessRevoked(
        address indexed owner,
        address indexed user,
        string file
    );

    function addFile(string memory url) external {
        files[msg.sender].push(url);
        emit FileAdded(msg.sender, url);
    }

    function grantAccess(address user, string memory file) external {
        require(msg.sender != user, "Cannot grant access to yourself");
        accessList[msg.sender][user].fileAccess[file] = true;
        // Update the new mapping
        imageAccessList[file].push(user);
        emit AccessGranted(msg.sender, user, file);
    }

    function revokeAccess(address user, string memory file) external {
        delete accessList[msg.sender][user].fileAccess[file];
        // Update the new mapping
        removeAddressFromImageAccessList(file, user);
        emit AccessRevoked(msg.sender, user, file);
    }

    function getFileList(address user) external view returns (string[] memory) {
        return files[user];
    }
    function getaccessibleaccounts(
        string memory file
    ) external view returns (address[] memory) {
        return imageAccessList[file];
    }
    function getAccessibleFiles(
        address owner,
        address user
    ) external view returns (string[] memory) {
        require(owner != user, "Cannot query your own files");

        string[] memory allFiles = files[owner];
        uint256 count = 0;

        // Count the number of accessible files
        for (uint256 i = 0; i < allFiles.length; i++) {
            if (accessList[owner][user].fileAccess[allFiles[i]]) {
                count++;
            }
        }

        // Create an array to store accessible files
        string[] memory accessibleFiles = new string[](count);
        count = 0; // Reset count for re-use

        // Populate the accessibleFiles array
        for (uint256 i = 0; i < allFiles.length; i++) {
            if (accessList[owner][user].fileAccess[allFiles[i]]) {
                accessibleFiles[count] = allFiles[i];
                count++;
            }
        }

        return accessibleFiles;
    }

    // Internal function to remove an address from the imageAccessList
    function removeAddressFromImageAccessList(
        string memory file,
        address user
    ) internal {
        address[] storage addresses = imageAccessList[file];
        for (uint256 i = 0; i < addresses.length; i++) {
            if (addresses[i] == user) {
                addresses[i] = addresses[addresses.length - 1];
                addresses.pop();
                break;
            }
        }
    }
}
