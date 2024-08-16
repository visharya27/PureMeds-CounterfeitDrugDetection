import React from 'react'
import { useState } from 'react';

const Signup = () => {

  const [userDet, setUserDet] = useState({ username: "", usertype: "", userlicence: "" })

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userDet)
    if (window.puremeds && window.acc) {
      const puremeds = window.puremeds
      puremeds.methods.addUser(userDet.username, userDet.usertype, userDet.userlicence)
        .send({ from: window.acc })
        .on('transactionHash', function (hash) {
          console.log("hash", hash)
        })
        .on('receipt', function (rec) {
          console.log("receipt", rec)
        })
        .on("confirmation", function (conf, rec) {
          console.log("conf ", rec)
        })
        .on("error", console.error)


    }

  }


  const handleChange = (event) => {
    setUserDet({ ...userDet, [event.target.name]: event.target.value })
    console.log(userDet);
  }

  return (
    <>
      <div className='container' style={{ "width": "50%", "marginTop": "5rem", "border": "2px solid green", "padding": "1rem", "borderRadius": "15px" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Manufacturer or Supplier Name</label>
            <input type="text" className="form-control" id="username" aria-describedby="emailHelp" name="username" value={userDet.username} onChange={handleChange} required />
          </div>
          <div className='d-flex justify-content-around my-2' onChange={handleChange}>
            <div className='d-flex mx-2'>
            <input type="radio" value="1" name="usertype" />
            <div>‎‎ Manufacturer</div>
            </div>
            <div className='d-flex mx-2'>
            <input type="radio" value="2" name="usertype" />
            <div> ‎‎ Supplier</div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Drug Licence Number</label>
            <input type="text" className="form-control" id="userlicence" value={userDet.userlicence} name="userlicence" onChange={handleChange} required />
          </div>
          <div className='justify-content-center d-flex'>
            <button type="submit" className="btn btn-success item-center">Sign Up</button>
          </div>
        </form>
      </div>

    </>
  )
}

export default Signup
