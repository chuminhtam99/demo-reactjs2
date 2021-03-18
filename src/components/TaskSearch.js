import { Component } from 'react';
import React from 'react'
// import './App.css';

class TaskSearch extends Component{
  constructor(props){
    super(props);
    this.state = {
      txtSearch:'',
    };
    this.inputElement = React.createRef();
  }

  toGetTxtSearch = (e) => {
    var value = e.target.value;
    this.setState({
      txtSearch : value
    })
  }

  toSearch = () => {
    this.props.searchValue(this.state.txtSearch)
  }

  componentDidMount(){
    this.inputElement.current.focus()

  }

  render(){

    // setTimeout(() => {onFocus}, 1000)

    return(
    <div className="output__search">
      <input 
        ref={this.inputElement}
        onChange = {this.toGetTxtSearch}
        className="output__search-input" type="text" placeholder="Nhập từ khóa" />
      <button
        onClick={this.toSearch} 
        className="output__search-button">
        <i className="fas fa-search" />
        <span>Tìm</span>
      </button>
    </div>
    )
  }
}


export default TaskSearch;
