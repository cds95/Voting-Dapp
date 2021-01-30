export interface IElection {
  owner: string;
  name: string;
  state: EElectionState;
  endTimeInEpochS: number;
  candidates: Map<string, number>;
  winner: string;
}

export enum EElectionState {
  NOT_STARTED = "Not Started",
  IN_PROGRESS = "In Progress",
  ENDED = "Ended",
}
