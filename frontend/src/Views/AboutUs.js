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
                    	<p className="paragraph"> We want to provide state officials with useful information about what 
                                                    promising practices other states are currently using in the chlid welfare 
                                                    space.</p>
                    	<p className="paragraph"> Our hope is that states will be able to collaborate, learn from each other, 
                                                    and take action to improve child welfare system in their state.</p>
                    </div>
                </div>

                <div className="about-section">
                    <Subheader title="About Marina Nitze"/>
                    <div className="text-row">
                    	<p className="paragraph"> The information for this website comes from Marina Nitze’s work. Marina is 
                                                currently working with multiple states to help identify and implement promising 
                                                practices in foster care, in order to keep at-risk </p>
                    	<p className="paragraph"> kids safe and safely reduce time spend in foster care. You can learn more about 
                                                Marina <a href="https://www.marinanitze.com/" target="_blank">here</a> and 
                                                email her directly at <a href="mailto:marina@marinanitze.com" target="_blank">
                                                marina@marinanitze.com</a> to get in touch.</p>
                    </div>
                </div>

                <div className="about-section">
                    <Subheader title="About HCS Tech for Social Good"/>
                    <div className="text-row">
                    	<p className="paragraph"> HCS Tech for Social Good (T4SG) is a student-run organization at Harvard that 
                                                leverages Harvard talent to partner with nonprofits, government agencies, and</p>
                    	<p className="paragraph"> social impact organizations to amplify their impact through technology. This 
                                        website was created by a project team at T4SG. You can learn more about T4SG here.</p>
                    </div>
                </div>

                <div className="headshot-section">
                    <Subheader className="gallery-title" title="Team"/>
                    <div className="image-gallery">
                        <div className="headshot-wrap">
                            <img className="headshot" src="http://placehold.it/300x300.jpg" />
                            <div className="headshot-background">
                                <p className="headshot-text">Monica Chang</p>
                                <p className="headshot-text"> <a href="mailto:mychang07@gmail.com" target="_blank">Email</a></p>
                                <p className="headshot-text"><a href="https://www.linkedin.com/in/monica-yang-chang/" target="_blank">Linkedin</a></p>
                            </div> 
                        </div>
                        <div className="headshot-wrap">
                            <img className="headshot" src="http://placehold.it/300x300.jpg" />
                            <div className="headshot-background">
                                <p className="headshot-text">Nikita Jindal</p>
                                <p className="headshot-text"> <a href="mailto:nikita.jindal@gmail.com" target="_blank">Email</a></p>
                            </div>  
                        </div>
                        <div className="headshot-wrap">
                            <img className="headshot" src="http://placehold.it/300x300.jpg" />
                            <div className="headshot-background">
                                <p className="headshot-text">Catherine Huang</p>
                                <p className="headshot-text"> <a href="mailto:czhuangusa@gmail.com" target="_blank">Email</a></p>
                                <p className="headshot-text"><a href="https://www.linkedin.com/in/catherinehuang82/" target="_blank">Linkedin</a></p>
                            </div>  
                        </div>
                        <div className="headshot-wrap">
                            <img className="headshot" src="http://placehold.it/300x300.jpg" />
                            <div className="headshot-background">
                                <p className="headshot-text">Justin Ye</p>
                                <p className="headshot-text"> <a href="mailto:justinhye@gmail.com" target="_blank">Email</a></p>
                            </div> 
                        </div>
                        <div className="headshot-wrap">
                            <img className="headshot" src="http://placehold.it/300x300.jpg" />
                            <div className="headshot-background">
                                <p className="headshot-text">Anne Foley</p>
                                <p className="headshot-text"> <a href="mailto:annefoley1029@yahoo.com" target="_blank">Email</a></p>
                                <p className="headshot-text"><a href="https://www.linkedin.com/in/anne-foley-4900901b7/" target="_blank">Linkedin</a></p>
                            </div> 
                        </div>
                        <div className="headshot-wrap">
                            <img className="headshot" src="http://placehold.it/300x300.jpg" />
                            <div className="headshot-background">
                                <p className="headshot-text">Katherine Lazar</p>
                                <p className="headshot-text"> <a href="mailto:katherineelazar@gmail.com" target="_blank">Email</a></p>
                                <p className="headshot-text"><a href="https://www.linkedin.com/in/katherineelenalazar/" target="_blank">Linkedin</a></p>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
