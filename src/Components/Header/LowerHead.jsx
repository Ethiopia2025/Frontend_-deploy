import React from 'react'
import MenuIcon from "@mui/icons-material/Menu";
import classes from "./Header.module.css"


function LowerHead() {
  return (
    <div className={classes.lower_header_container}>
      <ul>
        <li>
          <MenuIcon />
          <p>All</p>
        </li>
        <li>Todays Deals </li>
        <li>custmor servies </li>
        <li>Registery </li>
        <li>Gift Cards </li>
        <li>sell </li>
      </ul>
    </div>
  );
}

export default LowerHead