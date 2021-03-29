import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideBar from './Components/SideBar'
import LandingPage from "./Views/LandingPage"
import Map from "./Views/Map"
import Scorecard from "./Views/Scorecard"
import Practices from "./Views/Practices"
import Resources from "./Views/Resources"
import DataUpdateForm from './Views/DataUpdateForm'
import FAQ from "./Views/FAQ"
import { useState } from "react";
import Header from "./Components/Header"


function App() {
    const [sidebar, setSidebar] = useState(false)
    const [adminView, setAdminView] = useState(false)
    const showSideBar = () => {
        setSidebar(!sidebar)
    }
    const toggleAdminView = () => {
        setAdminView(!adminView)
    }

    return (
        <div className="App">
            <Header onClick={showSideBar} toggle={sidebar}/>

            <header className="App-header">
                <Router>
                    <SideBar className="side-bar" click={showSideBar} show={sidebar}/>
                    <Switch>
                        <Route path={"/home"} component={LandingPage} />
                        <Route path="/map" component={Map} />
                        <Route path="/practices" component={Practices} />
                        <Route path="/resources" component={Resources} />
                        <Route path="/faq" component={FAQ} />
                        <Route path={"/admin"} component={DataUpdateForm} />
                        <Route path={["", "/scorecard"]} component={Scorecard} />

                    </Switch>
                </Router>
            </header>
        </div>
    );
}

export default App;
