import React from "react";
// import classes from "./Category.module.css";
import { categoryInfos } from "./CategoryImages";
import CategoryCard from "./CategoryCard";
import classes from "./Category.module.css";

function Category() {
  return (
    <div className={classes.category_container}>
      {categoryInfos.map((categoryData, index) => {
        return <CategoryCard key={index} data={categoryData} />;
      })}
    </div>
  );
}

export default Category;

// import React from 'react'
// import CategoryCard from './CategoryCard';
// import { CategoryImages } from './CategoryImages';
// function Category() {

//   return (
//     <section>
//       {CategoryImages.map((Categoryimage, i) => {
//        return <CategoryCard key={i} data={Categoryimage} />;
//       })}
//     </section>
//   );
// }

// export default Category;
