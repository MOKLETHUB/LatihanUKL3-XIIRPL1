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
                <h1>Page Customer</h1>
                <div class="alert alert-primary" role="alert">
                    A simple primary alert—check it out!
                </div>
            </div>
        )
    }
}

export default Index;