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
	            <h1 className="title"> Child Welfare Reform. </h1>
	            <h4 className="description"> Description of the site and a high-level overview of its features. 
	            					Mention types of data provided, issue areas covered, and that there is 
	            					access to best practices. </h4>
	            <button type="button" className="go-button" onClick={routeChange} >Go!</button>
            </div>
        </div>

    );
}

export default HomePage