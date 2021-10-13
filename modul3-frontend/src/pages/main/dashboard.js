import React from 'react'
import { Link } from "react-router-dom";

class Index extends React.Component{
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
            </div>
        )
    }
}

export default Index;