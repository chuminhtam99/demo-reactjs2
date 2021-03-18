import { Component } from 'react';
// import './App.css';

class TaskOrder extends Component{
  constructor(props){
    super(props);
    this.state = {
      dropDown: false,
      sortBy : '',
      sortFrom: '',
    }
  }

  toShowDropDown = () => {
    this.setState({
      dropDown : !this.state.dropDown
    })
  }

  toGetSortType = (a, b) => {
    this.setState({
      sortBy : a,
      sortFrom: b,
    })
    this.props.toGetSortType(a,b)
  }

  render(){
    var {sortBy, sortFrom} = this.state;
    return(
    <div className={this.state.dropDown ? "output__arrange output__arrange-has-dropdown" : "output__arrange"}>
      <button className="output__arrange--button"> 
        <span>Sắp Xếp</span>
        <i
          onClick={this.toShowDropDown} 
          className="output__arrange--button-icon fas fa-caret-square-down" />
      </button>
      <ul className="output__arrange-list">
        <li 
          className={sortBy==='byName'&&sortFrom==='1' ? "output__arrange-item checked" : "output__arrange-item"} 
          onClick={() => this.toGetSortType('byName', '1')}
          >Tên A đến Z <i className="fas fa-check" /></li>
        <li 
          className={sortBy==='byName'&&sortFrom==='-1' ? "output__arrange-item checked" : "output__arrange-item"} 
          onClick={() => this.toGetSortType('byName', '-1')}>Tên Z đến A <i className="fas fa-check" /></li>
        <hr />
        <li 
          className={sortBy==='byStatus'&&sortFrom==='1' ? "output__arrange-item checked" : "output__arrange-item"} 
          onClick={() => this.toGetSortType('byStatus', '1')}>Trạng thái kích hoạt <i className="fas fa-check" /></li>
        <li 
          className={sortBy==='byStatus'&&sortFrom==='-1' ? "output__arrange-item checked" : "output__arrange-item"} 
          onClick={() => this.toGetSortType('byStatus', '-1')}>Trạng thái ẩn <i className="fas fa-check" /></li>
      </ul>
    </div>
    )
  }
}


export default TaskOrder;
