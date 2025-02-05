import FacultyPriceTable from '../../components/Faculty/amt_calculation/Amt'
import React from 'react';
import Sidebar from '../../components/sideBar';
const Price = () => {
  return(
<div className='flex flex-col'>
  <Sidebar/>
  <div className='md:ml-64 mt-4'>
  <FacultyPriceTable/>
  </div>
</div>
  )
}
export default Price