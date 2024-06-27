import React, { useState } from "react";
import './TopBarSearch.css'
import {useNavigate} from "react-router-dom"

import {Modal} from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'



export const TopBarSearch=({recipes})=>{
    console.log(recipes)
    const navigate=useNavigate()
    const [wordSearch,setWordSearch]=useState('')
    const [matchingRecipes,setMatchingRecipes]=useState([])
    const [open,setOpen]=React.useState(false)

    const handleFilter=(event)=>{
        const typedWord=event.target.value
        setWordSearch(typedWord)
        console.log(wordSearch)
        console.log(recipes)
        const newArr=recipes.filter(recipes=>recipes.title.toLowerCase().includes(typedWord.toLowerCase()))
        if(typedWord!=='')
            setMatchingRecipes(newArr)
        else
            setMatchingRecipes([])
            setOpen(true)
    }

    const handleClear=()=>{
        setMatchingRecipes([])
        setWordSearch('')
        setOpen(false)
    }

    const handleSelected=(recipes_id,image_id)=>{
        navigate('/recipes/'+recipes_id+'/'+image_id)
        setOpen(false)
    }

    return(
        <div>
            <div className="d-flex justify-content-between border rounded">
                <input className="border p-2" type="text" value={wordSearch} onChange={handleFilter} />
                {wordSearch===''? <i className="fa-solid fa-magnifying-glass"></i> :
                    <i className="fa-solid fa-xmark" onClick={handleClear}></i>}
            </div>
            {/*modal*/}
            {matchingRecipes.length !==0 && <Modal
                open={open}
                onClose={()=>setOpen(false)}
                center
                classNames={{
                    overlayAnimationIn: 'customEnterOverlayAnimation',
                    overlayAnimationOut: 'customLeaveOverlayAnimation',
                    modalAnimationIn: 'customEnterModalAnimation',
                    modalAnimationOut: 'customLeaveModalAnimation',}}
                animationDuration={800}>
                <div className="bordered round">
                    {matchingRecipes.map(obj=><div key={obj.recipes_id} onClick={()=>handleSelected(obj.recipes_id,obj.image_id)}>{obj.title}</div>)}
                 </div>
            </Modal>}
        </div>
    )
}