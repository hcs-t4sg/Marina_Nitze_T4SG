import React, { Component } from "react";
import "./ImplementBlock.css"
import ImplementationModal from "./ImplementationModal"

class ImplementBlock extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            expanded: false,
            title: props.guidance.name,
            body: props.guidance.why,
            link: props.guidance.link
            
        }
    }

    updateExpand = () => {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        if (!this.state.expanded) {

            return (
                <div className="implement-block">
                    <h2> {this.state.title} </h2>
                    <p> {this.state.body} </p>
                    <button className="expand-btn" onClick={this.updateExpand}> See More </button>
                </div>
            )
        }

        return (
            <div className="modal-view">

                <div className="implement-block">
                    <h2> {this.state.title} </h2>
                    <p> {this.state.body} </p>
                    <button className="expand-btn" onClick={this.updateExpand}> See Less </button>
                </div>
                <ImplementationModal
                    handleClose={this.updateExpand}
                    link={this.props.link}
                />
            </div>
        )
    }
        
}

export default ImplementBlock