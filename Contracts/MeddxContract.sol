// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract MeddxContract {
    address public owner;

    struct User {
        string name;
        string phoneNumber;
        string ssn;
    }

    mapping(address => User) private users;

    event UserRegistered(address indexed userAddress, string name, string phoneNumber);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyUser(address _userAddress) {
        require(msg.sender == _userAddress, "Not authorized");
        _;
    }

    function registerUser(
        string memory _name,
        string memory _phoneNumber,
        string memory _ssn
    ) public {
        require(bytes(_name).length > 0, "Name is required");
        require(bytes(_phoneNumber).length > 0, "Phone number is required");
        require(bytes(_ssn).length > 0, "SSN is required");

        address userAddress = msg.sender;
        users[userAddress] = User(_name, _phoneNumber, _ssn);

        emit UserRegistered(userAddress, _name, _phoneNumber);
    }

    function getUserInfo(address _userAddress) public view onlyUser(_userAddress) returns (string memory, string memory, string memory) {
        User storage user = users[_userAddress];
        return (user.name, user.phoneNumber, user.ssn);
    }

    function getPublicUserInfo(address _userAddress) public view returns (string memory, string memory) {
        User storage user = users[_userAddress];
        return (user.name, user.phoneNumber);
    }
}
