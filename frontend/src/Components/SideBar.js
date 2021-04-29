// JavaScript source code
import React, { useState } from "react";
import "./SideBar.css";
import home from "../res/home.png";
import faq from "../res/light-bulb.png";
import people from "../res/about-us.png";
import compass from "../res/compass.png";
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
                <img className="side-image" src={people} />
                <Link className="nav-link"
                    to={{ pathname: '/contacts' }}
                    onClick={props.click}>
                    Contacts
                </Link>
            </div>

            <div className="nav-block">
                <img className="side-image" src={compass}/>
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
      

