export interface IElection {
  owner: string;
  state: EElectionState;
  endTimeInEpochS: number;
  candidates: Map<string, number>;
  winner: string;
  name: string;
  address?: string;
}

export enum EElectionState {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  ENDED = "Ended",
}
