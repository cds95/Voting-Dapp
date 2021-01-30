import { Typography } from "@material-ui/core";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { useFetchElection } from "../../hooks/electionHooks";
import { IReduxState } from "../../redux/types";
import { nominateCandidate, voteForCandidate } from "../../services/election";
import { ActionTextForm } from "../ActionableTextField";
import { VotesTable } from "../VotesTable";
import "./Election.scss";

interface IElectionOwnProps {}

interface IElectionReduxStateProps {
  networkId: number | null;
  currentUserAddress: string;
}

type TElectionProps = IElectionOwnProps & IElectionReduxStateProps;

export const ElectionComp: React.FunctionComponent<TElectionProps> = ({
  networkId,
  currentUserAddress,
}) => {
  const { election, isLoadingElection } = useFetchElection(networkId);
  if (isLoadingElection) {
    return <div>Loading election...</div>;
  } else if (election) {
    const { name, candidates, state, endTimeInEpochS } = election;
    const nominate = async (candidateAddress: string) => {
      networkId &&
        (await nominateCandidate(
          networkId,
          currentUserAddress,
          candidateAddress
        ));
    };
    const vote = async (candidateAddress: string) => {
      networkId &&
        (await voteForCandidate(
          networkId,
          currentUserAddress,
          candidateAddress
        ));
    };
    return (
      <div className="election">
        <Typography variant="h2">{name}</Typography>
        <div className="election__information">
          <Typography variant="h5">Status: {state}</Typography>
          <Typography variant="h5">
            Ends On:{" "}
            {moment
              .unix(endTimeInEpochS)
              .format("MMMM Do YYYY, h:mm:ss a [GMT]")}
          </Typography>
        </div>
        <VotesTable voteCounts={candidates} className="election__votes-table" />
        <ActionTextForm
          label="Candidate Address"
          buttonLabel="Nominate"
          onComplete={nominate}
          className="election__action-form"
        />
        <ActionTextForm
          label="Candidate Address"
          buttonLabel="Vote"
          onComplete={vote}
          className="election__action-form"
        />
      </div>
    );
  } else {
    return <div>Election cannot be found</div>;
  }
};

const mapStateToProps = (state: IReduxState): IElectionReduxStateProps => {
  const { web3 } = state;
  const { networkId, accounts } = web3;
  return {
    networkId: networkId,
    currentUserAddress: accounts[0],
  };
};

export const Election = connect(mapStateToProps)(ElectionComp);
