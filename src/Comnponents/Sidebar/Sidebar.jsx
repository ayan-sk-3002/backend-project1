import React from 'react'
import '../Sidebar/Sidebar.css'
const Sidebar = ({tab,setTab}) => {

  return (
    <div className='side-bar'>
       <button onClick={()=>{setTab("all")}} className={tab==="all"?"active-tab":""}>To All</button>
        <button onClick={()=>{setTab("users")}}  className={tab==="users"?"active-tab":""}>To Selected</button>
        <button onClick={()=>{setTab("non-users")}}  className={tab==="non-users"?"active-tab":""}>To Non-Registered App Users</button>
    </div>
  )
}

export default Sidebar