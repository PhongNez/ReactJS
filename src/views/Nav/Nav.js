import React from 'react'
import './Nav.scss'
import {
    Link,
    NavLink
} from "react-router-dom";

class Nav extends React.Component {
    state = {
        list: 'Thanh Phong'

    }

    handleChange = (event) => {
        this.setState({
            list: event.target.value
        })
    }

    render() {
        return (
            <div className="topnav">
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/list-todo">Danh sách công việc</NavLink>
                <NavLink to="/my-component">Component của Phong</NavLink>
                <NavLink to="/user">Quản lí người dùng</NavLink>
                <input value={this.state.list} onChange={(event) => this.handleChange(event)}></input>
            </div>
        )
    }
}

export default Nav