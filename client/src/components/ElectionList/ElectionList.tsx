import React from "react";
import { connect } from "react-redux";
import { useFetchAllElections } from "../../hooks/electionHooks";
import { IReduxState } from "../../redux/types";
import "./ElectionList.scss";
import { ElectionListRow } from "./ElectionListRow";

interface IElectionListCompReduxStateProps {
  networkId: number | null;
}

type TElectionListProps = IElectionListCompReduxStateProps;

export const ElectionListComp: React.FunctionComponent<TElectionListProps> = ({
  networkId,
}) => {
  const { elections, isLoadingElections } = useFetchAllElections(networkId);
  if (isLoadingElections) {
    return <div>Loading elections...</div>;
  }
  return (
    <ul className="election-list">
      {elections.map((election) => (
        <ElectionListRow election={election} key={election.address} />
      ))}
    </ul>
  );
};

const mapStateToProps = (
  state: IReduxState
): IElectionListCompReduxStateProps => {
  return {
    networkId: state.web3.networkId,
  };
};

export const ElectionList = connect(mapStateToProps)(ElectionListComp);
