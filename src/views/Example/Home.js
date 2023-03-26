import React from "react";
import { Redirect, withRouter } from "react-router";
import logo from '../../assets/images/dog.png'
import { connect } from 'react-redux'
import global from '../../global/global'
import Login from "../Login/Login";
import { Link } from "react-router-dom";
// import DangNhap from "./DangNhap";
import './Home.scss'
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowHidePassword: false,
            errMessage: '',
            user: '',
            dangnhap: false

        }
        // global.isLoggedIn = (user) => this.onSignIn(user)
    }

    componentDidMount() {
        // let data = localStorage.getItem('dangnhap')
        // this.setState({
        //     dangnhap: data
        // })
        console.log('isDangNhap', this.props.reduxState.isDangNhap);
        if (this.props.reduxState.isDangNhap) {
            console.log('ComponentDidmout Home');
        }
        else {
            this.props.history.push('dangnhap')
            console.log('History:', this.props.history);
        }


    }

    onSignIn = (user) => {
        this.setState({
            user: user
        })
    }
    handleDelete = (user) => {
        console.log('>>> Check user: ', user);
        this.props.deleteRedux(user)
    }

    handleCreate = () => {
        this.props.createRedux()
    }
    logout = () => {
        // localStorage.removeItem('user')
        // this.setState({
        //     user: null
        // })

        this.setState({
            dangnhap: false
        })
        this.props.logoutRedux()
        this.props.history.push('dangnhap')
    }

    render() {
        const login = <Login />
        console.log('>>Check props: ', this.props);
        let listUser = this.props.phongTP
        console.log('List user: ', listUser);
        const { user } = this.state
        return (
            <>
                <div className="home-backgound">
                    <h1>Chào mừng Đã đăng nhập</h1>
                </div>


            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))