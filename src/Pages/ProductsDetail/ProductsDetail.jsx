import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../Components/Products/ProductCard";

function ProductsDetail() {
  const { pdetail } = useParams();
  const [productDet, setProductDet] = useState("");

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${pdetail}`)
      .then((res) => {
        console.log(res.data);
        setProductDet(res.data); // ✅ Set the product data correctly
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      });
  }, [pdetail]); 


  return (
    <div>
      <ProductCard product={productDet} des={true} flex={true} add={true}  />
    </div>
  );
}

export default ProductsDetail;
