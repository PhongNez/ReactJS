import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import { withRouter } from 'react-router-dom';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            logo: '',
            isShowHidePassword: false,
            errMessage: '',
            listProduct: [],
            id_category: '',
            arrProduct: [],
        }
    }

    async componentDidMount() {
        let response = await axios.get(`http://localhost:8081/api/v1/detailProduct?id=${this.props.reduxState.id_category}`)
        console.log(response.data);
        console.log('hello chi tiet nè');
        this.setState({
            listProduct: response.data.listProduct
        })
    }

    sanPhamChiTiet = (id_product) => {
        console.log('San pham theo danh muc: ', id_product);
        this.props.product(id_product)
        console.log('Redux: ', this.props.reduxState);
        this.props.history.push('/chiTiet')
    }

    render() {
        let listProduct = this.state.listProduct
        console.log('redux id_category: ', this.props.reduxState);
        return (
            <div className='main-container'>
                {
                    listProduct && listProduct.map((item, index) => {
                        return (
                            <div className='container' onClick={() => this.sanPhamChiTiet(item.id_product)}>

                                <p>{item.name}</p>
                                <p>{item.price} </p>
                                <p> {item.detail}</p>

                            </div>
                        )
                    })
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Product));
