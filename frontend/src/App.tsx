import './App.css'
import { useState } from 'react'
import { Dashboard } from './components/dashboard'
import { Sidebar } from './components/sidebar'
import { EmployeeList } from './components/employee-list'
import { LeaveManagement } from './components/leave-management'
import { DocumentManagement } from './components/document-management'
import { Settings } from './components/settings'

function App() {
  const [activeView, setActiveView] = useState("dashboard");

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />
      case "employees": 
        return <EmployeeList />
      case "leaves":
        return <LeaveManagement />
      case "documents": 
        return <DocumentManagement />
      case "settings":
        return <Settings />
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
    </>
  )
}

export default App
