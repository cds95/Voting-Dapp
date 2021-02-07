import { EElectionState, IElection } from "../types";
import electionJson from "../contracts/Election.json";
import electionFactoryJson from "../contracts/ElectionFactory.json";
import {
  getContractInstance,
  getContractInstanceAtAddress,
} from "./contractWrapper";
import { convertHexToAscii } from "../utils/hexAsciiConverters";
import { asciiToHexa } from "./hexadecimalUtil";

const getElectionInstance = async (address: string) => {
  return getContractInstanceAtAddress(electionJson, address);
};

const getElectionFactoryInstance = async (networkId: number) => {
  return getContractInstance(networkId, electionFactoryJson);
};

const getAllElections = async (networkId: number): Promise<IElection[]> => {
  const electionFactoryInstance = await getElectionFactoryInstance(networkId);
  const elections = await electionFactoryInstance.methods.getElections().call();
  const addresses = elections["1"];
  const result: IElection[] = [];
  for (const electionAddress of addresses) {
    const electionInformation = await getElection(electionAddress);
    result.push({
      ...electionInformation,
      address: electionAddress,
    });
  }
  return result;
};

const hostElection = async (
  networkId: number,
  senderAddress: string,
  electionName: string,
  endTimeInEpochS: number
) => {
  const electionFactoryInstance = await getElectionFactoryInstance(networkId);
  const electionNameHex = asciiToHexa(electionName);
  await electionFactoryInstance.methods
    .hostNewElection(electionNameHex, endTimeInEpochS)
    .send({
      from: senderAddress,
    });
};

const startElection = async (
  senderAddress: string,
  electionAddress: string
) => {
  const electionInstance = await getElectionInstance(electionAddress);
  await electionInstance.methods.startElection().send({
    from: senderAddress,
  });
};

const nominateCandidate = async (
  senderAddress: string,
  candidateAddress: string,
  electionAddress: string
) => {
  const electionInstance = await getElectionInstance(electionAddress);
  await electionInstance.methods.nominateCandidate(candidateAddress).send({
    from: senderAddress,
  });
};

const voteForCandidate = async (
  senderAddress: string,
  candidateAddress: string,
  electionAddress: string
) => {
  const electionInstance = await getElectionInstance(electionAddress);
  await electionInstance.methods.vote(candidateAddress).send({
    from: senderAddress,
  });
};

const getElection = async (electionAddress: string): Promise<IElection> => {
  const electionInstance = await getElectionInstance(electionAddress);
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
    const numVotes: string = await electionInstance.methods
      .votes(address)
      .call();
    candidates.set(address, parseInt(numVotes));
  }
  return candidates;
};

export const ElectionApi = {
  startElection,
  nominateCandidate,
  voteForCandidate,
  getElection,
  getAllElections,
  hostElection,
};
