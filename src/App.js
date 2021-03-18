import React, { Component } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import AddButton from './components/AddButton';
import TaskSearch from './components/TaskSearch';
import TaskOrder from './components/TaskOrder';
import TaskTable from './components/TaskTable';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tasks : [],
      formStatus: false,
      editingTask : {
        id : '',
        txtName: '',
        txtStatus: '1',
      },
      txtSearch:'',
      sortBy : '',
      sortFrom: '',
      searchValue:'',
      selectData: '',
    }
  }
  
  createRandomId() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  onSaveData = (name, status) => {
    var task = {
      txtName: name,
      txtStatus: status,
      id: this.createRandomId(),
    }
    var tasks = this.state.tasks;
    tasks.push(task);
    this.setState({
      tasks : tasks
    })
    window.localStorage.setItem('tasks', JSON.stringify(tasks));

  }

  componentDidMount(){
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    if(tasks) {
      this.setState({
        tasks: tasks
      })
    }
  }

  toggleClass = (param) => {
    var {tasks} = this.state;
    tasks.forEach((task, index) => {
      
      if (param.id === task.id) {
        if ( task.txtStatus === '0'){
          task.txtStatus = '1'
        } else {
          task.txtStatus = '0'

        }
      }
    })
    this.setState({
      tasks : tasks
    })
    window.localStorage.setItem('tasks', JSON.stringify(tasks));

  }

  toggleForm = (param) => {
    if (param) {
      this.setState({
        formStatus: !this.state.formStatus,
        editingTask: {
          id : '',
          txtName: '',
          txtStatus: '1',
        }

      })
    }
  }

  toCloseForm = (param) => {
    if (param){
      this.setState({
        formStatus : false,
        editingTask: {
          id : '',
          txtName: '',
          txtStatus: '',
        }
      })
    }
  }

  toEditTask = (param) => {
    this.setState({
      formStatus:true,
    })
    var {tasks} = this.state;
    tasks.forEach((task, index) => {
      if (task.id === param.id){
        this.setState({
          editingTask : task
        })
      }
    })

  }

  getEditedTask = (param) => {
    var tasks = this.state.tasks;
    tasks.forEach((task, index) => {
      if ( param.id === task.id){
        task.txtName = param.txtName;
        task.txtStatus = param.txtStatus;
      }
    })
    this.setState({
      tasks: tasks
    })
    window.localStorage.setItem('tasks', JSON.stringify(this.state.tasks));

  }

  toDeleteTask = (param) => {
    var tasks = this.state.tasks;
    for ( var i = 0 ; i < tasks.length ; i++){
      if ( param === tasks[i]){
        tasks.splice(i, 1)
      }
    }
    this.setState({
      tasks: tasks
    })
    window.localStorage.setItem('tasks', JSON.stringify(this.state.tasks));

  }

  toClearForm = (param) => {
    if (param){
      this.setState({
        editingTask : {
          id : '',
          txtName: '',
          txtStatus: '1',
        },
      })
    }
  }

  searchValue = (param) => {
    this.setState({
      txtSearch : param
    })
  }

  toGetSortType = (a, b) => {
    this.setState({
      sortBy : a,
      sortFrom: b,
    })
  }

  getSearchValue = (value) => {
    this.setState({
      searchValue : value
    })
  }

  getSelectData = (value) => {
    this.setState({
      selectData : value
    })
  }


  render() {
    var {tasks,txtName, txtStatus, formStatus, editingTask, sortBy, sortFrom, selectData} = this.state;
    
    if(this.state.txtSearch) {
      var searchedTasks = tasks.filter((task, index) => {
        return task.txtName.toLowerCase().indexOf(this.state.txtSearch.toLowerCase()) !== -1
      });
      tasks = searchedTasks;
    }

    if(this.state.searchValue){
      var searchedTasks = tasks.filter((task, index) => {
        return task.txtName.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1
      });
      tasks = searchedTasks;
    }
    

    if ( sortBy === 'byName' && sortFrom === '1'){
      var sortedTasks = tasks.sort(function(a, b){
        if(a.txtName < b.txtName) { return -sortFrom; }
        if(a.txtName > b.txtName) { return sortFrom; }
        return 0;
      })
      tasks = sortedTasks;
    }
    if ( sortBy === 'byName' && sortFrom === '-1'){
      var sortedTasks = tasks.sort(function(a, b){
        if(a.txtName < b.txtName) { return sortFrom; }
        if(a.txtName > b.txtName) { return -sortFrom; }
        return 0;
      })
      tasks = sortedTasks;
    }
    if ( sortBy === 'byStatus' && sortFrom === '1'){
      var sortedTasks = tasks.sort(function(a, b){
        if(parseInt(a.txtStatus) < parseInt(b.txtStatus)) { return sortFrom; }
        if(parseInt(a.txtStatus) > parseInt(b.txtStatus)) { return -sortFrom; }
        return 0;
      })
      tasks = sortedTasks;
    }
    if ( sortBy === 'byStatus' && sortFrom === '-1'){
      var sortedTasks = tasks.sort(function(a, b){
        if(parseInt(a.txtStatus) < parseInt(b.txtStatus)) { return sortFrom; }
        if(parseInt(a.txtStatus) > parseInt(b.txtStatus)) { return -sortFrom; }
        return 0;
      })
      tasks = sortedTasks;
    }

    if(selectData === '1'){
      var filter = tasks.filter((task, index) => {
        return task.txtStatus === '1'
      })
      tasks = filter;
    }
    if(selectData === '-1'){
      var filter = tasks.filter((task, index) => {
        return task.txtStatus === '0'
      })
      tasks = filter;
    }

    return (
      <div>
        <header className="header" style={{marginBottom: '40px'}}>
          <div className="grid">
            <div className="header-text">Task Management</div>
            <hr />
          </div>
        </header>
        <div className="container" style={{marginBottom: '40px'}}>
          <div className={formStatus ? "grid contain-block" : "grid contain-block full-output"}>
            <InputForm
              onSave = {this.onSaveData}
              toCloseForm = {this.toCloseForm}
              editingTask = {editingTask}
              getEditedTask = {this.getEditedTask}
              toClearForm = {this.toClearForm}
            ></InputForm>
            <div className="container__output">
              <AddButton
                toggleForm = {this.toggleForm}
              ></AddButton>
              <div className="output__search-and-arrange">
                <TaskSearch
                  searchValue = {this.searchValue}
                ></TaskSearch>
                <TaskOrder
                  toGetSortType = {this.toGetSortType}
                ></TaskOrder>
              </div>
              <div className="output__task-table">
                <TaskTable
                  tasks={tasks}
                  toggleClass = {this.toggleClass}
                  toEditTask = {this.toEditTask}
                  toDeleteTask = {this.toDeleteTask}
                  getSearchValue = {this.getSearchValue}
                  getSelectData = {this.getSelectData}
                ></TaskTable>
              </div>
            </div>
          </div>
        </div>
      </div>


    );
  }
}

export default App;


