// JavaScript source code
import axios from "axios";
import React, { Component } from "react";
import "../App.css"
import "../Components/Contacts.css"
import Subheader from "../Components/Subheader";


class Contacts extends Component {

	constructor(props) {
        super(props);
        this.state = {
            contactRows: []
        }
    }

	componentDidMount() {
        axios
            .get("http://localhost:8000/api/contacts/")
            .then(res => {
                this.createContactRows(res.data);
            })
            .catch(err => console.log(err));
    }

    createContactRows(data) {
    	var contactRows = [
    		<div>
	            <div className="contact-grid-header">
	            	<h3 className="contacts-title"> Practice </h3>
	                <h3 className="contacts-title"> Name </h3>
	                <h3 className="contacts-title"> Position </h3>
	                <h3 className="contacts-title"> Email </h3>
	            </div>
	            <div className="line"></div>
	        </div>
        ];
    	for (var i = 0; i < data.length; i++) {
    		console.log(data[0]['issue_area']);
    		let newRow = (
    				<div>
	    				<div className="contact-grid-row">
	    					<div className="contact-grid-element">{data[i]['issue_area']}</div>
		    				<div className="contact-grid-element">{data[i]['first_name']}</div>
		    				<div className="contact-grid-element">{data[i]['last_name']}</div>
		    				<div className="contact-grid-element" className="contact-email">{data[i]['email']}</div>
		    			</div>
		    			<div className="line"></div>
	    			</div>
            	);
            contactRows.push(newRow);

    	}
    	this.setState({ contactRows: contactRows });
    }

    render() {
    	return (
	        <div className="contacts-page">
		        <div className="teal-section-container">
		            <div className="teal-section"></div>
		            <h2 className="header-subtitle"> Child Welfare Playbook </h2>
		            <h1 className="title">Family Findings State Contacts </h1>
		        </div>
		        <Subheader title="Family Findings: Contacts"/>
		        <div className="contact-grid-container">
		        	<div className="contact-grid">{this.state.contactRows}</div>
	            </div>

	        </div>

    	);
    }
}

export default Contacts
