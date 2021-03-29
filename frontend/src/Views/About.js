// JavaScript source code
import axios from "axios";
import React, { Component, useState } from "react";
// import Glyphs from '../Components/Glyphs'
import "../App.css"
import { Link } from 'react-router-dom';


// class About extends Component {
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return 
//         (
//             <h1 className="introduction-title"> Introduction </h1>
//         );
//     }
// }

// export default About;
export default function About() {
    return (
        // <div className="teal-section"></div>
        <div className="text_area_about">
            <h1 className="introduction-title"> Purpose </h1>
            <div id="block_text_about">
                <h3>
                    Some paragraph text here giving an overview of this segment of the website. Next paragraph begins here. Mention what type of data has been displayed.
                </h3>
            </div>
            <h1 className="introduction-title"> About Marina Nitze </h1>
            <div id="block_text_about">
                <h3>
                    Our amazing client.
                </h3>
            </div>
            <h1 className="introduction-title"> About HCS Tech for Social Good </h1>
            <div id="block_text_about">
                <h3>
                    Best club on campus.
                </h3>
            </div>
            <h1 className="introduction-title"> Team </h1>
            <div id="block_text_about">
                <h3>
                    Best team!
                </h3>
            </div>
        </div>
    );
}
