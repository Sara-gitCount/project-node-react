
import './App.css';
 import ProductList from './Features/product/ProductList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Layout from './components/Layout';
import Login from './Features/auth/Login';
import Register from './Features/auth/Register';
import AddPrpduct from './Features/product/AddProduct';
import Logout from './Features/auth/Logout';
import UpdatePrpduct from './Features/product/UpdateProduct';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import MyBasket from './Features/basket/MyBaskrt';


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Layout></Layout>}>
          <Route path='/Mproducts' element={<ProductList></ProductList>}></Route>
          <Route index element={<Home></Home>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/register' element={<Register></Register>}></Route>
          <Route path='/addProduct' element={<AddPrpduct></AddPrpduct>}></Route>
          <Route path='/logout' element={<Logout></Logout>}></Route>
          <Route path='/update' element={<UpdatePrpduct></UpdatePrpduct>}></Route>
          <Route path='/basket' element={<MyBasket></MyBasket>}></Route>
          </Route>
        </Routes>
    </div>
  );
}

export default App;