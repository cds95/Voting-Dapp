import React from "react";
import { connect } from "react-redux";
import { useFetchAllElections } from "../../hooks/electionHooks";
import { IReduxState } from "../../redux/types";
import "./ElectionList.scss";

interface IElectionListCompReduxStateProps {
  networkId: number | null;
}

type TElectionListProps = IElectionListCompReduxStateProps;

export const ElectionListComp: React.FunctionComponent<TElectionListProps> = ({
  networkId,
}) => {
  useFetchAllElections(networkId);
  return <div>Election List</div>;
};

const mapStateToProps = (
  state: IReduxState
): IElectionListCompReduxStateProps => {
  return {
    networkId: state.web3.networkId,
  };
};

export const ElectionList = connect(mapStateToProps)(ElectionListComp);
