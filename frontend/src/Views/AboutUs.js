// JavaScript source code
import "../App.css"
import "../Components/AboutUs.css"
import Subheader from "../Components/Subheader";

export default function AboutUs() {
    return (
        <div className="about-us-page">
            <div className="teal-section-container">
                <div className="teal-section"></div>
                <h2 className="header-subtitle"> Child Welfare Playbook </h2>
                <h1 className="title">About Us </h1>
            </div>

            <div className="grid-display">
                <div className="about-section">
                    <Subheader title="Purpose"/>
                    <div className="text-row">
                    	<p className="paragraph"> Some paragraph text here giving an overview of this segment of the website.</p>
                    	<p className="paragraph"> Next paragraph begins here. Mention what type of data has been displayed.</p>
                    </div>
                </div>

                <div className="about-section">
                    <Subheader title="About Marina Nitze"/>
                    <div className="text-row">
                    	<p className="paragraph"> Some paragraph text here giving an overview of this segment of the website.</p>
                    	<p className="paragraph"> Next paragraph begins here. Mention what type of data has been displayed.</p>
                    </div>
                </div>

                <div className="about-section">
                    <Subheader title="About HCS Tech for Social Good"/>
                    <div className="text-row">
                    	<p className="paragraph"> Some paragraph text here giving an overview of this segment of the website.</p>
                    	<p className="paragraph"> Next paragraph begins here. Mention what type of data has been displayed.</p>
                    </div>
                </div>

                <div className="about-section">
                    <Subheader title="Team"/>
                    <div className="text-row">
                    	<p className="paragraph"> Some paragraph text here giving an overview of this segment of the website.</p>
                    	<p className="paragraph"> Next paragraph begins here. Mention what type of data has been displayed.</p>
                    </div>
                </div>
            </div>
        </div>

    );
}
