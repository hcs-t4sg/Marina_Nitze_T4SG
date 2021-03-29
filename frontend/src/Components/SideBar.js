// JavaScript source code
import React, { useState } from "react";
import "./SideBar.css";
import home from "../res/house.png";
import faq from "../res/faq.png";
import bulb from "../res/lightbulb.png";
import map from "../res/map.png";
import graph from "../res/scorecard.png";
import ribbon from "../res/ribbon.png";
import { Link } from 'react-router-dom';

export default function SideBar(props) {

    var show = props.show;

    return (
        <div className={show ? "nav-background": "nav-inactive"}>
            <div className="nav-block">
                <img className="side-image" src={home} />
                <Link className="nav-link"
                    to={{ pathname: '/home' }}
                    onClick={props.click}>
                    Home
            </Link>
            </div>
            <div className="nav-block">
                <img className="side-image" src={graph} />
                <Link className="nav-link"
                    to={{ pathname: '/scorecard' }}
                    onClick={props.click}>
                    Scorecard
                </Link>

            </div>

            <div className="nav-block">
                <img className="side-image" src={map} />
                <Link className="nav-link"
                    to={{ pathname: '/map' }}
                    onClick={props.click}>
                    Map
                </Link>
            </div>

            <div className="nav-block">
                <img className="side-image" src={ribbon} />
                <Link className="nav-link"
                    to={{ pathname: '/practices' }}
                    onClick={props.click}>
                    Promising Practices
                </Link>
            </div>

            <div className="nav-block">
                <img className="side-image" src={bulb} />
                <Link className="nav-link"
                    to={{ pathname: '/resources' }}
                    onClick={props.click}>
                    Resources
                </Link>
            </div>

            <div className="nav-block">
                <img className="side-image" src={faq} />
                <Link className="nav-link"
                    to={{ pathname: '/about' }}
                    onClick={props.click}>
                    About
                </Link>
            </div>
            
            
            
            
        </div>
    );
}
      

