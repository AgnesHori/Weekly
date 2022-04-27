import React from "react";
import { Recipe } from "./Recipe";

export const Recipes = ({recipes}) => {
<<<<<<< HEAD

=======
>>>>>>> ee2e32a4afc341dcecdaa90c19fb8ebb1723f5da
  return (
    <div className="recipes mt-3">
     {recipes.map(obj=><Recipe key={obj.recipes_id} {...obj}/>)}
    </div>
  );
};
