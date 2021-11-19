import React from 'react'
import Header from "../../components/Header/Header";

class Index extends React.Component{
    constructor(){
        super()
        // get token from local.storage
        if(!localStorage.getItem("token")) {
            window.location = "/login"
        }
    }
    render(){
        return(
            <>
                <Header/>
                <div className="container pt-4">
                    <h3 className="font-weight-bold text-muted text-uppercase mb-3">Page Laporan</h3>
                </div>
            </>
        )
    }
}

export default Index;