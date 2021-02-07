import React from "react";
import { IElectionBase } from "../../types";
import { Link } from "react-router-dom";

interface IElectionListRowProps {
  election: IElectionBase;
}

export const ElectionListRow: React.FunctionComponent<IElectionListRowProps> = ({
  election,
}) => {
  const { name, address } = election;
  return (
    <li className="election-list-row">
      <Link to={`/${address}`}>{name}</Link>
    </li>
  );
};
