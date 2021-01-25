import Web3 from 'web3';

interface Window {
  ethereum: any;
  web3: Web3;
  addEventListener: any;
}
declare const window: Window;

let web3: Web3 | null = null 

const getWeb3 = async (): Promise<Web3> => {
  if(!web3) {
    console.log("Initializing web3...")
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed
        
      } catch (error) {
        console.error("Failed to initialize web3")
        throw error
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      // Use Mist/MetaMask's provider.
      web3 = window.web3;
      console.log('Injected web3 detected.');
    }
    // Fallback to localhost; use dev console port by default...
    else {
      const provider = new Web3.providers.HttpProvider(
        'http://127.0.0.1:8545',
      );
      web3 = new Web3(provider);
      console.log('No web3 instance injected, using Local web3.');
    }
  }
  return web3
}

export default getWeb3;