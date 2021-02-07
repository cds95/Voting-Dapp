import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
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
    <div className="election-list">
      {elections.map(({ address, name }) => (
        <Card key={address} className="election-list__row">
          <CardContent className="election-list-row__content">
            <Typography variant="h5">
              <Link to={`/${address}`} className="election-list__row-name">
                {name}
              </Link>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
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
