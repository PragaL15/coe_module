import React from 'react';
import Sidebar from '../../components/sideBar';
import PersonalDetails from '../../components/Faculty/home/personal';
import PaperGraph from '../../components/Faculty/home/paper_graph';
import DailyVenue from '../../components/Faculty/home/Daily_venue';
import PreviousDetails from '../../components/Faculty/home/previous_rec';
import DetailedData from '../../components/Faculty/home/Detailed';
const Home = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <div className='inline'>
        <div className='flex'>
          <div className='md:ml-56 mt-5'>
            <PersonalDetails/>
          </div>
          <div className="md:ml-4 mt-5 p-8">
            <PaperGraph />
          </div>
          <div className='md:mt-4 ml-8'>
            <DailyVenue/>
          </div>
        </div>
        <div className='md:ml-56 mt-5'>
          <PreviousDetails />
        </div>
        <div className='md:ml-56 mt-5'>
          <DetailedData/>
        </div>
      </div>
    </div>
  );
}
export default Home;
