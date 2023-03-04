const initState = {
    users: [
        { id: 1, name: 'Phong' },
        { id: 2, name: 'Thanh' },
        { id: 3, name: 'HTP' }
    ]
}

const rootReducer = (state = initState, action) => {
    console.log('Tét thu action: ', action);
    switch (action.type) {
        case 'DELETE_USER':
            let users = state.users;
            users = users.filter(item => item.id != action.payload.id)
            console.log('>>>Check state: ', { ...state });
            return { ...state, users };
            break;
        case 'ADD_USER':
            let id = Math.floor(Math.random() * 1001)
            let user = { id: id, name: `random - ${id} ` }
            return { ...state, users: [...state.users, user] }
            break;
        default:
            return state;
    }

}

export default rootReducer