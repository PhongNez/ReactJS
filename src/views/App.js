import logo from './logo.svg';
import './App.scss';
import MyComponent from './Example/MyComponent'
import ListToDo from './Todos/ListToDo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Nav from './Nav/Nav'
import Home from './Example/Home'
import DetailUser from './Users/DetailUser'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ListUser from './Users/ListUser';
import TestApi from './Users/TestApi';
import Login from './Login/Login';
import DangNhap from './Example/DangNhap';
import Category from './Category/Category';
import Product from './Product/Product';
import DetailProduct from './DetailProduct/DetailProduct';

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <header className="App-header">
          <Nav />
          <img src={logo} className="App-logo" alt="logo" />
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/list-todo">
              <ListToDo />
            </Route>
            <Route path="/my-component">
              <MyComponent />
            </Route>
            <Route path="/user" exact>
              <ListUser />
            </Route>
            <Route path="/user/:id">
              <DetailUser />
            </Route>
            <Route path="/test">
              <TestApi />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/dangnhap">
              <DangNhap />
            </Route>
            <Route path="/category">
              <Category />
            </Route>
            <Route path="/detailProduct">
              <Product />
            </Route>
            <Route path="/chiTiet">
              <DetailProduct />
            </Route>
          </Switch>
        </header >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
      </div >
    </BrowserRouter >
  );
}

export default App;
