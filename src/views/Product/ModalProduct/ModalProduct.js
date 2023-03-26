import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ModalProduct.scss'

class ModalProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id_category: '',
            detail: '',
            price: '',
            images: '',
            avatar: {
                selectedFile: null,
            },
            listCategory: []
        }
    }

    async componentDidMount() {
        let response = await axios.get('http://localhost:8081/api/v1/category?id=ALL')
        this.setState({
            listCategory: response.data.listCategory
        })
        console.log('heelo state: ', this.state.listCategory);
    }

    handleOnChangeInput = (event, id) => {
        // this.setState({
        //     item: event.target.value
        // }, () => console.log(this.state.email))

        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        }, () => console.log('Check: ', this.state))
    }

    fileSelectedHandle = (event) => {
        if (event && event.target && event.target.files[0]) {
            this.setState({
                avatar: {
                    ...this.state.avatar.selectedFile,
                    selectedFile: event.target.files[0]
                }
            })

            const file = event.target.files[0]
            file.preview = URL.createObjectURL(file)
            this.setState({
                images: file.preview
            })
        } else {
            this.setState({
                images: ''
            })
        }
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['name', 'images', 'id_category', 'detail', 'price'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Vui lòng nhập: ' + arrInput[i])
                break;
            }
        }
        return isValid;
    }

    handleAddNewCategory = async () => {
        let check = this.checkValidateInput();
        if (check) {
            const { name, detail, price, id_category } = this.state
            const { selectedFile } = this.state.avatar

            const fd = new FormData()
            fd.append('name', name)//Tên sản phẩm
            fd.append('detail', detail)//Chi tiết
            fd.append('price', price)//Giá
            fd.append('id_category', id_category)//Id danh mục
            fd.append('images', selectedFile)//ảnh
            console.log('selectedFile.name: ', selectedFile.name);
            // console.log(fd.get('logo'));
            // console.log(fd);


            let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hY2NvdW50IjoxLCJlbWFpbCI6ImFkbWluLmZvb2RvcmRlckBnbWFpbC5jb20iLCJwaG9uZSI6IjAzMjEiLCJuYW1lIjoiS2ltIMSQ4bqhaSBQaG9uZyIsImNyZWF0ZWRfdGltZSI6IjIwMjItMDktMjFUMDU6MTI6MjYuMDAwWiIsImFkZHJlc3MiOiI1MiIsImF2YXRhciI6IicnIiwic3RhdHVzIjowLCJyb2xlIjoxLCJpYXQiOjE2NzkzMTk4NDl9.S86CSsJnpLrkfCJtmIZ87aYOjPVSVUfNwIUj5Di8YQ8'
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            let response = await axios.post('http://localhost:8081/api/v1/admin/createNewProduct', fd)
            this.setState({
                name: '',
                id_category: '',
                detail: '',
                price: '',
                images: '',
                avatar: {
                    selectedFile: null,
                },
            })
            this.props.toggleCuaCha()
            alert(response.data.message)
            this.props.getAllProductFromReact()
            console.log(response);
        }
    }

    render() {
        let { listCategory } = this.state
        console.log('Ten va anh:', this.state.name, this.state.img, this.state.avatar)
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggleCuaCha} className={this.props.className}
                    size={'lg'}
                >
                    <ModalHeader toggle={this.props.toggleCuaCha}>Tạo mới danh mục</ModalHeader>
                    <ModalBody>
                        <div className='modal-product-body'>
                            <div className='input-container'>
                                <label>Nhập tên sản phẩm:</label>
                                <input type='text' onChange={(event) => this.handleOnChangeInput(event, 'name')} value={this.state.name}></input>
                            </div>
                            <div className='input-container'>
                                <label>Chọn ảnh sản phẩm:</label>
                                <input type='file' onChange={(event) => this.fileSelectedHandle(event)} ></input>
                                {this.state.images && <img src={this.state.images} height={100} width={100}></img>}
                            </div>
                            <div className='input-container'>
                                <label>Nhập chi tiết sản phẩm:</label>
                                <input type='text' onChange={(event) => this.handleOnChangeInput(event, 'detail')} value={this.state.detail}></input>
                            </div>
                            <div className='input-container'>
                                <label>Nhập giá của sản phẩm:</label>
                                <input type='text' onChange={(event) => this.handleOnChangeInput(event, 'price')} value={this.state.price}></input>
                            </div>
                            {/* <div className='input-container'>
                                <label>Chọn danh mục cần thêm:</label>
                                <input type='' onChange={(event) => this.handleOnChangeInput(event, 'price')}></input>
                            </div> */}
                            <div className='input-container'>
                                <label>Chọn danh mục cần thêm:</label>
                                <select className='select-category' onChange={(event) => this.handleOnChangeInput(event, 'id_category')} value={this.state.id_category}>
                                    < option ></option>
                                    {

                                        listCategory && listCategory.map((item, index) => {
                                            return (<>

                                                < option key={item.id} value={item.id_category}>{item.name}</option>
                                            </>
                                            )
                                        })
                                    }
                                    {/* <input onChange={(event) => this.handleOnChangeInput(event, 'id_category')} value={item.id_category} hidden></input> */}
                                </select>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleAddNewCategory()}>Lưu</Button>{' '}
                        <Button color="secondary" onClick={this.props.toggleCuaCha}>Đóng lại</Button>
                    </ModalFooter>
                </Modal>
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
        product: (id_product) => dispatch({ type: 'id_product', payload: id_product })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ModalProduct));
