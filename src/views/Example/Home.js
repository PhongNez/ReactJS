import React from "react";
import { Redirect, withRouter } from "react-router";
import logo from '../../assets/images/dog.png'
import { connect } from 'react-redux'
import global from '../../global/global'
import Login from "../Login/Login";
import { Link } from "react-router-dom";
import axios from "axios";
// import DangNhap from "./DangNhap";
import './Home.scss'
import { FaTrash, FaPencilAlt } from 'react-icons/fa'
import ModalPrice from "./ModalPrice/ModalPrice";
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowHidePassword: false,
            errMessage: '',
            user: '',
            dangnhap: false,
            listPrice: [],
            id_pricelist: '',
            isOpen: false,
            item_price: 0
        }
        // global.isLoggedIn = (user) => this.onSignIn(user)
    }

    async componentDidMount() {
        // let data = localStorage.getItem('dangnhap')
        // this.setState({
        //     dangnhap: data
        // })
        await this.getAllPrice()

        console.log('isDangNhap', this.props.reduxState.isDangNhap);
        if (this.props.reduxState.isDangNhap) {
            console.log('ComponentDidmout Home');
        }
        else {
            this.props.history.push('dangnhap')
            console.log('History:', this.props.history);
        }


    }

    getAllPrice = async () => {
        // let response = await axios.get('http://localhost:8081/api/v1/category?id=ALL')
        let response = await axios.get('http://localhost:8081/api/v1/price/get')
        this.setState({
            listPrice: response.data.listPrice,

        })
        console.log('heelo state: ', this.state.listPrice);
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

    handleEditPrice = (item) => {
        console.log(item);
        this.setState({
            item_price: item
        })
        this.toggle()
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        const login = <Login />
        console.log('>>Check props: ', this.props);
        let listUser = this.props.phongTP
        console.log('List user: ', listUser);
        const { user } = this.state
        let { listPrice, item_price } = this.state
        console.log('listPrice: ', listPrice);
        return (
            <div style={{
                height: 300
            }}>
                {/* <div className="home-backgound">
                    <h1>Chào mừng Đã đăng nhập</h1>
                </div> */}
                <ModalPrice
                    isOpen={this.state.isOpen}
                    toggleCuaCha={() => this.toggle()}
                    item_price={item_price}
                    getAllPrice={() => this.getAllPrice()}
                />
                <div>
                    {

                        <div className='table-user'>
                            <table id="customers">
                                <tbody>
                                    <tr>
                                        <th>STT</th>
                                        <th>Giá</th>
                                        <th>Ngày tạo</th>
                                        <th>Trạng thái</th>
                                        <th>Hành động</th>

                                    </tr>
                                    {

                                        listPrice && listPrice.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    {/* <td><img src={`http://localhost:8081/image/${item.logo}`} alt="" height={250} width={250} /></td> */}

                                                    <td>{item.price}</td>
                                                    <td>{item.apply_date}</td>
                                                    <td>{item.status && item.status == 1 ? 'Hoạt động' : 'Ngừng hoạt động'}</td>

                                                    <td>
                                                        <button className='btn-edit' onClick={() => this.handleEditPrice(item)}><FaPencilAlt /></button>
                                                        {/* <button className='btn-delete' onClick={() => this.handleDeleteCategory(item)}><FaTrash /></button> */}
                                                    </td>

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            {/* {
                        listCategory && listCategory.map((item, index) => {
                            return (
                                <div className='container' onClick={() => this.sanPhamDanhMuc(item.id_category)}>
                                    {item.name} + {item.logo}

                                </div>

                            )
                        })
                    } */}

                        </div>
                    }

                </div >

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))