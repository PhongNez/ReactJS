import React from 'react';

class MyComponent extends React.Component {

    state = {
        name: '',
        age: 21
    }

    handleOnChangeName = (event) => {
        console.log(event.target, 'event target value', event.target.value);
        this.setState({
            name: event.target.value
        })
    }
    handleClickButton = () => {
        alert('Chúc may mắn');
    }

    render() {
        let name = 'Hùynh Thanh Phong';
        console.log(this.state);
        return (
            //fragment vì nó chỉ trả ra 1 khối nên phải bọc lại
            <>
                <div>
                    <input value={this.state.name} type="text" onChange={(event) => this.handleOnChangeName(event)}></input>
                </div>
                <div>Tôi là {name} </div>
                <div >Biệt danh: {this.state.name}</div>
                <div>Tuổi: {this.state.age}</div>
                <div>
                    <button onClick={() => this.handleClickButton()}> {/* Gọi hàm  */}
                        Click me
                    </button>
                </div>
            </>
        )
    }
}

export default MyComponent; 