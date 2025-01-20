import React from 'react'
import Sidebar from '../../components/sideBar'
import PersonalDetails from '../../components/Faculty/home/personal'
import PaperGraph from '../../components/Faculty/home/paper_graph'
const Home = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <div className='md:ml-64 mt-5'>
      <PersonalDetails/>
      </div>
      <div className="md:ml-20 mt-5 w-96 p-12 h-72">
    <PaperGraph />
</div>
    </div>
  )
}

export default Home
