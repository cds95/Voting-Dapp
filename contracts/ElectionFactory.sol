pragma solidity >=0.7.0 <0.8.0;

import "./Election.sol";

contract ElectionFactory {
    Election[] public elections;

    event ElectionCreated(address);

    function hostNewElection(string memory electionName) external {
        Election newElection = new Election(electionName);
        newElection.transferOwnership(msg.sender);
        elections.push(newElection);
        emit ElectionCreated(address(newElection));
    }

    function getElections() external view returns (Election[] memory) {
        return elections;
    }
}
