import { Component } from 'react';
// import './App.css';

class AddButton extends Component{

  toggleForm = () => {
    this.props.toggleForm(true)
  }
  render(){
    return(
    <button
      onClick={this.toggleForm}
       className="output__add-task-button">
      <i className="fas fa-plus" />
      <span>Thêm công việc</span>
    </button>
    )
  }
}


export default AddButton;
