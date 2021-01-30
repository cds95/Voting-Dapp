export const SET_WEB3_DATA = "SET_WEB3_DATA";
export interface ISetWeb3ActionData {
  type: typeof SET_WEB3_DATA;
  networkId: number;
}

export const SET_ACCOUNTS = "SET_ACCOUNTS";
export interface ISetAccountsActionData {
  type: typeof SET_ACCOUNTS;
  accounts: string[];
}

export type TWeb3ReduxStateAction = ISetWeb3ActionData | ISetAccountsActionData;

export interface IWeb3ReduxState {
  networkId: number | null;
  accounts: string[];
}

export interface IReduxState {
  web3: IWeb3ReduxState;
}
