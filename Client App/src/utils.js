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
    // Load account
    const accounts = await web3.eth.getAccounts()
    window.acc = accounts[0];

    const PureMedsAddress = config.contractAddr
    // console.log(account)
    // Network ID
    const networkId = await web3.eth.net.getId()
    // const networkData = PureMeds.networks[networkId]
    if(PureMedsAddress) {
      const puremeds = new web3.eth.Contract(PureMeds, PureMedsAddress)
      window.puremeds = puremeds
      // const med1 = await puremeds.methods.getMedicineDetails(1).call()
      try {
        const myDet = await puremeds.methods.getUserDetails(window.acc).call()
        // puremeds.methods.getUserDetails(window.acc).call()
        // .then(console.log)
        // .catch(console.log)
        window.myDet = myDet
        console.log("ram",myDet)
      }
      catch(err) {
        console.log(err)
      }
      // console.log(user1)
    } else {
      window.alert('Decentragram contract not deployed to detected network.')
    }
  }
  
 
