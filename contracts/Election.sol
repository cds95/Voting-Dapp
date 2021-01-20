pragma solidity >=0.7.0 <0.8.0;

contract Election {
    address public owner;
    mapping(address => uint256) public votes;
    address[] public candidates;
    mapping(address => bool) public electionParticipants;
    address public winner;
    ElectionState public electionState;
    string public electionName;

    event ElectionStarted();
    event ElectionEnded(address winner);
    event VoteAdded(address candidate, uint256 voteCount);
    event CandidateNominated(address candidate);

    enum ElectionState {NOT_STARTED, IN_PROGRESS, ENDED}

    modifier isOwner() {
        require(msg.sender == owner, "Only the owner may execute function");
        _;
    }

    modifier notOwner(address a) {
        require(a != owner, "Owner cannot execute function");
        _;
    }

    modifier isElectionNotStarted() {
        require(electionState == ElectionState.NOT_STARTED);
        _;
    }

    modifier hasNotVoted {
        require(!electionParticipants[msg.sender], "Address has already voted");
        _;
    }

    constructor(string memory _electionName) {
        electionState = ElectionState.NOT_STARTED;
        owner = msg.sender;
        electionName = _electionName;
    }

    function transferOwnership(address newOwner) external isOwner {
        owner = newOwner;
    }

    function nominateCandidate(address _candidate)
        external
        isElectionNotStarted
        isOwner
    {
        require(_candidate != owner, "Owner cannot nominate self");
        votes[_candidate] = 0;
        candidates.push(_candidate);
        emit CandidateNominated(_candidate);
    }

    function startElection() external isOwner {
        require(
            candidates.length > 1,
            "An election must have at least 2 candidates"
        );
        electionState = ElectionState.IN_PROGRESS;
        emit ElectionStarted();
    }

    function endElection() external isOwner {
        electionState = ElectionState.ENDED;
        winner = getWinner();
        emit ElectionEnded(winner);
    }

    function getWinner() private view returns (address) {
        address winningAddress;
        uint256 largestVoteCount;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (votes[candidates[i]] > largestVoteCount) {
                largestVoteCount = votes[candidates[i]];
                winningAddress = candidates[i];
            }
        }
        return winningAddress;
    }

    function vote(address _candidate) external hasNotVoted {
        votes[_candidate] += 1;
        mapping(address => bool) storage participants = electionParticipants;
        participants[msg.sender] = true;
        emit VoteAdded(_candidate, votes[_candidate]);
    }
}
