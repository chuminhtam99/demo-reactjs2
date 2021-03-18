import { Component } from 'react';
// import './App.css';

class TaskTable extends Component{

  constructor(props){
    super(props);
    this.state = {
      searchValue: '',
      selectData: '0',
    }
  }

  toggleClass = (param) => {
    this.props.toggleClass(param)
  }

  toEditTask = (task) => {
    this.props.toEditTask(task)
  }

  toDeleteTask = (task) => {
    this.props.toDeleteTask(task)
  }

  onChange = (e) => {
    var value = e.target.value;
    var name = e.target.name;
    this.setState({
      [name] : value
    })
    if ( name === 'searchValue'){
      this.props.getSearchValue(value);
    }
    if ( name === 'selectData'){
      this.props.getSelectData(value);
    }
  }

  render(){
    var tasks = this.props.tasks;
    var element = tasks.map((task, index) => {
      return  <tr>
                <td>{index + 1}</td>
                <td>{task.txtName}</td>
                <td onClick={() =>this.toggleClass(task)} class={task.txtStatus === '1' ? 'table-item-active' : 'table-item-inactive'}>
                  <button className="output__task-table--inactive"> Ẩn</button>
                  <button className="output__task-table--active"> Kích hoạt</button>
                </td>
                <td>
                  <button 
                    onClick= {() => this.toEditTask(task)}
                    className="output__task-table--edit-btn"
                    > <i className="fas fa-pen" /> Sửa</button>
                  <button 
                    onClick = {() => this.toDeleteTask(task)}
                    className="output__task-table--delete-btn"
                    ><i className="fas fa-trash-alt" /> Xóa</button>
                </td>
              </tr>
    })
    return(
    <table style={{width:"100%"}}>
      <tbody><tr className="output__task-table-head">
          <th className="output__table-index">STT</th>
          <th className="output__table-name">Tên</th>
          <th className="output__table-status" style={{width: '25%'}}>Trạng Thái</th>
          <th className="output__table-action" style={{width: '30%'}}>Hành Động</th>
        </tr>
        <tr>
          <td />
          <td><input
          onChange={this.onChange}
          name ="searchValue"
          style={{width: '100%'}} /></td>
          <td>
            <select onChange={this.onChange} name="selectData" value={this.state.selectData} style={{width: '100%', outline: 'none'}}>
              <option value={0}>Tất cả</option>
              <option value={-1}>Ẩn</option>
              <option value={1}>Kích hoạt</option>
            </select>
          </td>
          <td />
        </tr>
          {element}
      </tbody>
    </table>
    )
  }
}


export default TaskTable;
