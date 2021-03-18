import { Component } from 'react';
// import './App.css';

class InputForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      txtName:'',
      txtStatus: '1',
      id: '',
    }
  }

  toGetData = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    this.setState({
      [name] : value
    })
    
  }
  
  toClearForm = () => {
      this.setState({
        txtName:'',
        txtStatus: '1',
        id:''
      })
      this.props.toClearForm(true)
  
    }

  onSave = (e) => {
    e.preventDefault();
    if (this.props.editingTask.id === ''){
      this.props.onSave(this.state.txtName , this.state.txtStatus);
    } 
    if(this.props.editingTask.id !== '') {
      this.props.getEditedTask({
        txtName: this.state.txtName,
        txtStatus: this.state.txtStatus,
        id: this.state.id,
      })
    }
    this.toCloseForm();
    
  }

  toCloseForm = () => {
    this.props.toCloseForm(true);
    this.toClearForm();
  }


  componentWillReceiveProps(nextProps){
    this.setState({
      txtName: nextProps.editingTask.txtName,
      txtStatus: nextProps.editingTask.txtStatus,
      id: nextProps.editingTask.id,
      
    })
  }



  render() {
    var {txtName, txtStatus} = this.state;

    

    return (
      <div className="container__input">
      <div className="container__input-block">
        <div className="container__input--header">
          <span className="input--header-text">Thêm công việc</span>
          <button 
            onClick = {this.toCloseForm}
            className="input--header-close"
            ><i className="fas fa-times-circle" /></button>
        </div>
        <div className="container__input--body">
          <form className="input--body__form" onSubmit={this.onSave}>
            <div className="input--body__element-form">
              <label htmlFor="name">Tên</label>
              <input 
                value={txtName}
                type="text" 
                name="txtName" 
                id="name" 
                onChange={this.toGetData} />
            </div>
            <div className="input--body__element-form">
              <label htmlFor="status">Trạng thái</label>
              <select 
                onChange={this.toGetData} 
                onBlur={this.toBlur}
                value={txtStatus} 
                name="txtStatus" 
                id="status"
              >
                <option value={0}>Ẩn</option>
                <option value={1}>Kích hoạt</option>
              </select>
            </div>
            <div className="input--body__buttons">
              <button className="input--body__button input--body__save-button" type="submit">
                <i className="fas fa-plus" />
                <span>Lưu lại</span>
              </button>
              <button 
                onClick={this.toClearForm}
                className="input--body__button input--body__cancel-button" 
                type="button">
                <i className="fas fa-times" />
                <span>Hủy bỏ</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    )
  }
}

export default InputForm;
