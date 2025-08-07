import Header from "./Components/Header/Header";
import CategoryDetail from "./Pages/CategoryDetail/CategoryDetail";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsDetail from "./Pages/ProductsDetail/ProductsDetail";
import Cart from "./Pages/Cart/Cart";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect } from "react";
import { auth } from "./Utility/firebase";
import { Type } from "./Utility/action.type";
import { DataContext } from "./Components/DataProvider/DataProvider";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51RlVShPx3rBgW5l3S9k1RsCg9HSfa3Ww3xbyclC17y2yS7jc1PuuO3FV6s20li9C9kMyklyFfPuM2nFU4sS1pTXg00LMEraXmh"
);

function App() {
  const [{user}, dispatch] = useContext(DataContext);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({ type: Type.SET_USER, user: authUser });
      } else {
        dispatch({ type: Type.SET_USER, user: null });
      }
    });
  }, [dispatch]);

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cat/:cdetail" element={<CategoryDetail />} />
          <Route path="/product/:pdetail" element={<ProductsDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/payment"
            element={
              <ProtectedRoute
                msg={"you must sign in to checKout"}
                redirect={"/auth"}
              >
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />

          <Route
            path="/order"
            element={
              <ProtectedRoute
                msg={"sign in to see your order"}
                redirect={"/order"}
              >
                <Orders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
