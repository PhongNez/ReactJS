import React from "react";
import { withRouter } from "react-router";
import logo from '../../assets/images/dog.png'
import { connect } from 'react-redux'

class Home extends React.Component {
    // componentDidMount() {
    //     setTimeout(() => {
    //         this.props.history.push('/my-component')
    //     },
    //         3000)
    // }
    handleDelete = (user) => {
        console.log('>>> Check user: ', user);
        this.props.deleteRedux(user)
    }

    handleCreate = () => {
        this.props.createRedux()
    }

    render() {
        console.log('>>Check props: ', this.props);
        let listUser = this.props.phongTP
        return (
            <>
                <div>
                    <p>
                        Hello world (Phong Nè)
                    </p>
                    <img src={logo} style={{ width: '400px', height: '400px', marginTop: '10px' }}></img>
                </div>
                <div>
                    {
                        listUser && listUser.length > 0 && listUser.map((item, index) => {
                            return <div key={item.id}>
                                {index + 1} {item.name}
                                &nbsp; <span onClick={() => this.handleDelete(item)}> X </span>
                            </div>

                        })
                    }
                    <button onClick={() => this.handleCreate()}>Add user</button>
                </div>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteRedux: (userDelete) => dispatch({ type: 'DELETE_USER', payload: userDelete }),
        createRedux: () => dispatch({ type: 'ADD_USER' })
    }
}

const mapStateToProps = (state) => {
    return {
        phongTP: state.users
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))