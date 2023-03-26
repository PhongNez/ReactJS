import React from 'react'
import './Nav.scss'
import {
    Link,
    NavLink
} from "react-router-dom";

class Nav extends React.Component {


    render() {
        return (
            <div className="topnav">
                <NavLink to="/" exact>Home</NavLink>
                <NavLink to="/list-todo">Danh sách công việc</NavLink>
                <NavLink to="/my-component">Component của Phong</NavLink>
                {/* <NavLink to="/user">Quản lí người dùng</NavLink> */}
                <NavLink to="/account">Quản lí tài khoản khách hàng</NavLink>
                <NavLink to="/category">Quản lí danh mục</NavLink>
                <NavLink to="/product">Quản lí sản phẩm</NavLink>
                <NavLink to="/orders">Quản lí đơn đặt hàng</NavLink>
                <NavLink to="/chiTiet">Chi tiết sản phẩm</NavLink>

            </div>
        )
    }
}

export default Nav