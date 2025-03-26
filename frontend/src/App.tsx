import './App.css'
import { useState, useEffect } from 'react'
import { Dashboard } from './components/dashboard'
import { Sidebar } from './components/sidebar'
import { EmployeeList } from './components/employee-list'
import { LeaveManagement } from './components/leave-management'
import { DocumentManagement } from './components/document-management'
import { Settings } from './components/settings'

function App() {
  const [activeView, setActiveView] = useState("dashboard");

  useEffect(() => {
    console.log('App mounted - checking environment:')
    console.log('NODE_ENV:', process.env.NODE_ENV)
    console.log('API_BASE_URL:', process.env.API_BASE_URL)
    
    // Test API connection
    fetch('http://localhost:3000/employees/all')
      .then(res => res.json())
      .then(data => console.log('API test response:', data))
      .catch(err => console.error('API test error:', err))
  }, [])

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
