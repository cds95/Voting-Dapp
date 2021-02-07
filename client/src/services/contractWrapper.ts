import getWeb3 from "../utils/getWeb3";

export const getContractInstanceAtAddress = async (
  contractJson: any,
  contractAddress: string
) => {
  const { abi } = contractJson;
  const web3 = await getWeb3();
  return new web3.eth.Contract(abi as any, contractAddress);
};

export const getContractInstance = async (
  networkId: number,
  contractJson: any
) => {
  const { networks, abi } = contractJson;
  const deployedNetwork = networks[networkId];
  const web3 = await getWeb3();
  return new web3.eth.Contract(
    abi as any,
    deployedNetwork && deployedNetwork.address
  );
};
