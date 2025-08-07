import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from "./product.module.css";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import Rating from "@mui/material/Rating";

function ProductCard({ product, des, flex, add }) {
  const { id, title, image, price, rating, description } = product;
  const [state,dispatch] = useContext(DataContext);
  const addToCart = ()=>{
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { id, title, image, price, rating, description },
    });
  }


  return (
    <div
      className={`${classes.card_container} ${flex && classes.product_flexed}`}
    >
      <Link to={`/product/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {des && <p style={{ maxWidth: "700px" }}>{description}</p>}
        <div>
          <Rating value={rating?.rate ?? 0} precision={0.5} />
          <small>{rating?.count ?? 0}</small>
        </div>
        <div>${price}</div>
        {add && (
          <button onClick={addToCart} className={classes.btn}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;

// {abebe? <p>{description}: ""</p>}
// {desc && <p>{description}</p>}
