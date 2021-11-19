import React from 'react'
import { Switch, Route, Link} from "react-router-dom";
import pages from './pages';

// -- Component Styles
import "./styles/app.scss";

function App() {
  return (
    <Switch>
        <Route exact path='/' component={pages.dashboard}/>
        <Route path='/login' component={pages.login}/>
        <Route path='/outlet' component={pages.outlet}/>
        <Route path='/paket' component={pages.paket}/>
        <Route path='/customer' component={pages.customer}/>
        <Route path='/laporan' component={pages.laporan}/>
        <Route path='/transaksi' component={pages.transaksi}/>
        <Route path='/user' component={pages.user}/>
    </Switch>
  );
}

export default App;