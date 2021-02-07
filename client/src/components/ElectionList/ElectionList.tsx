import { List, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { useFetchAllElections } from "../../hooks/electionHooks";
import { IReduxState } from "../../redux/types";
import "./ElectionList.scss";
import { Link } from "react-router-dom";

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
    <List className="election-list" component="nav">
      {elections.map(({ address, name }) => (
        <ListItem key={address} button={true} className="election-list__item">
          <Link to={`/${address}`}>{name}</Link>
        </ListItem>
      ))}
    </List>
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
