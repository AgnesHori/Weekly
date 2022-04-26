import React from "react";
import { useNavigate } from "react-router-dom";

// a role button megvan, így kattintható lesz
export const Recipe = ({recipes_id,title,image_url,body,user_name,occasion,type,diet,amount,ingredient,measurement }) => {
  const navigate=useNavigate()
  return (
    <div className="recipe">
      <img
        className="recipeImg"
        src={require('../../../server/public/images/'+ image_url)}
        alt={title}
      />
      <div className="d-flex flex-column align-items-center ">
        <div>
          <span className="m-1 text-secondary" role="button">{occasion}</span>
          {/*<span className="m-1 text-secondary" role="button">
            É
          </span>*/}
        </div>
        <h3 className="text-center mt-2 border-bottom pb-3" role="button" onClick={()=>navigate('/recipes/'+ recipes_id)}>
          {title}
        </h3>
        <span className="fst-italic text-secondary">Új bejegyzés </span>
        {/*<h5 className="hozzavalo">{ingredient} {amount} {measurement}</h5>*/}
        <p className="mt-1 recipeDescription">{body}</p>
      </div>
    </div>
  );
};
