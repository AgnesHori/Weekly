import React, {useState} from "react";
import { Carousel } from "react-bootstrap";

export const Slider=({recipes})=>{
    const [index, setIndex] = useState(0);


    //console.log("carousel.js->recipes", recipes)

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

  return (
    
    <Carousel activeIndex={index} onSelect={handleSelect} className="mt-3">
      {recipes.map((obj,index)=>
      <Carousel.Item key={index}>
        <img className="d-block w-100 rounded" src={obj.image_url} alt={obj.title}/>
        <Carousel.Caption>
          <h3>{obj.title}</h3>
        </Carousel.Caption>
      </Carousel.Item>
      )}
    </Carousel>
  );

}

