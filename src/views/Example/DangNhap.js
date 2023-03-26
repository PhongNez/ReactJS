import React from "react";
import { Redirect, withRouter } from "react-router";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

class DangNhap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errMessage: '',
            checkLogin: false,
        }
    }
    componentDidMount() {
        // const dangnhap = localStorage.getItem('dangnhap')
        // this.setState({
        //     checkLogin: dangnhap
        // })
        if (!this.props.reduxState.isDangNhap) {

            console.log('ComponentDidmout DangNhap');
        }
        else {
            this.props.history.push('')
        }

    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
        console.log(event.target.value);
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = (history) => {
        console.log(this.props.reduxState);
        // this.hos
        this.setState({
            checkLogin: true
        })
        history.push('')
        this.props.dangNhap()

    }
    render() {
        console.log('Test thu: ', this.props.reduxState);
        console.log(this.props);
        const { history } = this.props
        console.log(history);
        //    const mainJSX = checkLogin? 
        return (
            <div className='add-todo'>
                < div >
                    <label>Email: </label>
                    <input type='text' className='form-control'
                        value={this.state.username} onChange={(event) => this.handleOnChangeUsername(event)} placeholder='Enter your username'></input>
                </div >
                <div>
                    <label>Password: </label>
                    <input type='password'
                        value={this.state.password} onChange={(event) => this.handleOnChangePassword(event)} placeholder='Enter your password'></input>
                </div>
                <button onClick={() => this.handleLogin(history)}>Login</button>


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reduxState: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dangNhap: () => dispatch({ type: 'daDangNhap', payload: true })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DangNhap))