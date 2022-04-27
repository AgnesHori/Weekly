import React, { useState } from "react";
import './TopBarSearch.css'
import {useNavigate} from "react-router-dom"


export const TopBarSearch=({placeholder,recipes})=>{
    console.log(recipes)
    const navigate=useNavigate()
    const [wordSearch,setWordSearch]=useState('')
    const [matchingRecipes,setmatchingRecipes]=useState([])

    const handleFilter=(event)=>{
        const typedWord=event.target.value
        setWordSearch(typedWord)
        console.log(wordSearch)
        console.log(recipes)
        const newArr=recipes.filter(recipes=>recipes.title.toLowerCase().includes(typedWord.toLowerCase()))
        if(typedWord!=='')
            setmatchingRecipes(newArr)
        else
            setmatchingRecipes([])
    }

    const handleClear=()=>{
        setmatchingRecipes([])
        setWordSearch('')
    }

    return(
        <div>
            <div className="d-flex justify-content-between border rounded">
                <input className="border p-1" type="text" value={wordSearch} onChange={handleFilter} />
                {wordSearch==='' ? <i className="fa-solid fa-magnifying-glass"></i> :
                    <i className="fa-solid fa-xmark" onClick={handleClear}></i>}
            </div>
            {/*modal*/}
            {matchingRecipes.length!==0 && (
                <div className="backdrop" onClick={handleClear}> 
                    <div className="dataResult">
                        {matchingRecipes.map(obj=>
                            <div key={obj.recipes_id} onClick={()=>navigate('/recipes/'+obj.recipes_id)}>{obj.title}</div>
                            )}
                    </div>
                </div>
            )}
        </div>
    )
}