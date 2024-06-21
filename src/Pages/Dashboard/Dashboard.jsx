import React, { useState } from 'react'
import Sidebar from '../../Comnponents/Sidebar/Sidebar'
import '../Dashboard/Dashboard.css'
import InputArea from '../../Comnponents/InputArea/InputArea'
export const Dashboard = () => {
    const [tab,setTab] = useState("all")
  return (
    <div className='dashboard'>
      <div className="main-box">
        <Sidebar tab={tab} setTab={setTab}/>
       <InputArea tab={tab} setTab={setTab}/>
        </div>
    </div>
  )
}
