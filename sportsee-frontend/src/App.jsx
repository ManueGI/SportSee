import Router from './Router'
import Header from './components/Header'
import { BrowserRouter } from 'react-router-dom'
import SideBar from './components/SideBar'
import './App.css'
import { AppProvider } from './contexts'


function App() {


  return (
    <BrowserRouter>
      <AppProvider>
        <div className="app">
          <Header />
          <div className="app-body">
            <SideBar />
            <main className="main-content">
              <Router />
            </main>
          </div>
        </div>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
