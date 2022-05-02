import {render} from '@testing-library/react'
import { Recipes } from './Recipes'

const data=[]

describe('Recipes Component',()=>{
    it('should rendered', ()=>{
        const {getByTestId}=render(<Recipes recipes={data}/>)
        const recipesComponentRendered = getByTestId('recipesComponent')
        expect (recipesComponentRendered).toBeTruthy()
    })
    it('render div with msg',()=>{
        const {getByTestId}=render(<Recipes recipes={data}/>)
        const div= getByTestId('divMsg')
        expect (div).toBeTruthy()
    })
})