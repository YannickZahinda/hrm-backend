import './App.css'
import { useState} from 'react'
import { Dashboard } from './components/dashboard'
import { Sidebar } from './components/sidebar'
import { EmployeeList } from './components/employee-list'
import { LeaveManagement } from './components/leave-management'
import { DocumentManagement } from './components/document-management'
import { Settings } from './components/settings'
import Footer from './components/Footer'
import EmployeeEdit from './components/employees/Employee-edit'
import { Employee } from './types/types'

function App() {
  const [activeView, setActiveView] = useState("dashboard");
  const [editEmployeeId, setEditEmployeeId] = useState<number | null>(null)
  const [employee, setEmployee] = useState<Employee |null>(null)

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />
      case "employees": 
        return <EmployeeList setActiveView={setActiveView} setEditEmployeeId={setEditEmployeeId} />
      case "leaves":
        return <LeaveManagement employeeId={employee?.id} />
      case "documents": 
        return <DocumentManagement />
      case "settings":
        return <Settings />
      case "edit-employee": 
        return <EmployeeEdit id={editEmployeeId} setActiveView={setActiveView} />
      default: 
        return <Dashboard />
    }
  }

  return (
    <>
      <div className='flex h-screen bg-background'>
       <Sidebar activeView={activeView} setActiveView={setActiveView} />
       <main className='flex-1 overflow-auto p-6'>
        {renderContent()}
       </main>
      </div>
      <Footer />
    </>
  )
}

export default App
