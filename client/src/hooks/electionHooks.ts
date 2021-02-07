import { useState, useEffect } from "react";
import { ElectionApi } from "../services/election";
import { IElectionBase, IElectionDetailed } from "../types";

type TFetchElectionState = {
  election: IElectionDetailed | null;
  isLoadingElection: boolean;
};

export const useFetchElection = (
  electionAddress: string
): TFetchElectionState => {
  const [state, setState] = useState<TFetchElectionState>({
    election: null,
    isLoadingElection: false,
  });
  useEffect(() => {
    (async () => {
      setState({
        election: null,
        isLoadingElection: true,
      });
      const election = await ElectionApi.getElection(electionAddress);
      setState({
        election,
        isLoadingElection: false,
      });
    })();
  }, []);
  return state;
};

type TFetchAllElectionsState = {
  elections: IElectionBase[];
  isLoadingElections: boolean;
};

export const useFetchAllElections = (networkId: number | null) => {
  const [state, setState] = useState<TFetchAllElectionsState>({
    isLoadingElections: false,
    elections: [],
  });
  useEffect(() => {
    (async () => {
      if (networkId) {
        setState({
          isLoadingElections: true,
          elections: [],
        });
        const elections = await ElectionApi.getAllElections(networkId);
        setState({
          isLoadingElections: false,
          elections,
        });
      }
    })();
  }, [networkId]);
  return state;
};
