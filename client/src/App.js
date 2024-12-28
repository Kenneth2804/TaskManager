import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
  <Routes>
    <Route path='/' exact element={<Home/>}></Route>

  </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;