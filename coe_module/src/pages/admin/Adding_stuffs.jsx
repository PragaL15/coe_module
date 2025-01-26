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
  const [activeComponent, setActiveComponent] = useState(null); // Track which component is active

  // Handlers to set the active component
  const handleEdit = (componentName) => {
    setActiveComponent(componentName);
  };

  const handleBack = () => {
    setActiveComponent(null); // Go back to the card view
  };

  // Render the respective component based on activeComponent
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            <Card
              title="Course Management"
              className="shadow-lg"
              footer={
                <Button
                  label="Edit"
                  icon="pi pi-pencil"
                  onClick={() => handleEdit('CourseAdd')}
                  className="p-button-sm p-button-primary"
                />
              }
            >
              Manage course-related data.
            </Card>
            <Card
              title="Academic Management"
              className="shadow-lg"
              footer={
                <Button
                  label="Edit"
                  icon="pi pi-pencil"
                  onClick={() => handleEdit('AcademicAdd')}
                  className="p-button-sm p-button-primary"
                />
              }
            >
              Manage academic details.
            </Card>
            <Card
              title="Semester Management"
              className="shadow-lg"
              footer={
                <Button
                  label="Edit"
                  icon="pi pi-pencil"
                  onClick={() => handleEdit('SemesterAdd')}
                  className="p-button-sm p-button-primary"
                />
              }
            >
              Manage semester information.
            </Card>
            <Card
              title="Department Management"
              className="shadow-lg"
              footer={
                <Button
                  label="Edit"
                  icon="pi pi-pencil"
                  onClick={() => handleEdit('DepartmentAdd')}
                  className="p-button-sm p-button-primary"
                />
              }
            >
              Manage department-related data.
            </Card>
            <Card
              title="BCE Management"
              className="shadow-lg"
              footer={
                <Button
                  label="Edit"
                  icon="pi pi-pencil"
                  onClick={() => handleEdit('BCEAdd')}
                  className="p-button-sm p-button-primary"
                />
              }
            >
              Manage BCE information.
            </Card>
            <Card
              title="Faculty Management"
              className="shadow-lg"
              footer={
                <Button
                  label="Edit"
                  icon="pi pi-pencil"
                  onClick={() => handleEdit('FacultyAdd')}
                  className="p-button-sm p-button-primary"
                />
              }
            >
              Manage faculty-related data.
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="ml-64 flex-1 p-4">
        {/* Back Button for components */}
        {activeComponent && (
          <Button
            label="Back"
            icon="pi pi-arrow-left"
            className="mb-4"
            onClick={handleBack}
          />
        )}

        {/* Render Cards or Active Component */}
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default AdminAccess;
