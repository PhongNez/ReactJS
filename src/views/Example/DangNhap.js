import React from "react";
import { Redirect, withRouter } from "react-router";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import './Login.scss'
import axios from "axios";
import { BsFacebook, ImFacebook, GrFacebookOption } from 'react-icons/gr'
import { TiSocialTwitter } from 'react-icons/ti'
import { AiOutlineGooglePlus } from 'react-icons/ai'

class DangNhap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
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

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
        console.log(event.target.value);
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleLogin = async () => {
        //ý tưởng:
        // Sau khi ấn đăng nhập 
        // Lư
        /*
        Sau khi ấn đăng nhập
        Gọi api lấy token 
        1. Lưu token vào local
        2. 

        */
        console.log(this.props.reduxState);
        const { email, password } = this.state;
        console.log(email, password);
        let response = await axios.post(`http://localhost:8081/api/v1/admin/login`, { email, password })
        alert(response.data.message)
        if (response.data.errCode === 0) {
            localStorage.setItem('user', response.data.userData)
            this.props.dangNhap()
            this.props.history.push('')

        }
        console.log(response);
        // this.setState({
        //     checkLogin: true
        // })
        // this.props.history.push('')
        // this.props.dangNhap()

    }
    render() {
        console.log('Test thu: ', this.props.reduxState);
        //    const mainJSX = checkLogin? 
        return (
            <div className='login-backgound'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>
                            Login
                        </div>
                        <div className='col-12 form-group input-login'>
                            <label>Username</label>
                            <input type='text' className='form-control'
                                value={this.state.email} onChange={(event) => this.handleOnChangeEmail(event)} placeholder='Enter your username'></input>
                        </div>
                        <div className='col-12 form-group input-login'>
                            <label>Password</label>
                            <div className='div-input-eye'>
                                <input type={this.state.isShowHidePassword ? 'password' : 'text'} className='form-control'
                                    value={this.state.password} onChange={(event) => this.handleOnChangePassword(event)} placeholder='Enter your password'></input>
                                <span onClick={() => this.handleShowHidePassword()}><i className={this.state.isShowHidePassword ? "fas fa-eye-slash eye" : "fas fa-eye eye"}></i></span>

                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12 login'>
                            <button className='btn-login' onClick={() => this.handleLogin()}>Log in</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 or-sign'>
                            <span >Or sign in with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <GrFacebookOption className="fab fa-facebook-f facebook" />
                            <TiSocialTwitter className="fab fa-twitter twitter" />
                            <AiOutlineGooglePlus className="fab fa-google-plus-g google" />

                        </div>
                    </div>
                </div>
            </div>




            // <div className='add-todo'>
            //     < div >
            //         <label>Email: </label>
            //         <input type='text' className='form-control'
            //             value={this.state.username} onChange={(event) => this.handleOnChangeUsername(event)} placeholder='Enter your username'></input>
            //     </div >
            //     <div>
            //         <label>Password: </label>
            //         <input type='password'
            //             value={this.state.password} onChange={(event) => this.handleOnChangePassword(event)} placeholder='Enter your password'></input>
            //     </div>
            //     <button onClick={() => this.handleLogin(history)}>Login</button>


            // </div>
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