import DailyWorklogUpdate from '../../components/Faculty/daily_worklog/forms'
import React from 'react';
import Sidebar from '../../components/sideBar';
const DailyUpdates = () => {
  return(
<div className='flex flex-col'>
  <Sidebar/>
  <div className='ml-56'>
  <DailyWorklogUpdate/>
  </div>
</div>
  )
}
export default DailyUpdates