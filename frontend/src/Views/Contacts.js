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
            <div className="contacts-header">
                <h3 className="contacts-title"> Name </h3>
                <h3 className="contacts-title"> Position </h3>
                <h3 className="contacts-title"> Email </h3>
            </div>
        ];
    	for (var i = 0; i < data.length; i++) {
    		// console.log(data[i]['email']);
    		let newRow = (
    				<div className="contacts-row">
	    				<div className="contact-grid-element">{data[i]['first_name']}</div>
	    				<div className="contact-grid-element">{data[i]['last_name']}</div>
	    				<div className="contact-grid-element">{data[i]['email']}</div>
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

		        <div className="contact-grid">
		        	<div className="contact-grid">{this.state.contactRows}</div>
	            </div>

	        </div>

    	);
    }
}

export default Contacts
