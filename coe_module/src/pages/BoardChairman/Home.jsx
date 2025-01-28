import BoardTable from '../../components/BoardChairman/Home/dataTable'
import React from 'react';
import Sidebar from '../../components/sideBar';
import MovingCard from '../../components/BoardChairman/Home/movingCard'
import TopBottomCorner from '../../components/BoardChairman/Home/corner'
const BoardHome = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <div className='inline w-full'>
      <div className='w-4/5 mt-12'>
      <MovingCard/>
      </div>
      {/* <div className='flex'>
        <div className='w-4/5'>
      <BoardTable/>
      </div>
      <TopBottomCorner/>
      </div> */}
      </div>
    </div>
  );
}
export default BoardHome;
