import React from "react";
import { Redirect, withRouter } from "react-router";
import logo from '../../assets/images/dog.png'
import { connect } from 'react-redux'
import global from '../../global/global'
import Login from "../Login/Login";
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowHidePassword: false,
            errMessage: '',
            user: ''

        }
        global.isLoggedIn = (user) => this.onSignIn(user)
    }

    componentDidMount() {
        let data = localStorage.getItem('user')
        this.setState({
            user: data
        })
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
        localStorage.removeItem('user')
        this.setState({
            user: null
        })
    }

    render() {
        const login = <Login />
        console.log('>>Check props: ', this.props);
        let listUser = this.props.phongTP
        const { user } = this.state
        return (
            <>
                {user ? <>
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
                        <button onClick={() => this.handleCreate()}>Add user</button>
                        <button onClick={() => this.logout()}>Đăng xuất</button>
                    </div></> : login}
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteRedux: (userDelete) => dispatch({ type: 'DELETE_USER', payload: userDelete }),
        createRedux: () => dispatch({ type: 'ADD_USER' })
    }
}

const mapStateToProps = (state) => {
    return {
        phongTP: state.users
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))