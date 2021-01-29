import { IElection } from "../types";
import electionJson from "../contracts/Election.json";
import { getContractInstance } from "./contractWrapper";
import { convertHexToAscii } from "../utils/hexAsciiConverters";

const getElectionInstance = async (networkId: string) => {
  return getContractInstance(networkId, electionJson);
};

export const getElection = async (networkdId: string): Promise<IElection> => {
  const electionInstance = await getElectionInstance(networkdId);
  const electionNameHex = await electionInstance.methods.electionName().call();

  return {
    name: convertHexToAscii(electionNameHex),
    address: "",
  };
};
