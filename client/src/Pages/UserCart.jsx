import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Navbar, Container, Nav, Button, Card, Col } from 'react-bootstrap';
import Layout from '../Components/layout/Layout';

function UserCart() {
    const { userId, token } = useParams()
    const [userCart, setCart] = useState([])
    useEffect(() => {
        axios.get(`https://foot-trucks-react-js.onrender.com/usercartdisplay/${userId}/${token}`).then(product => {
            setCart(product.data.userCart)

        }).catch(err => {
            console.log(err)
        })
    }, [])
    const handleDelete = (id, vendorId) => {
        axios.delete(`https://foot-trucks-react-js.onrender.com/usercartdelete/${id}/${vendorId}`).then((user) => {
            window.location.reload()
        }).catch(err => { console.log(err) })
    }
    return (
        <Layout title={'Cart'}>
        <div className='cart-header'>
            {/* User Cart Start */}
            {/* <section id='card'>
                {
                    userCart.map((vendor) => (
                        <Col className='' key={vendor._id}>
                            <Card style={{ width: '15rem', }} className='col-sm-12' >
                                <Card.Img variant="top" src={`https://foot-trucks-react-js.onrender.com/images/${vendor.image}`} />
                                <Card.Body>
                                    <Card.Title>{vendor.shopname}</Card.Title>
                                    <Card.Text>{vendor.shopaddress}</Card.Text>
                                    <Card.Text>{vendor.shopmobilenumber}</Card.Text>
                                    <Button variant="success" onClick={e => handleDelete(userId, vendor.ProductId)}>Cancel</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                }

            </section> */}
            <section id='card'>
                {userCart.map(vendor => (
                    <Col className='' key={vendor._id}>
                        <Card style={{ width: '20rem', height: '35rem', overflowY: 'scroll' }} className=''>
                            <div className="card-img">
                                <Card.Img
                                    variant='top'
                                    src={`https://foot-trucks-react-js.onrender.com/images/${vendor.menuImage}`}
                                    style={{ width: '300px', height: '300px' }}
                                />
                            </div>
                            <Card.Body>
                                <div className="user-card">
                                    <div className="user-card-details">
                                        <Card.Title className='card-title'>{vendor.shopname}</Card.Title>
                                        <div className="card-detail">
                                            <label className='text-center'><span>Address</span>  <span>:</span></label>
                                            <Card.Text>{vendor.shopaddress}</Card.Text>
                                        </div>
                                        <div className="card-detail">
                                            <label className='text-center'><span>Ph </span> <span>:</span></label>
                                            <Card.Text>{vendor.shopmobilenumber}</Card.Text>
                                        </div>
                                    </div>
                                    <div className="btns mt-3">
                                        <Button variant="success" onClick={e => handleDelete(userId, vendor.ProductId)}>Cancel</Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </section>
            {/* User Cart End */}
        </div>
        </Layout>
    )
}

export default UserCart