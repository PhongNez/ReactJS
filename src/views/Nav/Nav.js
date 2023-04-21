import React from 'react'
import './Nav.scss'
import {
    Link,
    NavLink,
    withRouter
} from "react-router-dom";
import { MdLogout } from 'react-icons/md'
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errMessage: '',
            checkLogin: false,
        }
    }
    logout = () => {
        // localStorage.removeItem('user')
        // this.setState({
        //     user: null
        // })
        this.props.logoutRedux()
        this.props.history.push('dangnhap')
    }

    render() {
        return (
            <div className="topnav">
                <NavLink to="/" exact>Home</NavLink>
                {/* <NavLink to="/list-todo">Danh sách công việc</NavLink>
                <NavLink to="/my-component">Component của Phong</NavLink> */}
                {/* <NavLink to="/user">Quản lí người dùng</NavLink> */}
                <NavLink to="/account">Quản lí tài khoản khách hàng</NavLink>
                <NavLink to="/category">Quản lí danh mục</NavLink>
                <NavLink to="/product">Quản lí sản phẩm</NavLink>
                <NavLink to="/orders">Quản lí đơn đặt hàng</NavLink>
                <NavLink to="/doanhso">Doanh Số</NavLink>
                {/* <NavLink to="/chiTiet">Chi tiết sản phẩm</NavLink> */}
                <div><button className='logout' onClick={() => this.logout()}><MdLogout /></button></div>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteRedux: (userDelete) => dispatch({ type: 'DELETE_USER', payload: userDelete }),
        // createRedux: () => dispatch({ type: 'ADD_USER' })
        logoutRedux: () => dispatch({ type: 'dangXuat' })
    }
}

const mapStateToProps = (state) => {
    return {
        reduxState: state
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav))