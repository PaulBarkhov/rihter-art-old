import { Button } from 'reactstrap'
import './App.css'
import HomePage from './components/HomePage'
import Account from './components/Account'
import Registration from './components/Registration'
import Login from './components/Login'
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/account' element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App
