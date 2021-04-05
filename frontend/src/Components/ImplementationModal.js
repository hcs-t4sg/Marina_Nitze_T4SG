import React, { Component } from "react";

export default class ImplementationModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Fee for Background Checks",
            promising: "Does Not Charge a Fee",
            p_count: 21,
            opposite: "Charges a Fee for Background Checks",
            o_count: 33,
            description: "description goes here",
            example: "example goes here",
            playbook_link: this.props.link,
            contact: "contact_info"
        };
    }

    handleClose = (e) => {
        this.props.handleClose();
    }

    render() {
        return (
            <div className="modal">
                <section className="modal-main">
                    <div className="close-button-div">
                        <button type="button" onClick={this.handleClose}>
                            Close
                        </button>
                    </div>

                    <h4 className="text-area"> Promising Practice: </h4>
                    <h1 className="text-area"> {this.state.title} </h1>

                    <div className="tag-div">
                        <div className="promising-div">

                            <p> {this.state.promising} </p>
                            <div className="promising-tag">  <p> Promising </p> </div>

                            <div className="state-tag"> <p> {this.state.p_count} States </p> </div>

                        </div>

                        <div className="opposite-div">

                            <p> {this.state.opposite} </p>
                            <div className="state-tag"> <p> {this.state.o_count} States </p> </div>

                        </div>
                    </div>

                    <div className="body-div">
                        <div className="description-div">
                            <h3> Description </h3>
                            <p> {this.state.description} </p>
                        </div>

                        <div className="description-div">
                            <h3> Examples of Implementation </h3>
                            <p> {this.state.example} </p>
                        </div>

                    </div>

                    <div className="button-div">
                        <div> 

                            <a href={this.state.playbook_link} target="blank">
                                <button className="info-btn">
                                    View Marina's Resource Guide
                                </button>
                            </a>
                        </div>
                        <div>
                            <button className="info-btn">
                                Contact an Official who Implemented this Practice
                            </button>
                        </div>
                    </div>


                </section>
            </div>
        );
    }
}