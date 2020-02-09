import React, { Component } from 'react';
import './App.css'
import Item from './components/Item/Item'
import Axios from 'axios';
import { FaArrowUp, FaSearch } from 'react-icons/fa'


class App extends Component{

  constructor(props){
    super(props)

    this.state = {
      editing: null,
      editingValue: '',
      list: [],
      description: '',
      search: ''
    }

    this.refresh = this.refresh.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handlePut = this.handlePut.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleChangeEdit = this.handleChangeEdit.bind(this)
    this.handleChangeSearch = this.handleChangeSearch.bind(this)

    this.refresh()
  }

  async refresh() {
    const { search } = this.state
    const list = await Axios.get(`${process.env.REACT_APP_BASEURL}/list?description=${search}`)

    this.setState({
      list: list.data
    })
  }

  handleChangeSearch(e) {
    this.setState({
      search: e.target.value
    })
  }

  handleDelete(id) {
    Axios.delete(`${process.env.REACT_APP_BASEURL}/list/${id}`)
      .then(resp => this.refresh())
  }

  handleChangeEdit(e) {
    this.setState({
      editingValue: e.target.value
    })
  }

  handleEdit(id, desc) {
    this.setState({
      editing: id,
      editingValue: desc
    })

  }

  handleCancel() {
    this.setState({
      editing: null
    })
  }

  async handlePut(id) {
    const { editingValue } = this.state

    if(this.state.editingValue === ''){
      this.handleDelete(id)
    } else {
      await Axios.put(`${process.env.REACT_APP_BASEURL}/list/${id}`, {
        description: editingValue
      })

      await this.setState({
        editing: null
      })

    this.refresh()
    }
  }

  handleAdd() {
    const { description } = this.state
    if(description !== '') {
      Axios.post(`${process.env.REACT_APP_BASEURL}/list`, { description })
        .then(resp => this.refresh())

      this.setState({
        description: ''
      })
    } else {
      return
    }
  }

  handleChange(e) {
    this.setState({
      description: e.target.value
    })
  }

  render() {
    return (
      <div className="container">
        <div className="title">
          <h3>To do list</h3>
        </div>
        <div className="description">
          <input value={this.state.description} onChange={this.handleChange} placeholder="Add a task" type="text" />
          <button onClick={this.handleAdd} className="send"><FaArrowUp /></button>
        </div>
        <div className="search">
          <input value={this.state.search} onChange={this.handleChangeSearch} placeholder="Search a task" type="text" />
          <button onClick={this.refresh} className="search"><FaSearch /></button>
        </div>
        <div className="items">
          <Item editing={this.state.editing}
           handleDelete={this.handleDelete}
          list={this.state.list}
          handleChangeEdit={this.handleChangeEdit}
          handleEdit={this.handleEdit}
          editingValue={this.state.editingValue}
          handleCancel={this.handleCancel}
          handlePut={this.handlePut}/>
        </div>
     </div>
    )
  }
}

export default App;
