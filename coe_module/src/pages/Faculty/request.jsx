import Form from '../../components/Faculty/request/form'
import React from 'react';
import Sidebar from '../../components/sideBar';
const request = () => {
  return(
<div className='flex flex-col'>
  <Sidebar/>
  <div className='md:ml-64 mt-4'>
  <Form/>
  </div>
</div>
  )
}
export default request