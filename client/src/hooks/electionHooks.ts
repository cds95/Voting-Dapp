import { useState, useEffect } from "react";
import { ElectionApi } from "../services/election";
import { IElection } from "../types";

type TFetchElectionState = {
  election: IElection | null;
  isLoadingElection: boolean;
};

export const useFetchElection = (
  networkId: number | null
): TFetchElectionState => {
  const [state, setState] = useState<TFetchElectionState>({
    election: null,
    isLoadingElection: false,
  });
  useEffect(() => {
    (async () => {
      if (networkId) {
        setState({
          election: null,
          isLoadingElection: true,
        });
        const election = await ElectionApi.getElection(networkId);
        setState({
          election,
          isLoadingElection: false,
        });
      }
    })();
  }, [networkId]);
  return state;
};

export const useFetchAllElections = (networkId: number | null) => {
  const [state, setState] = useState(false);
  useEffect(() => {
    (async () => {
      if (networkId) {
        const elections = await ElectionApi.getAllElections(networkId);
      }
    })();
  });
  return state;
};
