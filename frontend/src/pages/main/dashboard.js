import React from 'react'
import { Link } from "react-router-dom";

class Index extends React.Component{
    constructor(){
        super()
        // get token from local.storage
        if(!localStorage.getItem("token")) {
            window.location = "/login"
        }
    }
    Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        window.location = "/login"
    }
    render(){
        return(
            <div>
                <h1>Page Dashboard</h1>
                <ul>
                    <li><Link to="/customer">customer</Link></li>
                    <li><Link to="/laporan">laporan</Link></li>
                    <li><Link to="/login">login</Link></li>
                    <li><Link to="/outlet">outlet</Link></li>
                    <li><Link to="/paket">paket</Link></li>
                    <li><Link to="/transaksi">transaksi</Link></li>
                    <li><Link to="/user">user</Link></li>
                </ul>
                <button className="btn btn-lg btn-success" onClick={() => this.Logout()}>Logout</button>
            </div>
        )
    }
}

export default Index;