import BoardTable from '../../components/BoardChairman/dataTable'
import React from 'react';
import Sidebar from '../../components/sideBar';
import MovingCard from '../../components/BoardChairman/movingCard'
const BoardHome = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <div className='inline'>
      <MovingCard/>
      <BoardTable/>
      </div>
    </div>
  );
}
export default BoardHome;
