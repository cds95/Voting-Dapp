import React from "react";
import { EElectionState } from "../../types";
import "./ElectionStatus.scss";
import clsx from "clsx";
import { Typography } from "@material-ui/core";

interface IElectionStatusProps {
  status: EElectionState;
}

export const ElectionStatus: React.FunctionComponent<IElectionStatusProps> = ({
  status,
}) => {
  const className = clsx("election-status", {
    "election-status--not-started": status === EElectionState.NOT_STARTED,
    "election-status--in-progress": status === EElectionState.IN_PROGRESS,
    "election-status--ended": status === EElectionState.ENDED,
  });
  return (
    <div className={className}>
      <Typography variant="h6">{status}</Typography>
      <div className="election-status__icon" />
    </div>
  );
};
