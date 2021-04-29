// JavaScript source code
import "../App.css"
import "../Components/AboutUs.css"
import Subheader from "../Components/Subheader";
import monica from '../res/about-us-headshots/monica.jpg';
import nikita from '../res/about-us-headshots/nikita.jpg';
import catherine from '../res/about-us-headshots/catherine.jpg';
import justin from '../res/about-us-headshots/justin.jpg';
import anne from '../res/about-us-headshots/anne.jpeg';
import kath from '../res/about-us-headshots/kath.png';

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
                    	<p className="paragraph"> The Child Welfare Playbook aims to provide state foster care officials with useful 
                                                information about what other states are doing in the child welfare space.</p>
                    	<p className="paragraph"> Our hope is that states will be able to collaborate, learn from each other, and 
                                                    take action to improve the child welfare system in their state.</p>
                    </div>
                </div>

                <div className="about-section">
                    <Subheader title="About Marina Nitze"/>
                    <div className="text-row">
                    	<p className="paragraph"> The information for this website was compiled by Marina Nitze. Marina currently 
                                                works with a 16-state working group to identify and implement promising practices 
                                                in foster care - all in order to keep at-risk </p>
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
                                        website was created by a project team at T4SG. You can learn more about T4SG  
                                        <a href="https://socialgood.hcs.harvard.edu/" target="_blank"> here.</a></p>
                    </div>
                </div>

                <div className="headshot-section">
                    <Subheader className="gallery-title" title="Team"/>
                    <div className="image-gallery">
                        <div className="headshot-wrap">
                            <img className="headshot" src={monica} width="300" height="300"/>
                            <div className="headshot-background">
                                <p className="headshot-text">Monica Chang</p>
                                <p className="headshot-text">Project Manager</p>
                                <p><a href="mailto:mychang07@gmail.com" target="_blank" className="headshot-text">Email</a></p>
                                <p><a href="https://www.linkedin.com/in/monica-yang-chang/" target="_blank" className="headshot-text">Linkedin</a></p>
                            </div> 
                        </div>
                        <div className="headshot-wrap">
                            <img className="headshot" src={nikita} width="300" height="300" />
                            <div className="headshot-background">
                                <p className="headshot-text">Nikita Jindal</p>
                                <p className="headshot-text">Senior Software Engineer</p>
                                <p><a href="mailto:nikita.jindal@gmail.com" target="_blank" className="headshot-text">Email</a></p>
                            </div>  
                        </div>
                        <div className="headshot-wrap">
                            <img className="headshot" src={catherine} width="300" height="300" />
                            <div className="headshot-background">
                                <p className="headshot-text">Catherine Huang</p>
                                <p className="headshot-text">UX Designer</p>
                                <p><a href="mailto:czhuangusa@gmail.com" target="_blank" className="headshot-text">Email</a></p>
                                <p><a href="https://www.linkedin.com/in/catherinehuang82/" target="_blank" className="headshot-text">Linkedin</a></p>
                            </div>  
                        </div>
                        <div className="headshot-wrap">
                            <img className="headshot" src={justin} width="300" height="300" />
                            <div className="headshot-background">
                                <p className="headshot-text">Justin Ye</p>
                                <p className="headshot-text">Software Engineer</p>
                                <p><a href="mailto:justinhye@gmail.com" target="_blank" className="headshot-text">Email</a></p>
                            </div> 
                        </div>
                        <div className="headshot-wrap">
                            <img className="headshot" src={anne} width="300" height="300" />
                            <div className="headshot-background">
                                <p className="headshot-text">Anne Foley</p>
                                <p className="headshot-text">Software Engineer</p>
                                <p><a href="mailto:annefoley1029@yahoo.com" target="_blank" className="headshot-text">Email</a></p>
                                <p><a href="https://www.linkedin.com/in/anne-foley-4900901b7/" target="_blank" className="headshot-text">Linkedin</a></p>
                            </div> 
                        </div>
                        <div className="headshot-wrap">
                            <img className="headshot" src={kath} width="300" height="300" />
                            <div className="headshot-background">
                                <p className="headshot-text">Katherine Lazar</p>
                                <p className="headshot-text">Software Engineer</p>
                                <p><a href="mailto:katherineelazar@gmail.com" target="_blank" className="headshot-text">Email</a></p>
                                <p><a href="https://www.linkedin.com/in/katherineelenalazar/" target="_blank" className="headshot-text">Linkedin</a></p>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
