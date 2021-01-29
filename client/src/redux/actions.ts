import {
  ISetAccountsActionData,
  ISetWeb3ActionData,
  SET_ACCOUNTS,
  SET_WEB3_DATA,
  TWeb3ReduxStateAction,
} from "./types";

export const setWeb3DataAction = (networkId: number): TWeb3ReduxStateAction => {
  return {
    type: SET_WEB3_DATA,
    networkId,
  };
};

export const setAccountsAction = (
  accounts: string[]
): TWeb3ReduxStateAction => {
  return {
    type: SET_ACCOUNTS,
    accounts,
  };
};
