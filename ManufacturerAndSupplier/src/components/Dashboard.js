
import AddMed from './AddMed'
import React, { Component } from 'react'
import { loadContract } from '../utils'
import '../tabledesign.css'
import '../hovertext.css'

export default class Dashboard extends Component {
  state = {
    dashTable: [],
    myUserType: 0,
    next_user_add: ""
  }
  changeState(id) {
    return async function updateB(){
    let next_usr_add = prompt("Address of next Supplier");
    const puremeds = window.puremeds
    puremeds.methods.updateBuyer(id, next_usr_add).send({from:window.acc})
    .on('transactionHash', function(hash) {
      console.log("hash", hash)
    })
    .on('receipt', function(rec){
      console.log("receipt", rec)
    })
    .on("confirmation", function(conf, rec) {
      console.log("conf ", rec)
    })
    .on("error", console.error)
    }
  }

  verifyMed(id) {
    
    return async function verify() {
      const puremeds = window.puremeds
      puremeds.methods.verifyState(id).send({from:window.acc})
      .on('transactionHash', function(hash) {
        console.log("hash", hash)
      })
      .on('receipt', function(rec){
        console.log("receipt", rec)
      })
      .on("confirmation", function(conf, rec) {
        console.log("conf ", rec)
      })
      .on("error", console.error)
      
    }
  }

  handleChange(e)
  {
    this.setState({ [e.target.name] : e.target.value});
  }

  async componentDidMount() {
    await loadContract()
    const myHist = window.myDet.medHist
    this.setState({ myUserType: window.myDet['user_t'] })
    let dashTable = [];
    for (let i = 0; i < myHist.length; i++) {
      const puremeds = window.puremeds
      let medData = await puremeds.methods.getMedicineDetails(myHist[i]).call()
      const lastUser = medData.users[medData.users.length - 1]
      if (lastUser.user_addr === window.acc) {
        dashTable.push({ id: myHist[i], isVerified: lastUser.isVerified })
      }
    }
    await this.setState({ dashTable: dashTable })
    console.log(dashTable)
  }



  render() {
    return (
      <>
        {this.state.myUserType == 1 ? <AddMed /> : null}
        <h2 className="container d-flex justify-content-center my-2">{window.myDet['name']}'s Dashboard</h2>
        <div className="tabledesign">
          <table>
            <tbody>

              <tr>
                <th>Medicine Id</th>
                <th>Verification Status</th>
                <th></th>
              </tr>
              {this.state.dashTable.map((row, i) => {
                return (
                  <tr key={i}>
                    <td><div className="tooltipx">{row.id}
                      <span className="tooltiptextx">{row.id}</span>
                    </div></td>
                    {!row.isVerified && <td><button type="button" className="btn btn-warning" onClick={this.verifyMed(row.id)}>Verify</button></td>}
                    {row.isVerified && <td><button type="button" className="btn btn-success" disabled>Verified</button></td>}
                    {row.isVerified && <td><button type="button" className="btn btn-info" onClick={this.changeState(row.id)}>Change State</button>   
                      </td>}
                  </tr>
                )
              })}
            </tbody>
          </table>

        </div>
      </>
    )
  }
}
