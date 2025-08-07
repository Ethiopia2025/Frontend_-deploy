import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../Components/Products/ProductCard";
import classes from "./CategoryDetail.module.css"

function CategoryDetail() {
  const { cdetail } = useParams();
  console.log(cdetail);

  const [categoryDet, setCategoryDet] = useState([]);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/category/${cdetail}`)
      .then((res) => {
        console.log(res.data);
        setCategoryDet(res.data);
      });
  }, [cdetail]);

  return (
    <div className={classes.container}>
      {categoryDet.map((cateItem) => {
        return <ProductCard key={cateItem.id} product={cateItem} add={true} />;
      })}
    </div>
  );
}

export default CategoryDetail;
