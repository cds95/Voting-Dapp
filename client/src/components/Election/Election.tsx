import React from "react";
import { connect } from "react-redux";
import { useFetchElection } from "../../hooks/electionHooks";

interface IElectionOwnProps {}

interface IElectionReduxStateProps {
  networkId: string;
}

type TElectionProps = IElectionOwnProps & IElectionReduxStateProps;

export const ElectionComp: React.FunctionComponent<TElectionProps> = ({
  networkId,
}) => {
  const { election, isLoadingElection } = useFetchElection(networkId);

  return <div className="election">{election && election.name}</div>;
};

const mapStateToProps = (state): IElectionReduxStateProps => {
  return {
    networkId: state.web3.networkId,
  };
};

export const Election = connect(mapStateToProps)(ElectionComp);
