import React from 'react'
import { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import Web3 from 'web3';
import config from '../config.json'
import abi from '../abis/PureMeds.json'

const Qr = () => {

  const [data, setData] = useState('No result');
  const [medData, setMedData] = useState({ name: "", mrp: "", expiry_date: "" });
  const [userData, setUserData] = useState([]);

  return (
    <>
      <div>
        <QrReader
          onResult={async (result, error) => {
            if (!!result) {

              async function main() {
                const web3 = new Web3(
                  new Web3.providers.HttpProvider(
                    `https://sepolia.infura.io/v3/${config.api_key}`
                  )
                );
                const signer = web3.eth.accounts.privateKeyToAccount(
                  config.private_key
                );
                web3.eth.accounts.wallet.add(signer);
                const contract = new web3.eth.Contract(
                  abi,
                  config.contractAddr
                );
                const medData = await contract.methods.getMedicineDetails(result.text).call()
                setMedData(medData);
                let usersData = [];


                for (let i = 0; i < medData.users.length; i++) {
                  const addr = medData.users[i].user_addr
                  const isVerified = medData.users[i].isVerified

                  const user = await contract.methods.getUserDetails(addr).call()
                  usersData.push({ ...user, isVerified: isVerified })

                }

                setUserData(usersData)
                console.log(medData)
                console.log("Ram", userData)
                console.log(userData[0]?.name)

              }


              main();


              setData(result?.text);
            }
            if (!!error) {
              console.error(error);
            }
          }}
          containerStyle={{ "width": "100%" }}
          style={{ 'height': "50px", "border": "3px solid red" }}

        />
        <div className="d-flex small justify-content-center">
          <div className="center">
            <div>
              <div>

                <h2 className="center-heading" style={{"color":"green"}}>Medicine Info</h2>
                <div class="card my-2" style={{ "width": "18rem" }}>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">Medicine Name : {medData.name}</li>
                    <li class="list-group-item">Medicine Price : {medData.mrp}</li>
                    <li class="list-group-item">Expiry Date : {medData.expiry_date}</li>
                  </ul>
                </div>
                {/* <div className="product-details">
                  <p>Medicine Name : <span>
                    {medData.name}
                  </span></p>

                  <p>Medicine Price : <span>
                    {medData.mrp}
                  </span></p>

                  <p>Expiry Date : <span>
                    {medData.expiry_date}
                  </span></p>
                </div> */}

              </div>

              {userData ? <div>

                <h2 className="center-heading" style={{"color":"green"}}>Suppliers' Info</h2>
                <div class="card my-2" style={{ "width": "18rem" }}>
                  <ul class="list-group list-group-flush">
                    
                {userData.map((data, id) => {
                  return <div key={id}>
                    <li class="list-group-item">{data.name} → <span>{data.isVerified ? "Verified ✅" : "Not Verified ❌"}</span></li>
                  </div>
                })}
                  </ul>
                  </div>

              </div> : null}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Qr
