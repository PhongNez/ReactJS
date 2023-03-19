import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import './Category.scss'
import { withRouter } from 'react-router-dom';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            logo: '',
            isShowHidePassword: false,
            errMessage: '',
            listCategory: [],
            id_category: '',
            arrProduct: [],
        }
    }

    async componentDidMount() {
        let response = await axios.get('http://localhost:8081/api/v1/category?id=ALL')
        this.setState({
            listCategory: response.data.listCategory
        })
        console.log(response.data.listCategory);
    }

    sanPhamDanhMuc = (id_category) => {
        console.log('San pham theo danh muc: ', id_category);
        this.props.category(id_category)
        console.log('This props: ', this.props);
        this.props.history.push('detailProduct')
    }

    render() {
        let listCategory = this.state.listCategory
        return (
            <div className='main-container'>
                {
                    listCategory && listCategory.map((item, index) => {
                        return (
                            <div className='container' onClick={() => this.sanPhamDanhMuc(item.id_category)}>
                                {item.name} + {item.logo}

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
        category: (id_category) => dispatch({ type: 'id_category', payload: id_category })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Category));
