import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ModalCategory.scss'

class ModalCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            img: '',
            avatar: {
                selectedFile: null,
            }
        }
    }

    async componentDidMount() {
    }

    handleOnChangeName = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handleOnChangeImg = (event) => {
        this.setState({
            img: event.target.value
        })
    }

    fileSelectedHandle = (event) => {
        this.setState({
            avatar: {
                ...this.state.avatar.selectedFile,
                selectedFile: event.target.files[0]
            }
        })

        const file = event.target.files[0]
        file.preview = URL.createObjectURL(file)
        this.setState({
            img: file.preview
        })
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['name', 'img'];
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
            const { name } = this.state
            const { selectedFile } = this.state.avatar

            const fd = new FormData()
            fd.append('name', name)
            fd.append('logo', selectedFile)
            console.log('selectedFile.name: ', selectedFile.name);
            console.log(fd.get('logo'));
            // console.log(fd);


            let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hY2NvdW50IjoxLCJlbWFpbCI6ImFkbWluLmZvb2RvcmRlckBnbWFpbC5jb20iLCJwaG9uZSI6IjAzMjEiLCJuYW1lIjoiS2ltIMSQ4bqhaSBQaG9uZyIsImNyZWF0ZWRfdGltZSI6IjIwMjItMDktMjFUMDU6MTI6MjYuMDAwWiIsImFkZHJlc3MiOiI1MiIsImF2YXRhciI6IicnIiwic3RhdHVzIjowLCJyb2xlIjoxLCJpYXQiOjE2NzkzMTk4NDl9.S86CSsJnpLrkfCJtmIZ87aYOjPVSVUfNwIUj5Di8YQ8'
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            let response = await axios.post('http://localhost:8081/api/v1/admin/createcategory', fd)
            this.setState({
                name: '',
                img: '',
                avatar: {
                    selectedFile: null,
                }
            })
            this.props.toggleCuaCha()
            alert(response.data.message)
            this.props.getAllCategoryFromReact()
            console.log(response);
        }
    }

    render() {
        console.log('Ten va anh:', this.state.name, this.state.img, this.state.avatar)
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggleCuaCha} className={this.props.className}
                    size={'lg'}
                >
                    <ModalHeader toggle={this.props.toggleCuaCha}>Tạo mới danh mục</ModalHeader>
                    <ModalBody>
                        <div className='modal-category-body'>
                            <div className='input-container'>
                                <label>Nhập tên danh mục:</label>
                                <input type='text' onChange={(event) => this.handleOnChangeName(event)}></input>
                            </div>
                            <div className='input-container'>
                                <label>Chọn ảnh danh mục:</label>
                                <input type='file' onChange={(event) => this.fileSelectedHandle(event)}></input>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ModalCategory));
