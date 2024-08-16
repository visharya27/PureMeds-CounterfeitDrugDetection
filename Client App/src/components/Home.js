import React, { useState } from 'react'
import Qr from './Qr'
import Web3 from 'web3';
import config from '../config.json'
import abi from '../abis/PureMeds.json'


const Home = () => {

  const [qrShow, setQrShow] = useState(false);
  const onClick = () => {



    if (qrShow) {
      setQrShow(false);
    }
    else {
      setQrShow(true);
    }
  }
  return (
    <>
    <div className='scnmed container d-flex justify-content-center my-3' >
      <button className='btn btn-success' onClick={onClick}>Scan</button>
    </div>
    <div className='scnmed d-flex justify-content-center my-3' style={{"height":"100%"}}>
      {qrShow ? <Qr /> : null}
    </div>
    </>
  )
}

export default Home
