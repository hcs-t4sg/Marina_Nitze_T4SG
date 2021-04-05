import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideBar from './Components/SideBar'
import LandingPage from "./Views/LandingPage"
import Scorecard from "./Views/Scorecard"
import Resources from "./Views/Resources"
import AboutUs from "./Views/AboutUs"
import { useState } from "react";
import Header from "./Components/Header"
import AdminView from "./Views/AdminView"


function App() {
    const [sidebar, setSidebar] = useState(false)
    const showSideBar = () => {
        setSidebar(!sidebar)
    }

    return (
        <div className="App">
            <Header onClick={showSideBar} toggle={sidebar}/>

            <header className="App-header">
                <Router>
                    <SideBar className="side-bar" click={showSideBar} show={sidebar}/>
                    <Switch>
                        <Route path={"/home"} component={LandingPage} />
                        <Route path="/resources" component={Resources} />
                        <Route path="/faq" component={FAQ} />
                        <Route path={"/adminView"} component={AdminView} />
                        <Route path="/about-us" component={AboutUs} />
                        <Route path={["", "/scorecard"]} component={Scorecard} />
                    </Switch>
                </Router>
            </header>
        </div>
    );
}

export default App;
