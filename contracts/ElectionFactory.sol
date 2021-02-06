pragma solidity >=0.7.0 <0.8.0;

import "./Election.sol";

contract ElectionFactory {
    Election[] public elections;
    bytes32[] electionNames;
    uint256 numElections;

    event ElectionCreated(address);

    function hostNewElection(bytes32 electionName, uint256 endTimeInEpochS)
        external
    {
        Election newElection = new Election(electionName, endTimeInEpochS);
        electionNames.push(electionName);
        newElection.transferOwnership(msg.sender);
        elections.push(newElection);
        numElections++;
        emit ElectionCreated(address(newElection));
    }

    function getElections() external view returns (bytes32[] memory, Election[] memory) {
        return (electionNames, elections);
    }
}
