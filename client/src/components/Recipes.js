import React from "react";
import { Recipe } from "./Recipe";

export const Recipes = ({recipes}) => {

  return (
    <div className="recipes mt-3" data-testid="recipesComponent">
     {recipes.length > 0 && recipes.map(obj=><Recipe key={obj.recipes_id} {...obj}/>)}
     {recipes.length == 0 && <div data-testid='divMsg'>Nincs adat</div>}
    </div>
  );
};
