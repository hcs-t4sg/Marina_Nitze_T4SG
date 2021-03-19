import React, { Component } from "react";
import "./ImplementBlock.css"
import ImplementationModal from "./ImplementationModal"

class ImplementBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            title: "Fee for Background Checks",
            body: "Some description text outlining the issue with the requirement and the benefits of the promising practice. Perhaps there should also be a link to Marina's resource guide for states regarding implementing this promising practice.",
            link: this.props.link
            
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