pragma solidity >=0.7.0 <0.8.0;

import "./Election.sol";

contract ElectionFactory {
    Election[] public elections;
    uint256 numElections;

    event ElectionCreated(address);

    function hostNewElection(bytes32 electionName, uint256 endTimeInEpochS)
        external
    {
        Election newElection = new Election(electionName, endTimeInEpochS);
        newElection.transferOwnership(msg.sender);
        elections.push(newElection);
        numElections++;
        emit ElectionCreated(address(newElection));
    }

    function getElections() external view returns (Election[] memory) {
        return elections;
    }

    function getDetailedElections()
        external
        view
        returns (bytes32[] memory, uint256[] memory)
    {
        bytes32[] memory electionNames;
        uint256[] memory electionEndTimesInEpochS;
        for (uint256 i = 0; i < elections.length; i++) {
            electionNames[i] = elections[i].electionName();
        }
        return (electionNames, electionEndTimesInEpochS);
    }
}
