import React from "react";
import { useNavigate } from "react-router-dom";
import { MyImage } from "./MyImage";

// a role button megvan, így kattintható lesz
export const Recipe = ({recipes_id,title,image_url,body,occasion,image_id }) => {
  const navigate=useNavigate()
  return (
    <div className="recipe">
      <div className="d-flex justify-content-center p-2 rounded">
      {image_id && <MyImage recipes_id={recipes_id} title={title} image_url={image_url}/>}
      </div>
      <div className="d-flex flex-column align-items-center ">
        <div>
          <span className="m-1 text-secondary" role="button">{occasion}</span>
        </div>
        <h3 className="text-center mt-2 border-bottom pb-3" role="button" onClick={()=>navigate('/recipes/'+ recipes_id + '/' + image_id)}>
          {title}
        </h3>
        <span className="fst-italic text-secondary">Új bejegyzés </span>
        {/*<h5 className="hozzavalo">{ingredient} {amount} {measurement}</h5>*/}
        <p className="mt-1 recipeDescription">{body}</p>
      </div>
    </div>
  );
};
