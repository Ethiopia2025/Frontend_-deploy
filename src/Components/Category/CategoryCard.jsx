import React from "react";
import { Link } from "react-router-dom";
import classes from "./Category.module.css";

function CategoryCard({ data }) {
  // console.log(data);
    const { title, name, imgLink } = data;

  return (
    <div className={classes.category}>
      <Link to={`/cat/${name}`}>
        <h3>{title}</h3>
        <img src={imgLink} alt="" />
        <p>shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;




// import React from 'react'

// function CategoryCard({data}) {
//     console.log(data);
    
//   return (
//     <a href="">
//       <p>{data?.title}</p>
//       <img src={data?.imgLink} alt="" />
//       <p>shop now</p>
//     </a>
//   );
// }

// export default CategoryCard