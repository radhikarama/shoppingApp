import React, { useEffect, useState } from 'react'
import { CartState } from './Context/Context'
import { ListGroup, Row, Col, Image, Form, Button } from 'react-bootstrap'
import Filters from './Filters';
import Rating from './Rating';
import { AiFillDelete } from 'react-icons/ai'
import './Styles.css'

const CartItems = () => {
 const { state: { cart }, dispatch } = CartState();
 const [total, setTotal] = useState();
 useEffect(() => {
  setTotal(cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0))
 }, [cart])
 return (
  < div className='home' >
   <div className='productContainer'>
    <ListGroup>
     {
      cart.map((prod) => {
       return (
        < ListGroup.Item >
         <Row>
          <Col md='2'>
           <span>
            <Image src={prod.image} alt={prod.name} fluid rounded />
           </span>
          </Col>
          <Col md='2'>
           <span>
            {prod.name}
           </span>
          </Col>
          <Col md='2'>
           <span>
            {prod.price}
           </span>
          </Col>
          <Col md='2'>
           <Rating rating={prod.ratings} />
          </Col>
          <Col md='2'>
           <Form.Control as='select' value={prod.qty}
            onChange={(e) => dispatch({
             type: "CHANGE_INSTOCK",
             payload: { id: prod.id, qty: e.target.value }
            })}
           >
            {
             [...Array(prod.instoke).keys()].map((x) => (
              <option key={x + 1}>{x + 1}</option>
             ))
            }
           </Form.Control>
          </Col>
          <Col md='2'>
           <Button onClick={() => dispatch({
            type: "REMOVE_FROM_CART",
            payload: prod
           })}>
            <AiFillDelete style={{ fontSize: '20px' }} />
           </Button>
          </Col>
         </Row>
        </ListGroup.Item>
       )
      })
     }
    </ListGroup>

   </div>
   <div className='filters summery'>
    <span className='title'>Sub-Total ({cart.length}) items</span>
    <span>Total ₹{total}</span>
    <Button disabled={cart.length === 0}
     onClick={() => dispatch({
      type: "CLEAR_CART"
     })}
    >
     Proceed to CheckOut
    </Button>
   </div>
  </div >
 )
}

export default CartItems