import './App.css'
import Login from './components/login.component/login.component'

import Header from './components/header.component/header.component'

function App() {
  if (Boolean(localStorage.getItem("token"))) {
    return (
      <div className='App'>
      <header className='App-header'>
        <Header />
      </header>
    </div>
    )
  }
  else {
    return (
      <div >
        <Login />
      </div>
    )
  }

}

export default App
