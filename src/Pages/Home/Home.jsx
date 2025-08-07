import React from 'react'
import Category from "../../Components/Category/Category";
import Products from '../../Components/Products/Products';
import Carousel1 from '../../Components/Carousel/Carousel';

function Home() {
  return (
    <>
      <Carousel1 />
      <Category />
      <Products />
    </>
  );
}

export default Home;