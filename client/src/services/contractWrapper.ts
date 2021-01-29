import getWeb3 from "../utils/getWeb3";

export const getContractInstance = async (
  networkId: string,
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
