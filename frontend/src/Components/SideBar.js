// JavaScript source code
import React, { useState } from "react";
import "./SideBar.css";
import home from "../res/house.png";
import faq from "../res/faq.png";
import bulb from "../res/lightbulb.png";
import { Link } from 'react-router-dom';

export default function SideBar(props) {

    var show = props.show;

    return (
        <div className={show ? "nav-background": "nav-inactive"}>
            <div className="nav-block">
                <img className="side-image" src={home} />
                <Link className="nav-link"
                    to={{ pathname: '/dashboard' }}
                    onClick={props.click}>
                    Dashboard
            </Link>
            </div>

            <div className="nav-block">
                <img className="side-image" src={faq} />
                <Link className="nav-link"
                    to={{ pathname: '/about-us' }}
                    onClick={props.click}>
                    About Us
                </Link>
            </div>

            <div className="nav-block">
                <img className="side-image" src={bulb} />
                <Link className="nav-link"
                    to={{ pathname: 'https://www.childwelfareplaybook.com/' }}
                    onClick={props.click}
                    target="_blank">
                    Resources
                </Link>
            </div>
            
        </div>
    );
}
      

