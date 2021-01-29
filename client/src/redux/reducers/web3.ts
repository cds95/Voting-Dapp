import { SET_ACCOUNTS, SET_WEB3_DATA, TWeb3ReduxStateAction } from "../types";

interface IWeb3ReduxState {
  networkId: number | null;
  accounts: string[];
}

const initialState: IWeb3ReduxState = {
  networkId: null,
  accounts: [],
};

export const web3 = (
  state = initialState,
  action: TWeb3ReduxStateAction
): IWeb3ReduxState => {
  switch (action.type) {
    case SET_WEB3_DATA:
      return {
        ...state,
        networkId: action.networkId,
      };
    case SET_ACCOUNTS:
      return {
        ...state,
        accounts: action.accounts,
      };
    default:
      return state;
  }
};
