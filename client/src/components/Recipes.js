import React from "react";
import { Recipe } from "./Recipe";

export const Recipes = ({recipes}) => {

  return (
    <div className="recipes mt-3">
     {recipes.map(obj=><Recipe key={obj.recipes_id} {...obj}/>)}
    </div>
  );
};
