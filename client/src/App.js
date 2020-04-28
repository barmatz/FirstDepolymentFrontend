import React, { Component } from 'react';
import { get } from 'axios';
import './App.css';

let geography = {"6":"Sweden", "15":"Austria", "16":"Belgium", "18":"Netherlands", "19":"Finland", "20":"France", "21":"Germany", "22":"Ireland", "23":"Israel", "24":"Netherlands", "25":"Spain", "26":"Switzerland", "27":"United Kingdom", "28":"USA", "31":"Italy", "33":"Poland"};

let industry = {"8":"Cleantech", "9":"Communications", "10":"Consumer", "11":"Life Schiences", "12":"Other", "13":"Semiconductor/Hardware", "14":"Software", "56":"Fintech"};

function stripHTML(str){
  let el = document.createElement("div");
  el.innerHTML = str;
  return el.textContent;
};

class App extends Component {
  state = {}

  componentDidMount() {
    let INVESTMENTS;

    get("http://ec2-18-216-182-56.us-east-2.compute.amazonaws.com:3000/")
      .then(res => {
        console.log(res);

        this.setState({ INVESTMENTS: res });
      })
      .catch(err => console.log("Error: ", err));
  }

  render() {
    const {
            state: {
              INVESTMENTS
            }
          } = this;

    return (
      <div className="app">
        <div className="container-fluid">
          <div className="row">
            <div className="jumbotron">
              <h1>Kreos Portfolio Companies</h1>
            </div>
            <table className="table table-striped table-hover table-bordered" id="myTable">
              <thead> 
                <tr>
                  <th>Company</th>
                  <th className="col-6">Description</th>
                  <th>Country</th>
                  <th>Category</th>
                  <th>Exited</th>
                  <th>Website </th>
                </tr>
              </thead>
              <tbody id="tbody">
                {INVESTMENTS && INVESTMENTS.map(({ post_title, post_content, categories, exited, url }) => (
                  <tr>
                    <td>{post_title}</td>
                    <td>{stripHTML(post_content)}</td>
                    <td>{categories.map(country => geography[country] ? geography[country] + " " : null)}</td>
                    <td>{categories.map(category => industry[category] ? industry[category] : null)}</td>
                    <td>{exited}</td>
                    <td><a href={url}>{url}</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
