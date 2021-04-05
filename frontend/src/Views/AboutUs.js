// JavaScript source code
import "../App.css"
import Subheader from "../Components/Subheader";

export default function AboutUs() {
    return (
        <div className="landing-page">
            <div className="teal-section-container">
                <div className="teal-section"></div>
                <h2 className="header-subtitle"> Child Welfare Playbook </h2>
                <h1 className="title">About Us </h1>
            </div>

            <div className="content">
                <div id="introduction-container">
                    <Subheader title="Introduction"/>
                </div>
            </div>
        </div>

    );
}
