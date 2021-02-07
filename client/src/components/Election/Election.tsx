import { Button, Typography } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { useFetchElection } from "../../hooks/electionHooks";
import { IReduxState } from "../../redux/types";
import { ElectionApi } from "../../services/election";
import { EElectionState } from "../../types";
import { ActionableDropdown } from "../ActionableDropdown";
import { ActionTextForm } from "../ActionableTextField";
import { VotesTable } from "../VotesTable";
import "./Election.scss";

interface IElectionOwnProps {}

interface IElectionReduxStateProps {
  currentUserAddress: string;
}

type TElectionProps = IElectionOwnProps & IElectionReduxStateProps;

export const ElectionComp: React.FunctionComponent<TElectionProps> = ({
  currentUserAddress,
}) => {
  const { electionAddress } = useParams();
  const { election, isLoadingElection } = useFetchElection(electionAddress);
  if (isLoadingElection) {
    return <div>Loading election...</div>;
  } else if (election) {
    const { name, candidates, state, endTimeInEpochS, owner } = election;
    const isOwner = owner === currentUserAddress;
    const nominate = async (candidateAddress: string) => {
      await ElectionApi.nominateCandidate(
        currentUserAddress,
        candidateAddress,
        electionAddress
      );
    };
    const vote = async (candidateAddress: string) => {
      await ElectionApi.voteForCandidate(
        currentUserAddress,
        candidateAddress,
        electionAddress
      );
    };
    const startElection = async () => {
      await ElectionApi.startElection(currentUserAddress, electionAddress);
    };
    return (
      <div className="election">
        <Typography variant="h2">{name}</Typography>
        <div className="election__information">
          <Typography variant="h5">
            <span className="election__status">Status: {state}</span>
            {isOwner && state === EElectionState.NOT_STARTED && (
              <Button
                onClick={startElection}
                variant="contained"
                color="primary"
                className="election__start-btn"
              >
                Start Election
              </Button>
            )}
          </Typography>
          <Typography variant="h5">
            Ends On:{" "}
            {moment.unix(endTimeInEpochS).format("MMMM Do YYYY, h:mm:ss a")}
          </Typography>
        </div>
        <VotesTable voteCounts={candidates} className="election__votes-table" />
        {state == EElectionState.NOT_STARTED && (
          <ActionTextForm
            label="Candidate Address"
            buttonLabel="Nominate"
            onComplete={nominate}
            className="election__action-form"
          />
        )}
        {state == EElectionState.IN_PROGRESS && (
          <ActionableDropdown
            label="Candidate Address"
            buttonLabel="Vote"
            onComplete={vote}
            className="election__action-form"
            options={Array.from(candidates.keys())}
          />
        )}
      </div>
    );
  } else {
    return <div>Election cannot be found</div>;
  }
};

const mapStateToProps = (state: IReduxState): IElectionReduxStateProps => {
  const { web3 } = state;
  const { accounts } = web3;
  return {
    currentUserAddress: accounts[0],
  };
};

export const Election = connect(mapStateToProps)(ElectionComp);
