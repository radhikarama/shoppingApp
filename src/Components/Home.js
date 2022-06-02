import React, { useContext } from 'react'
import { CartState } from './Context/Context';
import Filters from './Filters'
import './Styles.css'

import SingleProduct from './SingleProduct';
const Home = () => {
 const { state: { products },
  productState: { byStock, byFastDelivery, sort, byRating, searchQuery }
 } = CartState();

 const transformProducts = () => {
  let sortedProducts = products;
  if (sort) {
   sortedProducts = sortedProducts.sort((a, b) => sort === "lowToHigh" ? a.price - b.price :
    b.price - a.price
   )
  }
  if (!byStock) {
   sortedProducts = sortedProducts.filter((prod) => prod.instoke)
  }
  if (byFastDelivery) {
   sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery)
  }
  if (byRating) {
   sortedProducts = sortedProducts.filter((prod) => (prod.ratings) >= byRating)
  }
  if (searchQuery) {
   sortedProducts = sortedProducts.filter((prod) => prod.name.toLowerCase().includes(searchQuery))
  }
  return sortedProducts;
 }

 return (
  <div className='home'>
   <Filters />
   <div className='productContainer'>
    {
     transformProducts().map((prod) => {
      return (
       <SingleProduct product={prod} key={prod.id} />
      )
     })
    }
   </div>
  </div>
 )
}

export default Home