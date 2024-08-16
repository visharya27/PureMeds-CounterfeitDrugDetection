import config from '../src/config.json'
import PureMeds from '../src/abis/PureMeds.json'
import Web3 from 'web3';

export async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
}

export async function loadContract() {
    await loadWeb3()
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    window.acc = accounts[0];

    const PureMedsAddress = config.contractAddr
    // const networkId = await web3.eth.net.getId()
    if(PureMedsAddress) {
      const puremeds = new web3.eth.Contract(PureMeds, PureMedsAddress)
      window.puremeds = puremeds
      try {
        const myDet = await puremeds.methods.getUserDetails(window.acc).call()
        window.myDet = myDet
        console.log(myDet)
      }
      catch(err) {
        console.log(err)
      }
    } else {
      window.alert('Decentragram contract not deployed to detected network.')
    }
  }
  
 
