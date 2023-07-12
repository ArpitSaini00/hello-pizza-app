import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

export default function Signup() {
    const [credentials, setcredentials] = useState({
        name: "",
        email: "",
        password: "",
        location: ""
    })
    let [address, setAddress] = useState("");
    let navigate = useNavigate()

    const handleSubmit = async (e) => {

        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                location: credentials.location,
                password: credentials.password
            })
        });

        const json = await response.json()
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.authToken)
            navigate("/login")

        }
        else {
            alert("Enter Valid Credentials")
        }
    }

    const onChange = (event) => {
        setcredentials({
            ...credentials, [event.target.name]: event.target.value
        })
    }

    return (
        <div style={{height: '100vh', backgroundSize: 'cover' }}>
            <div><Navbar/></div>
        <div className='container'>
            <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
                <div className="m-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} />
                </div>
                <div className="m-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="m-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} />
                    <div id="emailHelp" className="form-text">Min Length: 5</div>
                </div>
                <div className="m-3">
                    <label htmlFor="location" className="form-label">Address</label>
                    <input type="text" className="form-control" name="location" value={credentials.location} onChange={onChange} />
                </div>
                <button to='/login' type="submit" className="m-3 btn btn-success">Submit</button>
                <Link to='/login' className='m-3 btn btn-danger'>Already a User</Link>
            </form>
        </div>
        </div>
    )
}