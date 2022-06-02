import React, { createContext, useContext, useReducer } from 'react'
import faker from 'faker';
import { shoppingReducer, productReducer } from './Reducer';

const Cart = createContext();

const Context = ({ children }) => {
 const products = [...Array(21)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  image: faker.random.image(),
  instoke: faker.random.arrayElement([0, 3, 5, 6, 7]),
  fastDelivery: faker.datatype.boolean(),
  ratings: faker.random.arrayElement([1, 2, 3, 4, 5])
 }))
 const [state, dispatch] = useReducer(shoppingReducer, {
  products: products,
  cart: []
 })
 const [productState, productDispatch] = useReducer(productReducer, {
  byStock: false,
  byFastDelivery: false,
  byRating: 0,
  searchQuery: ""
 })
 return <Cart.Provider value={{
  state, dispatch, productState, productDispatch
 }}>
  {children}
 </Cart.Provider>
}

export const CartState = () => {
 return useContext(Cart);
}
export { Context, Cart };