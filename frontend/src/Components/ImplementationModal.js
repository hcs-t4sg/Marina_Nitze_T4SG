import React, { Component } from "react";

export default class ImplementationModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            promising: "Implements Practice",
            p_count: this.props.p_count,
            opposite: "Does Not Implement Practice",
            jurisdictions: this.props.jurisdictions,
            description: this.props.description,
            example: this.props.example ? this.props.example: "Sorry, no example has been provided. Please see Marina's page for more information",
            playbook_link: this.props.link,
            contact: "contact_info"
        };
    }

    handleClose = (e) => {
        this.props.handleClose();
    }

    render() {
        if (this.props.num_subpractices) {
            var submetric_tags = []

            for (var i = 0; i < this.props.num_subpractices; i++) {
                submetric_tags.push(
                    <div
                        className="promising-div"
                        key={this.props.title + "submetric" + i}
                    >
                        <p className="subpractice-block"> {this.props.subpractices[i]} </p>
                        <div className="state-tag"> <p> {this.state.p_count[i]} States </p> </div>

                    </div>
                )
            }

            return (
                <div className="modal">
                    <section className="modal-main">
                        <div className="close-button-div">
                            <a onClick={this.handleClose} className="close" tabindex="0" role="button">close</a>
                        </div>

                        <h4 className="text-area"> Promising Practice: </h4>
                        <h1 className="text-area"> {this.state.title} </h1>

                        <div className="promising-div">

                            <h3 className="submetrics-title"> Submetrics </h3> 
                            <div className="submetrics-num">
                                <h5 className="right-align-text"> Number of States Implementing Subpractice </h5>
                            </div>

                        </div>
                        <div className="submetric-div">
                            {submetric_tags}
                        </div>

                        <div className="body-div">
                            <div className="description-div">
                                <h3> Description </h3>
                                <p> {this.state.description} </p>
                            </div>

                            <div className="description-div">
                                <h3> Example of Implementation </h3>
                                <p dangerouslySetInnerHTML={{__html: this.state.example}}></p>
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

                        </div>


                    </section>
                </div>
            );
        }

        return (
            <div className="modal">
                <section className="modal-main">
                    <div className="close-button-div">
                        <a onClick={this.handleClose} className="close" tabindex="0" role="button">close</a>
                    </div>

                    <h4 className="text-area"> Promising Practice: </h4>
                    <h1 className="text-area"> {this.state.title} </h1>

                    <div className="tag-div">
                        <div className="promising-div">

                            <p> {this.state.promising} </p>
                            <div className="promising-tag">  <p> Promising </p> </div>

                            <div className="state-tag"> <p> {this.state.p_count} States Implement This Practice</p> </div>

                        </div>

                        <div className="opposite-div">

                            <p> {this.state.opposite} </p>
                            <div className="state-tag"> <p> {this.state.jurisdictions - this.state.p_count} States Do Not Implement This Practice</p> </div>

                        </div>
                    </div>

                    <div className="body-div">
                        <div className="description-div">
                            <h3> Description </h3>
                            <p> {this.state.description} </p>
                        </div>

                        <div className="description-div">
                            <h3> Example of Implementation </h3>
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
                    </div>


                </section>
            </div>
        );
    }
}