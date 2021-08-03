import React,{useRef} from 'react'
import { Link, useHistory } from 'react-router-dom'


export const SearchForm = (props) => {
    const searchRef = useRef('');
    const history = useHistory();
    const searchHandler = (e)=>{
     e.preventDefault()
     if (typeof props.onToggle === 'function') 
     {
        props.onToggle() 
     }
   
     var searchQuery = searchRef.current.value;
     if(searchQuery.length<=3)
     {
         return;
     }
	 history.push({pathname:"/search/"+searchQuery}) 
   }
    return (
        <form onSubmit={searchHandler} >
        <input ref={searchRef} type="text" name="search" placeholder="Search Videos"/>
        <button type="submit" >
            <i className="icon-search"></i>
        </button>
       
    </form>
    )
}
