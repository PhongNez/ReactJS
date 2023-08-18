import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalPrice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            img: '',
            avatar: {
                selectedFile: null,
            },
            status: ''
        }
    }

    async componentDidMount() {
        console.log('Hello:');
        let { item_price } = this.props
        console.log(item_price);

    }
    handleOnChangeInput = (event) => {
        this.setState({
            status: event.target.value
        })
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
        // let check = this.checkValidateInput();
        // if (check) {
        console.log('Hello tào lao:', this.state.status);
        let response = await axios.put(`http://localhost:8081/api/v1/admin/update-price?id=${this.props.item_price.id_pricelist}`, { status: this.state.status })
        // this.setState({
        //     name: '',
        //     img: '',
        //     avatar: {
        //         selectedFile: null,
        //     }
        // })
        this.props.toggleCuaCha()
        alert(response.data.message)
        this.props.getAllPrice()
        console.log(response);
        // }
    }

    listStatus = [
        { id: 1, name: 'Hoạt động' },
        { id: 0, name: 'Ngừng hoạt động' }
    ]

    render() {
        console.log('Ten va anh:', this.state.name, this.state.img, this.state.avatar)
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggleCuaCha} className={this.props.className}
                    size={'lg'}
                >
                    <ModalHeader toggle={this.props.toggleCuaCha}>Sửa trạng thái giá </ModalHeader>
                    <ModalBody>
                        <div className='modal-category-body'>
                            <div className='input-container'>
                                <label>Giá:{this.props.item_price && this.props.item_price.price}</label>

                            </div>
                            <div className='input-container'>
                                <label>Chọn danh mục cần thêm:</label>
                                <select className='select-category' onChange={(event) => this.handleOnChangeInput(event)} value={this.state.status}>
                                    < option ></option>
                                    {

                                        this.listStatus && this.listStatus.map((item, index) => {
                                            return (<>

                                                < option key={item.id} value={item.id}>{item.name}</option>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ModalPrice));
