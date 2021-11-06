import React from 'react'

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
            <div>
                <h1>Page User</h1>
            </div>
        )
    }
}

export default Index;