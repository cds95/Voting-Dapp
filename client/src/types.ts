export interface IElectionBase {
  name: string;
  address?: string;
}

export interface IElectionDetailed extends IElectionBase {
  owner: string;
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
