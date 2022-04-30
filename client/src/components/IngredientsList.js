import React, {useState,useEffect} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

export const IngredientsList=(ingredients,setIngredients,ingredient,setIngredient,allIngredients,setAllIngredients)=>{


    const addIng =(e)=>{
        e.preventDefault()
        const index=ingredients.length+1
        setIngredients([...ingredients,{id:index,item:ingredient}])
        setIngredient('')
    }
    const delIng=(id)=>{
        const newIngredients=ingredients.filter(obj=>obj.id!==id)
        setIngredients(newIngredients)
    }

    return(
        <section>
            <h3>Hozzávalók</h3>   
            <form className="row justify-content-center">
                <div className="col-md-6">
                   {/*} <option value={ingredient} placeholder="Hozzávaló kiválasztása"  onChange={(e)=>{setIngredients(e.target.value)}}>Válassz hozzávalót</option> 
                        {ingredients.map(obj=>(<option value={obj.ingr_id} key={obj.ingr_id}>{obj.ingredient}{obj.measurement}</option>))}*/}                    
                    <input className="form-control m-2" type="text" name="amount" placeholder="Mennyiség" />
                </div>
                <div className="col-1">
                    <i role="button" className="fa-solid fa-square-plus text-success fa-xl" onClick={()=>addIng()} disabled={!ingredients}></i>
                </div>
            </form>
            <ListGroup className="p-2">
               {/*} {ingredients.map((obj,index)=><ListGroup.Item key={index}><span className="d-flex justify-content-between">{obj.ingredient} {obj.amount} {obj.measurement}</span>
                <i role="button" className="fa-solid fa-trash-can ms-3 text-danger" onClick={()=>delIng()}></i></ListGroup.Item>)}*/}
            </ListGroup>
        </section>
    )
}