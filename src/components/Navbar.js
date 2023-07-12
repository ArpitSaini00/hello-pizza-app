import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {

    const [cartView,setCartView] = useState(false)
    let data = useCart();
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem("authToken");
        navigate("/login")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/"><b>HelloPizza!</b></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            {/* {(localStorage.getItem("authToken")) ?
                                
                                : ""} */}
                        </ul>
                        {(!localStorage.getItem("authToken")) ?
                            <div className='d-flex'>
                                <Link className='btn bg-white text-success fs-5 mx-1 mt-1 justify-center' to="/login">Login/SignUp</Link>
                            </div>
                            : <div className='d-flex'>
                                <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                <Link className='btn bg-white text-success fs-5 mx-1 mt-1 justify-center' to="/myorders">MyOrders</Link>
                                </li>
                                <li className="nav-item">
                                    <div className='btn bg-white text-success fs-5 mx-1 mt-1 justify-center' onClick={()=>{setCartView(true)}}>
                                        Cart <Badge pill > {data.length} </Badge>
                                    </div>
                                    {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}
                                </li>
                                </ul>
                                <div className="btn bg-white text-danger fs-5 mx-1 mt-1 justify-center" onClick={handleLogout}>
                                    <b>Logout</b>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}
