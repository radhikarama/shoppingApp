import React from 'react'
import '../App.css'
import { Container, FormControl, Nav, Navbar, Dropdown, Badge, Button } from 'react-bootstrap'
import { FaShoppingCart } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { CartState } from './Context/Context'


const Header = () => {
  const { state: { cart }, productState: { searchQuery
  }, dispatch, productDispatch } = CartState();
  console.log('first', searchQuery)
  return (
    <Navbar bg="dark" variant='dark' style={{ height: '80' }}>
      <Container>
        <Navbar.Brand ><Link to='/'>Shopping Cart</Link></Navbar.Brand>
        <Navbar.Text>
          <FormControl className='search' style={{ width: '800px' }} placeholder='Search for a product'
            onChange={(e) => productDispatch({
              type: "FILTER_BY_SEARCH",
              payload: e.target.value
            })}
          />
        </Navbar.Text>
        <Nav >
          <Dropdown alignRight>
            <Dropdown.Toggle variant='success'>
              <FaShoppingCart color="white" fontSize='25px' />
              <Badge color='white'>{cart.length}</Badge>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: 350 }} >
              {
                cart.length > 0 ? (
                  <>
                    {
                      cart.map((prod) => {
                        return (
                          <span className='cartItems'>
                            <img src={prod.image} alt={prod.name} className='cartItemimage' />
                            <div className='cartItemdetails'>
                              <span>{prod.name}</span>
                              <span>{prod.price.split('.')[0]}</span>
                            </div>
                            <AiFillDelete style={{ fontSize: '20px' }}
                              onClick={() => dispatch({
                                type: "REMOVE_FROM_CART",
                                payload: prod
                              })}
                            />
                          </span>
                        )
                      })}
                    <Link to='/cart'>
                      <Button style={{ width: '95%', margin: '10px' }}
                      >Go to Cart</Button>
                    </Link>
                  </>
                ) : (
                  <span>Cart is empty</span>
                )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar >
  )
}

export default Header