import './App.css'
import { Routes, Route } from "react-router-dom";
import {Header} from "./components/Header";
import Matches from "./components/Matches";
import Tables from "./components/Tables";
import Stats from "./components/Stats";
import Players from "./components/Players";

function App() {
  return (
    <div className={'text-white'}>
      <Header />
      <div className={'flex justify-center min-h-screen'} style={{backgroundColor: '#181818'}}>
        <Routes>
          <Route path={'/'} element={<Matches/>}/>
          <Route path={'tables'} element={<Tables/>}/>
          <Route path={'stats'} element={<Stats/>}/>
          <Route path={'players'} element={<Players/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
