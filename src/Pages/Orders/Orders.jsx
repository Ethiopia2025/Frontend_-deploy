import React, { useContext, useEffect, useState } from "react";
import classes from "./Orders.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { db } from "../../Utility/firebase";
import ProductCard from "../../Components/Products/ProductCard";
import { collection, getDocs } from "firebase/firestore";

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.uid) return;

      try {
        // const userOrdersRef = collection(db, "users", user.uid, "orders");
        const snapshot = await getDocs(
          collection(db, "users", user.uid, "orders")
        );
        const ordersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <section className={classes.container}>
      <div className={classes.order_container}>
        <h2>Your Orders</h2>
        {orders?.length === 0 ? (
          <>
            <h3 style={{ textAlign: "center", padding: "20px" }}>
              You're supposed to have Orders
            </h3>
            <hr />
            <p style={{ textAlign: "center", padding: "20px" }}>
              You have no orders. <br />
              Shop now!
            </p>
          </>
        ) : (
          orders.map((eachOrder, i) => (
            <div key={i}>
              <hr />
              <p>Order ID: {eachOrder?.id}</p>
              {eachOrder?.basket?.map((item) => (
                <ProductCard key={item.id} product={item} flex={true} />
              ))}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Orders;
