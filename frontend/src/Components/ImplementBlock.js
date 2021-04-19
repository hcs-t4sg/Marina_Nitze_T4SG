import React, { Component } from "react";
import "./ImplementBlock.css"
import ImplementationModal from "./ImplementationModal"

class ImplementBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            title: props.title,
            question: props.question,
            description: props.description,
            quote: props.quote,
            link: props.link
            
        }
    }

    updateExpand = () => {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        // console.log(this.state.title);
        if (!this.state.expanded) {

            return (
                <div className="implement-block">
                    <h2 className="implement-title"> {this.state.title} </h2>
                    <p className="implement-question"> {this.state.question} </p>
                    <button className="expand-btn" onClick={this.updateExpand}> See More </button>
                </div>
            )
        }

        return (
            <div className="modal-view">
                <div className="implement-block">
                    <h2 className="implement-title"> {this.state.title} </h2>
                    <p className="implement-body"> {this.state.body} </p>
                    <button className="expand-btn" onClick={this.updateExpand}> See Less </button>
                </div>
                <ImplementationModal
                    handleClose={this.updateExpand}
                    link={this.props.link}
                    description={this.props.description}
                    quote={this.state.quote}
                />
            </div>
        )
    }
        
}

export default ImplementBlock