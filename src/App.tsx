import './App.css'
import { Routes, Route } from "react-router-dom";
import {Header} from "./components/Header";
import Matches from "./components/Matches";
import Standings from "./components/Standings";
import Stats from "./components/Stats";
import Players from "./components/Players";
import TeamMatches from "./components/TeamMatches.tsx";

function App() {
  return (
    <div className={'text-white'}>
      <Header />
      <div className={'flex justify-center min-h-screen'} style={{backgroundColor: '#181818'}}>
        <Routes>
          <Route path={'/'} element={<Matches/>}/>
          <Route path={'standings'} element={<Standings/>}/>
          <Route path={'stats'} element={<Stats/>}/>
          <Route path={'players'} element={<Players/>}/>
          <Route path={'teamMatches'} element={<TeamMatches/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
