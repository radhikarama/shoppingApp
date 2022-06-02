import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { CartState } from './Context/Context';
import Rating from './Rating'

const Filters = () => {
 const [rating, setRating] = useState(2);
 const { productState: { byStock, byFastDelivery, sort, byRating }, productDispatch } = CartState();
 console.log(byStock, byFastDelivery, sort, byRating)
 return (
  <div className='filters'>
   <span className='title'>Filter Products</span>
   <span>
    <Form.Check
     inline
     label="Ascending"
     name="group1"
     type='radio'
     id={`inline-1`}
     onChange={() => productDispatch({
      type: "SORT_BY_PRICE",
      payload: "lowToHigh"
     })}
     checked={sort === "lowToHigh" ? true : false}
    />
   </span>
   <span>
    <Form.Check
     inline
     label="Descending"
     name="group1"
     type='radio'
     id={`inline-2`}
     onChange={() => productDispatch({
      type: "SORT_BY_PRICE",
      payload: "highToLow"
     })}
     checked={sort === "highToLow" ? true : false}
    />
   </span>
   <span>
    <Form.Check
     inline
     label="Include out of stock"
     name="group1"
     type='checkbox'
     id={`inline-3`}
     onChange={() => productDispatch({
      type: "FILTER_BY_STOCK"
     })}
     checked={byStock}
    />
   </span>
   <span>
    <Form.Check
     inline
     label="Fast Delivery"
     name="group1"
     type='checkbox'
     id={`inline-4`}
     onChange={() => productDispatch({
      type: "FILTER_BY_DELIVERY"
     })}
     checked={byFastDelivery}
    />
   </span>
   <span>
    <label>Rating:</label>
    <Rating rating={byRating} onClick={(i) => productDispatch({
     type: "FILTER_BY_RATING",
     payload: i + 1
    })} style={{ curser: 'pointer' }} />
   </span>
   <Button variant='light'
    onClick={() => productDispatch({
     type: "CLEAR_ITEMS"
    })}
   >Clear Filters</Button>
  </div>
 )
}

export default Filters