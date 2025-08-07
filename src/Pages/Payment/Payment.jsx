import React, { useContext, useState } from "react";
import axiosInstance from "../../Api/axios";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Products/ProductCard";
import classes from "./Payment.module.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { db } from "../../Utility/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Type } from "../../Utility/action.type";
import { useNavigate } from "react-router-dom";
// import { db } from "../../Utility/firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext); // or similar

  console.log(user);
  const [cardError, setCardError] = useState(null);

  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = async (e) => {
    e.error?.message ? setCardError(e.error?.message) : setCardError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.uid) {
      console.error("User not logged in.");
      alert("you must login")
      return;
    }
    try {
      //clientSecret
      const response = await axiosInstance.post(
        `/payment/create?total=${total * 100}`
      );
      // const response = await axios.post(
      //   `http://127.0.0.1:5001/ethiopia-e67f1/us-central1/api/payment/create?total=${
      //     total * 100
      //   }`
      // );
      //  console.log(response.data.clientSecret);

      const clientSecret = response.data?.clientSecret;
      // client side(react side) conformation

      const paymentIntent = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      console.log(paymentIntent);
      // const paymentIntent = confirmation.paymentIntent;
      const intent = paymentIntent.paymentIntent;

      // deposit into database

      await setDoc(doc(db, "users", user?.uid, "orders", intent.id), {
        basket,
        amount: intent.amount,
        created: intent.created,
      });

      dispatch({
        type: Type.EMPTY_FROM_BASKET,
      });
      navigate("/order")
      //  await db
      //    .collection("users")
      //    .doc(user?.uid)
      //    .collection("orders")
      //    .doc(paymentIntent.id)
      //    .set({
      //      basket: basket,
      //      amount: paymentIntent.amount,
      //      created: paymentIntent.created,
      //    });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section>
      <h1> checkout (2)items in your cart</h1>
      <div className={classes.payment_container}>
        <div className={classes.deliver}>
          <h3>Deliver Address</h3>
          <div>
            <p>{user?.email}</p>           
            <p>200 sanes Ave</p>
            <p>Adhian.sc 29401</p>
          </div>
        </div>
        <hr />
        <div className={classes.deliver}>
          <h3>Reveiw items and address</h3>
          <div>
            {basket?.map((item, i) => (
              <ProductCard key={i} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        <div className={classes.deliver}>
          <h3>Payment method </h3>
          <div>
            <div>
              <form onSubmit={handleSubmit}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                <CardElement onChange={handleChange} />

                <div className={classes.payment_price}>
                  <span>
                    Total Order | $<strong>{total}</strong>
                  </span>

                  <button type="submit">Pay Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Payment;
