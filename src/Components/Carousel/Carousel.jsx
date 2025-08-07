import React from 'react'
import { imge } from './Images/data';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import classes from "./Carousel.module.css"
function Carousel1() {
  return (
    <>
      <Carousel
      autoPlay={true}
      infinityLoop={true}
      showStatus={false}
      showThumbs={false}
      showArrows={false}
 >
        {imge.map((imageItem, i) => {
          return <img src={imageItem} key={i} alt="" />;
        })}
      </Carousel>
      <div className={classes.hero_img}></div>
    </>
  );
}

export default Carousel1;





// import React from 'react'
// import { Carousel } from 'react-responsive-carousel';
// import {imge} from "./Images/data";

// function CarouselEffect() {
//   return 
// <div>
//   <Carousel
//     autoPlay={true}
//     showIndicators={false}
//     showThumbs={true}
//     showStatus={true}
//   >
//     {imge.map((imageItem) => {
//       return <img scr={imageItem} />;
//     })}
//   </Carousel>
// </div>;
// }

// export default CarouselEffect;