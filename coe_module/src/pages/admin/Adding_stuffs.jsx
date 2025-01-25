import CourseAdd from '../../components/admin/course_add';
import AcademicAdd from '../../components/admin/academic_add'
import SemesterAdd from '../../components/admin/semester_add'
import DepartmentAdd from '../../components/admin/dept_add'
import BCEAdd from '../../components/admin/bce_add'
import FacultyAdd from '../../components/admin/faculty_add'
import React from 'react';
import Sidebar from '../../components/sideBar';
const AdminAccess = () => {
  return(
<div className='flex flex-col'>
  <Sidebar/>
  <div className='ml-64'>
    <div className='inline'>
  <CourseAdd/>
  <AcademicAdd/>
  <SemesterAdd/>
  <DepartmentAdd/>
  <BCEAdd/>
  <FacultyAdd/>
  </div>
  </div>
</div>
  )
}
export default AdminAccess