import React from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from "@material-ui/core";

interface IVotesTableProps {
  voteCounts: Map<string, number>;
  className?: string;
}

export const VotesTable: React.FunctionComponent<IVotesTableProps> = ({
  voteCounts,
  className,
}) => {
  return (
    <TableContainer className={className}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Candidate Address</TableCell>
            <TableCell>Votes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from(voteCounts.keys()).map((candidateAddress) => (
            <TableRow key={candidateAddress}>
              <TableCell>{candidateAddress}</TableCell>
              <TableCell>{voteCounts.get(candidateAddress)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
