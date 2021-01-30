export interface IElection {
  owner: string;
  name: string;
  address: string;
  state: EElectionState;
  endTimeInEpochS: number;
  candidates: Map<string, number>;
  winner: string;
}

export enum EElectionState {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGERSS",
  ENDED = "ENDED",
}
