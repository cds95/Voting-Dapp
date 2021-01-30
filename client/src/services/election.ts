import { EElectionState, IElection } from "../types";
import electionJson from "../contracts/Election.json";
import { getContractInstance } from "./contractWrapper";
import { convertHexToAscii } from "../utils/hexAsciiConverters";

const getElectionInstance = async (networkId: number) => {
  return getContractInstance(networkId, electionJson);
};

export const nominateCandidate = async (
  networkId: number,
  senderAddress: string,
  candidateAddress: string
) => {
  const electionInstance = await getElectionInstance(networkId);
  await electionInstance.methods.nominateCandidate(candidateAddress).send({
    from: senderAddress,
  });
};

export const getElection = async (networkdId: number): Promise<IElection> => {
  const electionInstance = await getElectionInstance(networkdId);
  const owner = await electionInstance.methods.owner().call();
  const electionNameHex: string = await electionInstance.methods
    .electionName()
    .call();
  const electionStageInt: string = await electionInstance.methods
    .electionState()
    .call();
  const endTimeInEpochS: string = await electionInstance.methods
    .endTimeInEpochS()
    .call();
  const candidates = await getCandidateVoteCounts(electionInstance);
  const winner: string = await electionInstance.methods.winner().call();
  return {
    owner,
    name: convertHexToAscii(electionNameHex),
    address: "",
    state: getElectionState(electionStageInt),
    endTimeInEpochS: parseInt(endTimeInEpochS),
    candidates,
    winner,
  };
};

const getElectionState = (stateIdx: string): EElectionState => {
  switch (stateIdx) {
    case "0":
      return EElectionState.NOT_STARTED;
    case "1":
      return EElectionState.IN_PROGRESS;
    case "2":
      return EElectionState.ENDED;
    default:
      throw new Error(`${stateIdx} is an invalid election state`);
  }
};

const getCandidateVoteCounts = async (
  electionInstance: any
): Promise<Map<string, number>> => {
  const candidates = new Map<string, number>();
  const candidateAddresses = await electionInstance.methods
    .getCandidates()
    .call();
  for (const address of candidateAddresses) {
    const numVotes = await electionInstance.methods.votes(address).call();
    candidates.set(address, numVotes);
  }
  return candidates;
};
