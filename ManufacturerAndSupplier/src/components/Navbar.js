import React from 'react'

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success px-2" >
        <a className="navbar-brand" href="#">PureMeds</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/dashboard">Dashboard <span className="sr-only"></span></a>
            </li>
            <li className="nav-item">
              {/* <a className="nav-link" href="#">{window.myDet['name']}</a> */}
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
