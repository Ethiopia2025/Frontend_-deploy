import React, { useEffect, useState } from 'react'
import axios from "axios"
import ProductCard from "./ProductCard";
import classes from "./product.module.css"


function Products() {
  const [products, setProducts] = useState([]);


  useEffect(()=>{
    axios.get(`https://fakestoreapi.com/products`).then((res) => {
      // console.log(res);
      setProducts(res.data);
    });
    
  }    
    
  )
  return (
    <section className={classes.product_container}>
      {products?.map((singleProduct) => {
        return <ProductCard key={singleProduct.id} product={singleProduct} add={true} />;
      })}
    </section>
  );
}

export default Products;