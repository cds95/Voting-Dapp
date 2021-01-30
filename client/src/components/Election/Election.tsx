import { Typography } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { useFetchElection } from "../../hooks/electionHooks";
import { IReduxState } from "../../redux/types";
import { nominateCandidate } from "../../services/election";
import { ActionTextForm } from "../ActionableTextField";

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
    const {
      name,
      owner,
      candidates,
      address,
      state,
      endTimeInEpochS,
      winner,
    } = election;
    const nominate = async (candidateAddress: string) => {
      if (networkId) {
        await nominateCandidate(
          networkId,
          currentUserAddress,
          candidateAddress
        );
      }
    };
    return (
      <div className="election__container">
        <Typography variant="h3">{name}</Typography>
        <ActionTextForm
          label="Candidate Address"
          buttonLabel="Nominate"
          onComplete={nominate}
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
    networkId: state.web3.networkId,
    currentUserAddress: accounts[0],
  };
};

export const Election = connect(mapStateToProps)(ElectionComp);
