import React, { useContext } from "react";
import ProductCard from "../../Components/Products/ProductCard";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import classes from "./Cart.module.css";
import { Type } from "../../Utility/action.type";
import { Link } from "react-router-dom";

function Cart() {
  const [{ basket }, dispatch] = useContext(DataContext);
  // console.log(basket);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const increament = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decreament = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <section className={classes.container}>
      <div>
        <div>
          <h2>Hello</h2>
          <h4>Your Shopping Cart</h4>
          <hr />
        </div>
        <div>
          {basket.length === 0 ? (
            <p>Your Cart is Empty</p>
          ) : (
            basket.map((item) => (
              <div className={classes.cart_product}>
                <ProductCard
                  key={item.id}
                  product={item}
                  flex={true}
                  add={false}
                  des={true}
                />
                <div className={classes.btn_container}>
                  <button onClick={() => increament(item)}>
                    <KeyboardArrowUpIcon />
                  </button>
                  <span>{item.amount}</span>
                  <button onClick={() => decreament(item.id)}>
                    <KeyboardArrowDownIcon />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <div className={classes.subtotal}>
          <p>Subtotal ({basket.length} items)</p>
          <span>${total.toFixed(2)}</span>
        </div>
        <span className={classes.gift}>
          <input type="checkbox" />
          This order contains a gift
        </span>
        <br />
        <Link className={classes.continue} to="/payment">Continue to checkout</Link>
      </div>
    </section>
  );
}

export default Cart;

//const [state, dispatch] = useReducer(initialState, reducer);
