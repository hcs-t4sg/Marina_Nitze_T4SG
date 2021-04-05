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
                practice_1_description: "",
                practice_1_link: "",
                practice_2: "",
                practice_2_description: "",
                practice_2_link: "",
                practice_3: "",
                practice_3_description: "",
                practice_3_link: "",
                practice_4: "",
                practice_4_description: "",
                practice_4_link: "",
                practice_5: "",
                practice_5_description: "",
                practice_5_link: "",
                practice_6: "",
                practice_6_description: "",
                practice_6_link: "",
                practice_7: "",
                practice_7_description: "",
                practice_7_link: "",
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

    getStatesData(data) {
        let tempData = [];
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            tempData.push(
                {
                    id: i,
                    abbreviation: item["abbreviation"],
                    county_administered: item["county_administered"],
                    electronic_request: item["electronic_request"],
                    name: item["name"],
                    no_contact: item["no_contact"],
                    no_fee: item["no_fee"],
                    no_notary_required: item["no_notary_required"],
                    no_witness_required: item["no_witness_required"],
                    population: item["population"],
                })
        }

        this.setState({ data: tempData });
    }

    componentDidMount() {
        axios
            .get("http://localhost:8000/api/states/")
            .then(res => this.getStatesData(res.data))
            .catch(err => console.log(err));
    }

    submitNewPractice = (item) => {
        axios
            .post('http://localhost:8000/api/states/',item)
                .then(function (response) {
                    console.log(response);
                  });
    }

    handleChange = e => {
        let { name, value } = e.target;
        const issue_area = { ...this.state.issue_area, [name]: value };
        this.setState({ issue_area });
      };

      increment = e => {
          if(this.state.issue_area.num_practices < 7){
            const issue_area = { ...this.state.issue_area, 
                                    num_practices: this.state.issue_area.num_practices+1 };
            this.setState({ issue_area });
          }
      }
      
      decrement = e =>{
        if(this.state.issue_area.num_practices > 0){
            const issue_area = { ...this.state.issue_area, 
                                    num_practices: this.state.issue_area.num_practices-1 };
            this.setState({ issue_area });
          }
      }

    render() {

        var practices = [];
        var title_str = "Practice #"
        var name_str = "practice_"
        var description_str = "_description"
        var link_str = "_link"
        for(var i=1;i<=this.state.issue_area.num_practices; i++){
            var str = String(i)
            practices.push({
                title: title_str.concat(str),
                name: name_str.concat(str),
                description: name_str.concat(str.concat(description_str)),
                link: name_str.concat(str.concat(link_str))
            })
        }


    return (
        <div className="admin-space">

            <h2>Create a New Issue Area</h2>

            <div  className="admin-input-area">
                <div>Issue Area:</div>
                <input 
                type="text" 
                className="admin-input-line"
                name="title"
                onChange={this.handleChange}
                ></input>
            </div>

            <div  className="admin-input-area">
                <div>Number of Practices:</div>
                <div className='admin-counter'>
                <div >{this.state.issue_area.num_practices}</div> 
                <button onClick = {this.increment}> + </button> 
                <button onClick = {this.decrement}> - </button> 
                </div>
            </div>

            <div  className="admin-input-area">
                <div>Intro Text: </div>
                <textarea 
                type="text" 
                className="admin-input-text"
                rows="5"
                cols="50"
                name="intro_text"
                onChange={this.handleChange}
                ></textarea>
            </div>

            <div  className="admin-input-area">
                <div>Conclusion Text: </div>
                <textarea 
                type="text" 
                className="admin-input-text"
                rows="5"
                cols="50"
                name="conclusion_text"
                onChange={this.handleChange}
                ></textarea>
            </div>

            {practices.map(practice =>
        
            <div className="admin-practice-area">
                <h4>{practice.title}</h4>
            <div  className="admin-input-area">
                <div>Name:</div>
                <input 
                type="text" 
                className="admin-input-line"
                name={practice.name}
                onChange={this.handleChange}
                ></input>
            </div>

            <div  className="admin-input-area">
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

            <div  className="admin-input-area">
                <div>Link:</div>
                <input 
                type="text" 
                className="admin-input-line"
                name={practice.link}
                onChange={this.handleChange}
                ></input>
            </div>
            </div>
            )}

        <button 
            className="admin-submit-button" 
            onClick={() => this.submitNewPractice(this.state.issue_area.title, this.state.issue_area)}>
            Create New Issue Area!
          </button>
            
        </div>

        );
    }
}
export default AdminView