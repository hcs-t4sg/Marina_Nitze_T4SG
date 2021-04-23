import axios from "axios";
import React, { Component } from "react";
import "../App.css"

class AdminView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            issue_area: {
                title: "",
                num_practices: 1,
                intro_text: "",
                conclusion_text: "",
                practice_1: "",
                practice_1_question: "",
                practice_1_description: "",
                practice_1_example: "",
                practice_1_link: "",
                num_subpractices_1: 0,
                subpractices_1_names: ",,",
                practice_2: "",
                practice_2_question: "",
                practice_2_description: "",
                practice_2_example: "",
                practice_2_link: "",
                num_subpractices_2: 0,
                subpractices_2_names: ",,",
                practice_3: "",
                practice_3_question: "",
                practice_3_description: "",
                practice_3_example: "",
                practice_3_link: "",
                num_subpractices_3: 0,
                subpractices_3_names: ",,",
                practice_4: "",
                practice_4_question: "",
                practice_4_description: "",
                practice_4_example: "",
                practice_4_link: "",
                num_subpractices_4: 0,
                subpractices_4_names: ",,",
                practice_5: "",
                practice_5_question: "",
                practice_5_description: "",
                practice_5_example: "",
                practice_5_link: "",
                num_subpractices_5: 0,
                subpractices_5_names: ",,",
                practice_6: "",
                practice_6_question: "",
                practice_6_description: "",
                practice_6_example: "",
                practice_6_link: "",
                num_subpractices_6: 0,
                subpractices_6_names: ",,",
                practice_7: "",
                practice_7_question: "",
                practice_7_description: "",
                practice_7_example: "",
                practice_7_link: "",
                num_subpractices_7: 0,
                subpractices_7_names: ",,",
            },
            states_data: [{
                id: 0,
                abbreviation: "",
                electronic_request: false,
                name: "",
                no_fee: false,
                no_contact: false,
                no_notary_required: false,
                no_witness_required: false,
                county_administered: false,
                population: 0,
            }],
        }
    }

    componentDidMount() {
        axios
            .get("https://marina-t4sg.herokuapp.com/api/states/")
            .then(res => this.getStatesData(res.data))
            .catch(err => console.log(err));
    }

    getStatesData(data) {
        let tempData = [];
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            tempData.push(
                {
                    id: i,
                    name: item["name"],
                    abbreviation: item["abbreviation"],
                    county_administered: item["county_administered"],
                    population: item["population"],
                })
        }

        this.setState({ states_data: tempData });
    }

    submitNewPractice = (item) => {
        axios
            .post('https://marina-t4sg.herokuapp.com/api/issue-areas/', item)
            .catch(err => console.log(err));

        for (var i = 0; i < this.state.states_data.length; i++) {
            axios.post('https://marina-t4sg.herokuapp.com/api/implementations/', {
                state: this.state.states_data[i].name,
                issue_area: item.title,

                practice_1: null,
                subpractice_1_1: null,
                subpractice_1_2: null,
                subpractice_1_3: null,

                practice_2: null,
                subpractice_2_1: null,
                subpractice_2_2: null,
                subpractice_2_3: null,

                practice_3: null,
                subpractice_3_1: null,
                subpractice_3_2: null,
                subpractice_3_3: null,

                practice_4: null,
                subpractice_4_1: null,
                subpractice_4_2: null,
                subpractice_4_3: null,

                practice_5: null,
                subpractice_5_1: null,
                subpractice_5_2: null,
                subpractice_5_3: null,

                practice_6: null,
                subpractice_6_1: null,
                subpractice_6_2: null,
                subpractice_6_3: null,

                practice_7: null,
                subpractice_7_1: null,
                subpractice_7_2: null,
                subpractice_7_3: null,
            })
                .catch(err => console.log(err));
        }
    }

    handleChange = e => {
        let { name, value } = e.target;
        const issue_area = { ...this.state.issue_area, [name]: value };
        this.setState({ issue_area });
    };

    updateSubpractice = e => {
        let { name, value } = e.target;
        var practice_id = name.charAt(0);
        var field_str_1 = "subpractices_";
        var field_str_2 = "_names";
        var field_name = field_str_1.concat(practice_id.concat(field_str_2));
        var subpractice = this.state.issue_area[field_name];

        const searchterm = ",";
        var comma_1_indx = subpractice.indexOf(searchterm);
        var name_1 = subpractice.substring(0,comma_1_indx);
        var comma_2_indx = subpractice.indexOf(searchterm,comma_1_indx+1);
        var name_2 = subpractice.substring(comma_1_indx+1,comma_2_indx);
        var name_3 = subpractice.substring(comma_2_indx+1);
        
        const subpractice_id = parseInt(name.charAt(1));
        if(subpractice_id == 1){
            subpractice = value.concat(searchterm.concat(name_2.concat(searchterm.concat(name_3))));
        }
        else if(subpractice_id==2){
            subpractice = name_1.concat(searchterm.concat(value.concat(searchterm.concat(name_3))));
        }
        else if(subpractice_id==3){
            subpractice = name_1.concat(searchterm.concat(name_2.concat(searchterm.concat(value))));
        }

        const issue_area = { ...this.state.issue_area, [field_name]: subpractice };
        this.setState({ issue_area });
    }

    increment = e => {
        let {name, value} = e.target;
        value = parseInt(value);
        var max = 0;
        if(name.includes("num_practices")){ max = 7;}
        else if(name.includes("num_subpractices")) {max = 3;}
        if (value < max) {
            const issue_area = {
                ...this.state.issue_area,
                [name]: value + 1
            };
            this.setState({ issue_area });
        }
    }

    decrement = e => {
        let {name, value} = e.target;
        value = parseInt(value);
        if (value > 0) {
            const issue_area = {
                ...this.state.issue_area,
                [name]: value - 1
            };
            this.setState({ issue_area });
        }
    }

    render() {

        var practice_fields = [];
        var title_str = "Practice #"
        var name_str = "practice_"
        var question_str = "_question"
        var description_str = "_description"
        var example_str = "_example"
        var link_str = "_link"
        var num_subpractices_str = "num_subpractices_"
        for (var i = 1; i <= this.state.issue_area.num_practices; i++) {
            var num_str = String(i)

            var subpractice_fields = []
            for (var j = 1; j<= this.state.issue_area[num_subpractices_str.concat(num_str)]; j++){
                subpractice_fields.push(
                    {id_pair: num_str.concat(String(j))})
            }
            
            practice_fields.push({
                title: title_str.concat(num_str),
                name: name_str.concat(num_str),
                question: name_str.concat(num_str.concat(question_str)),
                description: name_str.concat(num_str.concat(description_str)),
                example: example_str.concat(num_str.concat(example_str)),
                link: name_str.concat(num_str.concat(link_str)),
                num_subpractices: num_subpractices_str.concat(num_str),
                subpractice_names: subpractice_fields
            })
        }


        return (
            <div className="admin-space">

                <h2>Create a New Issue Area</h2>

                <div className="admin-input-area">
                    <div>Issue Area:<font color="#FF0000">*</font></div>
                    <input
                        type="text"
                        className="admin-input-line"
                        name="title"
                        onChange={this.handleChange}
                    ></input>
                </div>

                <div className="admin-input-area">
                    <div>Number of Practices:</div>
                    <div className='admin-counter'>
                        <div >{this.state.issue_area.num_practices}</div>
                        <button name="num_practices" value = {this.state.issue_area.num_practices}
                            onClick={this.increment}> + </button>
                        <button name="num_practices" value = {this.state.issue_area.num_practices}
                            onClick={this.decrement}> - </button>
                    </div>
                </div>

                <div className="admin-input-area">
                    <div>Intro Text:<font color="#FF0000">*</font> </div>
                    <textarea
                        type="text"
                        className="admin-input-text"
                        rows="5"
                        cols="50"
                        name="intro_text"
                        onChange={this.handleChange}
                    ></textarea>
                </div>

                <div className="admin-input-area">
                    <div>Conclusion Text:<font color="#FF0000">*</font> </div>
                    <textarea
                        type="text"
                        className="admin-input-text"
                        rows="5"
                        cols="50"
                        name="conclusion_text"
                        onChange={this.handleChange}
                    ></textarea>
                </div>

                {practice_fields.map(practice =>

                    <div className="admin-practice-area">
                        <h4>{practice.title}</h4>
                        <div className="admin-input-area">
                            <div>Name:</div>
                            <input
                                type="text"
                                className="admin-input-line"
                                name={practice.name}
                                onChange={this.handleChange}
                            ></input>
                        </div>

                        <div className="admin-input-area">
                            <div>Question:</div>
                            <input
                                type="text"
                                className="admin-input-line"
                                name={practice.question}
                                onChange={this.handleChange}
                            ></input>
                        </div>

                        <div className="admin-input-area">
                            <div>Description: </div>
                            <textarea
                                type="text"
                                className="admin-input-text"
                                rows="5"
                                cols="50"
                                name={practice.description}
                                onChange={this.handleChange}
                            ></textarea>
                        </div>

                        <div className="admin-input-area">
                            <div>Example: </div>
                            <textarea
                                type="text"
                                className="admin-input-text"
                                rows="5"
                                cols="50"
                                name={practice.example}
                                onChange={this.handleChange}
                            ></textarea>
                        </div>

                        <div className="admin-input-area">
                            <div>Link:</div>
                            <input
                                type="text"
                                className="admin-input-line"
                                name={practice.link}
                                onChange={this.handleChange}
                            ></input>
                        </div>

                        <div className="admin-input-area">
                            <div>Number of Subpractices:</div>
                            <div className='admin-counter'>
                                <div >{this.state.issue_area[practice.num_subpractices]}</div>
                                <button name={practice.num_subpractices} value = {this.state.issue_area[practice.num_subpractices]}
                                    onClick={this.increment}> + </button>
                                <button name={practice.num_subpractices} value = {this.state.issue_area[practice.num_subpractices]}
                                    onClick={this.decrement}> - </button>
                            </div>
                        </div>

                        {practice.subpractice_names.map(subpractice =>

                            <div className="admin-input-area">
                            <div>Subpractice Name:</div>
                            <input
                                type="text"
                                className="admin-input-line"
                                name={subpractice.id_pair}
                                onChange={this.updateSubpractice}
                            ></input>
                            </div>

                        )}

                    </div>
                )}

                <button
                    className="admin-submit-button"
                    onClick={() => this.submitNewPractice(this.state.issue_area)}>
                    Create New Issue Area!
                </button>

            </div>

        );
    }
}
export default AdminView