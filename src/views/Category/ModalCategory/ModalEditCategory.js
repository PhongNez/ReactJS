import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ModalCategory.scss'

class ModalEditCategory extends Component {
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
        console.log('Hello');
        let { categoryEdit } = this.props
        console.log('Edit: ', categoryEdit, categoryEdit.name);
        if (categoryEdit) {
            this.setState({
                name: categoryEdit.name,
                // img: categoryEdit.logo
            })
        }
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
                img: file.preview
            })
        } else {
            this.setState({
                img: ''
            })
        }

    }

    handleUpdateCategory = async (id_category) => {
        const { name } = this.state
        const { selectedFile } = this.state.avatar

        const fd = new FormData()
        fd.append('name', name)
        if (selectedFile && selectedFile.name) {
            fd.append('logo', selectedFile, selectedFile.name)
            console.log(fd);
        }


        let token = localStorage.getItem('user')
        // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hY2NvdW50IjoxLCJlbWFpbCI6ImFkbWluLmZvb2RvcmRlckBnbWFpbC5jb20iLCJwaG9uZSI6IjAzMjEiLCJuYW1lIjoiS2ltIMSQ4bqhaSBQaG9uZyIsImNyZWF0ZWRfdGltZSI6IjIwMjItMDktMjFUMDU6MTI6MjYuMDAwWiIsImFkZHJlc3MiOiI1MiIsImF2YXRhciI6IicnIiwic3RhdHVzIjowLCJyb2xlIjoxLCJpYXQiOjE2NzkzMTk4NDl9.S86CSsJnpLrkfCJtmIZ87aYOjPVSVUfNwIUj5Di8YQ8'
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        let response = await axios.post(`http://localhost:8081/api/v1/admin/updateCategory?id=${id_category}`, fd)
        console.log(response);
        this.props.toggleEditCategory()
        alert(response.data.message)
        this.props.getAllCategoryFromReact()
    }

    render() {
        let cat = this.props.categoryEdit
        console.log('Edit: ', this.props.categoryEdit, cat.name);
        console.log('Ten va anh:', this.state.img)
        return (
            <div>
                <Modal isOpen={this.props.isOpenEdit} toggle={this.props.toggleEditCategory} className={this.props.className}
                    size={'lg'}
                >
                    <ModalHeader toggle={this.props.toggleEditCategory}>Chỉnh sửa danh mục</ModalHeader>
                    <ModalBody>
                        <div className='modal-category-body'>
                            <div className='input-container'>
                                <label>Nhập tên danh mục:</label>
                                <input type='text' onChange={(event) => this.handleOnChangeName(event)} value={this.state.name}></input>
                            </div>
                            <div className='input-container'>
                                <label>Chọn ảnh danh mục:</label>
                                <input type='file' onChange={(event) => this.fileSelectedHandle(event)}></input>
                                {this.state.img ? <img src={this.state.img} height={100} width={100}></img> :
                                    <img src={`http://localhost:8081/image/${cat.logo}`} height={100} width={100}></img>}
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleUpdateCategory(cat.id_category)}>Lưu</Button>{' '}
                        <Button color="secondary" onClick={this.props.toggleEditCategory}>Đóng lại</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ModalEditCategory));
