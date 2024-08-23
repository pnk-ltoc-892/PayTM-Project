import React from 'react'
import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import SendMoney from '../components/SendMoney'
import {Users} from '../components/User'

function Dashboard() {
  return (
    <div>
      <Appbar />
      <Balance value={10000}/>
      
      <Users />
            
    </div>
  )
}

export default Dashboard