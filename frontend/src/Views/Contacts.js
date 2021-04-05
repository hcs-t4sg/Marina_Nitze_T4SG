// JavaScript source code
import "../App.css"
import "../Components/Contacts.css"
import Subheader from "../Components/Subheader";

export default function Contacts() {
    return (
        <div className="contacts-page">
	        <div className="teal-section-container">
	            <div className="teal-section"></div>
	            <h2 className="header-subtitle"> Child Welfare Playbook </h2>
	            <h1 className="title">Contacts </h1>
	        </div>

	        <Subheader title="Write to Us"/>

	        <div className="contact-grid">
                <div className="text-row"></div>
            </div>

        </div>

    );
}
