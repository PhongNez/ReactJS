import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './ModalCategory.scss'

class ModalDeleteCategory extends Component {
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
        console.log(this.props.categoryDelete);
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


    handleDeleteCategory = async (id_category) => {
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hY2NvdW50IjoxLCJlbWFpbCI6ImFkbWluLmZvb2RvcmRlckBnbWFpbC5jb20iLCJwaG9uZSI6IjAzMjEiLCJuYW1lIjoiS2ltIMSQ4bqhaSBQaG9uZyIsImNyZWF0ZWRfdGltZSI6IjIwMjItMDktMjFUMDU6MTI6MjYuMDAwWiIsImFkZHJlc3MiOiI1MiIsImF2YXRhciI6IicnIiwic3RhdHVzIjowLCJyb2xlIjoxLCJpYXQiOjE2NzkzMTk4NDl9.S86CSsJnpLrkfCJtmIZ87aYOjPVSVUfNwIUj5Di8YQ8'
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        let response = await axios.delete(`http://localhost:8081/api/v1/admin/deletecategory?id_category=${id_category}`)
        // localhost:8081/api/v1/admin/deletecategory?id_category=53
        console.log(response);
        alert(response.data.message)
        this.props.toggleDeleteCategory()
        this.props.getAllCategoryFromReact()
        console.log(response);
    }


    render() {
        console.log('Ten va anh 1:', this.props.categoryDelete)
        let categoryDelete = this.props.categoryDelete
        return (
            <div>
                <Modal isOpen={this.props.isOpenDelete} toggle={this.props.toggleDeleteCategory} className={this.props.className}
                    size={'lg'}
                >
                    <ModalHeader toggle={this.props.toggleDeleteCategory}>Xóa danh mục</ModalHeader>
                    <ModalBody>
                        <div className='modal-category-body text-center'>

                            {/* <div className='input-container'>
                                <label>Tên danh mục:</label>
                                <label>{categoryDelete.name}</label> */}
                            {/* <input type='text' onChange={(event) => this.handleOnChangeName(event)}></input> */}
                            {/* </div> */}

                            <div className='delete-container'>
                                <label className='ban-co-muon-xoa'>Bạn có chắc chắn muốn xóa danh mục: {categoryDelete.name} </label>
                                <img src={`http://localhost:8081/image/${categoryDelete.logo}`} height={150} width={150} className='d-block' />
                                {/* <input type='file' onChange={(event) => this.fileSelectedHandle(event)}></input> */}
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleDeleteCategory(categoryDelete.id_category)}>Dồng ý</Button>{' '}
                        <Button color="secondary" onClick={this.props.toggleDeleteCategory}>Không</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ModalDeleteCategory));
