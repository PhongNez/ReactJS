import React from 'react';
import './ListTodo.scss'
import AddTodo from './AddTodo';
import ListTodoContent from './ListTodoContent'
import { toast } from 'react-toastify'

class ListToDo extends React.Component {

    state = {
        list: [{ id: 'todo1', title: 'Play video games' },
        { id: 'todo2', title: 'Study' },
        { id: 'todo3', title: 'Surf Facebook' }],
        edit: {}
    }


    addNewTodo = (todo) => {
        this.setState({
            list: [...this.state.list, todo]
        })
        toast.success("Successful!")
    }

    deleteTodo = (todo) => {
        let currentTodo = this.state.list;
        //Tạo ra 1 mảng mới
        currentTodo = currentTodo.filter(
            item => item.id !== todo.id
        )
        this.setState({
            list: currentTodo
        })
        toast.success('Successful delete!')
    }

    editTodo = (todo) => {
        this.setState({
            edit: todo
        })
    }

    listTodo = (listCopy) => {
        this.setState({
            list: listCopy,
            edit: {}
        })
    }

    editChange = (event) => {
        let editCopy = { ...this.state.edit }
        editCopy.title = event.target.value
        this.setState({
            edit: editCopy
        })
    }
    render() {
        let { list } = this.state;
        return (
            <div className="list-todo-container">
                <AddTodo
                    addNewTodo={this.addNewTodo}
                />
                <ListTodoContent list={this.state.list} deleteTodo={this.deleteTodo} editTodo={this.editTodo} edit={this.state.edit}
                    editChange={this.editChange} listTodo={this.listTodo}
                />
            </div>
        )
    }
}

export default ListToDo 