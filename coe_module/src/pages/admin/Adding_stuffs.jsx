import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Sidebar from '../../components/sideBar';

import CourseAdd from '../../components/admin/course_add';
import AcademicAdd from '../../components/admin/academic_add';
import SemesterAdd from '../../components/admin/semester_add';
import DepartmentAdd from '../../components/admin/dept_add';
import BCEAdd from '../../components/admin/bce_add';
import FacultyAdd from '../../components/admin/faculty_add';

const AdminAccess = () => {
  const [activeComponent, setActiveComponent] = useState(null); 

  const handleEdit = (componentName) => {
    setActiveComponent(componentName);
  };

  const handleBack = () => {
    setActiveComponent(null); 
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'CourseAdd':
        return <CourseAdd />;
      case 'AcademicAdd':
        return <AcademicAdd />;
      case 'SemesterAdd':
        return <SemesterAdd />;
      case 'DepartmentAdd':
        return <DepartmentAdd />;
      case 'BCEAdd':
        return <BCEAdd />;
      case 'FacultyAdd':
        return <FacultyAdd />;
      default:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-3 mt-10">
            <Card
               header={
                <div className="text-xl justify-center ml-6 mt-5 font-bold text-blue-600">
                  Course Management
                </div>
              }
              className="shadow-lg text-sm"
              footer={
                <Button
                  label="Edit"
                  icon="pi pi-pencil"
                  onClick={() => handleEdit('CourseAdd')}
                  className="p-button-sm p-button-primary bg-slate-500 text-white p-2"
                />
              }
            >
              Add the courses to the list.
            </Card>
            <Card
               header={
                <div className="text-xl justify-center ml-6 mt-5 font-bold text-blue-600">
                  Academic Details
                </div>
              }
              className="shadow-lg text-sm"
              footer={
                <Button
                  label="Edit"
                  icon="pi pi-pencil"
                  onClick={() => handleEdit('AcademicAdd')}
                  className="p-button-sm p-button-primary bg-slate-500 text-white p-2"
                />
              }
            >
              Add the Academic year to the list.
            </Card>
            <Card
               header={
                <div className="text-xl justify-center ml-6 mt-5 font-bold text-blue-600">
                  Semester Adding
                </div>
              }
              className="shadow-lg text-sm"
              footer={
                <Button
                  label="Edit"
                  icon="pi pi-pencil"
                  onClick={() => handleEdit('SemesterAdd')}
                  className="p-button-sm p-button-primary bg-slate-500 text-white p-2"
                />
              }
            >
               Add the semester code to the list.
            </Card>
            <Card
               header={
                <div className="text-xl justify-center ml-6 mt-5 font-bold text-blue-600">
                  Department Allotment
                </div>
              }
              className="shadow-lg  text-sm"
              footer={
                <Button
                  label="Edit"
                  icon="pi pi-pencil"
                  onClick={() => handleEdit('DepartmentAdd')}
                  className="p-button-sm p-button-primary bg-slate-500 text-white p-2"
                />
              }
            >
              Add the Department Name to the list.
            </Card>
            <Card
               header={
                <div className="text-xl justify-center ml-6 mt-5 font-bold text-blue-600">
                  Board chairman Allotment
                </div>
              }
              className="shadow-lg text-sm"
              footer={
                <Button
                  label="Edit"
                  icon="pi pi-pencil"
                  onClick={() => handleEdit('BCEAdd')}
                  className="p-button-sm p-button-primary bg-slate-500 text-white p-2"
                />
              }
            >
                Add the Board Chairman details to the list.
            </Card>
            <Card
               header={
                <div className="text-xl justify-center ml-6 mt-5 font-bold text-blue-600">
                  Faculty Adding
                </div>
              }
              className="shadow-lg text-sm"
              footer={
                <Button
                  label="Edit"
                  icon="pi pi-pencil"
                  onClick={() => handleEdit('FacultyAdd')}
                  className="p-button-sm p-button-primary bg-slate-500 text-white p-2"
                />
              }
            >
             Add the Faculty details to the list.
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 flex-1 p-4">
        {activeComponent && (
          <Button
            label="Back"
            icon="pi pi-arrow-left"
            className="mb-4"
            onClick={handleBack}
          />
        )}
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default AdminAccess;
