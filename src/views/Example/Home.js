import React from "react";
import { Redirect, withRouter } from "react-router";
import logo from '../../assets/images/dog.png'
import { connect } from 'react-redux'
import global from '../../global/global'
import Login from "../Login/Login";
import { Link } from "react-router-dom";
// import DangNhap from "./DangNhap";

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
                {/* {this.state.dangnhap ? */}
                <div style={{ textAlign: "center" }}>
                    <div>
                        <p>
                            Hello world (Phong Nè)
                        </p>
                        <img src={logo} style={{ width: '400px', height: '400px', marginTop: '10px' }}></img>
                    </div>
                    <div>
                        {
                            listUser && listUser.length > 0 && listUser.map((item, index) => {
                                return <div key={item.id}>
                                    {index + 1} {item.name}
                                    &nbsp; <span onClick={() => this.handleDelete(item)}> X </span>
                                </div>

                            })
                        }
                        <button style={{ marginRight: 10 }} onClick={() => this.handleCreate()}>Add user</button>
                        <button onClick={() => this.logout()}>Đăng xuất</button></div>
                </div>
                {/* : <Redirect to='dangnhap1' /> } */}


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