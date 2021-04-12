// JavaScript source code
import { useHistory } from 'react-router-dom';
import "../App.css"
import "../Components/HomePage.css";

function HomePage() {

	const history = useHistory();

	  const routeChange = () =>{ 
	    let path = `home`; 
	    history.push(path);
	  }

    return (
        <div className="homepage">
        	<div className="content-container">
	        	<div className="home-background"></div>
	        	<h2 className="header-subtitle"> Relevant data. Actionable solutions. </h2>
	            <h1 className="title"> The Child Welfare Playbook. </h1>
	            <h4 className="description"> Welcome to the Child Welfare Playbook, a collection of actionable 
	            				promising practices in child welfare. Use our Progress Dashboard to view national 
	            				comparisons, state reports, and other resources. </h4>
	            <button type="button" className="go-button" onClick={routeChange} >Go!</button>
            </div>
        </div>

    );
}

export default HomePage