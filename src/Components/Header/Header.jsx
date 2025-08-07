import React, { useContext } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import classes from "./Header.module.css";
import LowerHead from "./LowerHead";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

function Header() {
  const [{basket,user}] = useContext(DataContext);
  const totalA = basket.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  return (
    <section className={classes.header_container}>
      <section className={classes.container}>
        {/* left side */}
        <div className={classes.left_container}>
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt=""
            />
          </Link>
          <div className={classes.location_container}>
            <LocationOnOutlinedIcon />
            <div>
              <p>deliver to</p>
              <span> ethiopa</span>
            </div>
          </div>
        </div>
        {/* middle container */}
        <div className={classes.middle_container}>
          <select>
            <option>all</option>
          </select>
          <input type="text" placeholder="search amazon" />
          <SearchOutlinedIcon className={classes.search} />
        </div>
        {/* rigtht side */}
        <div className={classes.right_container}>
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/1280px-Flag_of_the_United_States.png"
              alt=""
            />
            <select>
              <option>EN</option>
            </select>
          </div>
          <Link to={!user && "/auth"}>
            {user ? (
              <>
                <p>Hello, {user?.email?.split("@")[0]}</p>
                <span onClick={() => auth.signOut()}>Sign Out</span>
              </>
            ) : (
              <>
                <p>Hello, Sign In</p>
                <span>Account & Lists</span>
              </>
            )}
          </Link>

          <Link to="/order">
            <p>returns</p>
            <span>& order</span>
          </Link>

          <Link to="/cart" className={classes.cart}>
            <ShoppingCartOutlinedIcon />
            <span>{totalA}</span>
          </Link>
        </div>
      </section>
      <LowerHead />
    </section>
  );
}

export default Header;
