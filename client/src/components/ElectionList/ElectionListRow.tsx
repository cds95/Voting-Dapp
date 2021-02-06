import React from "react";
import { IElectionBase } from "../../types";

interface IElectionListRowProps {
  election: IElectionBase;
}

export const ElectionListRow: React.FunctionComponent<IElectionListRowProps> = ({
  election,
}) => {
  const { name, address } = election;
  return <li className="election-list-row">{name}</li>;
};
