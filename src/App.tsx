import './App.css'
import { Routes, Route } from "react-router-dom";
import {Header} from "./components/Header";
import Matches from "./components/Matches";
import Standings from "./components/Standings";
import Stats from "./components/Stats";
import Teams from "./components/Teams.tsx";
import TeamMatches from "./components/TeamMatches.tsx";
import TeamInfo from "./components/TeamInfo.tsx";

function App() {
  return (
    <div className={'text-white'}>
      <div className={'fixed top-0 left-0 right-0 z-50'}><Header /></div>
      <div className={'flex flex-1 pt-16 overflow-y-auto justify-center min-h-screen'} style={{backgroundColor: '#181818'}}>
        <Routes>
          <Route path={'/'} element={<Matches/>}/>
          <Route path={'/matches'} element={<Matches/>}/>
          <Route path={'standings'} element={<Standings/>}/>
          <Route path={'stats'} element={<Stats/>}/>
          <Route path={'teams'} element={<Teams/>}/>
          <Route path={'teamMatches'} element={<TeamMatches/>}/>
          <Route path={'teamInfo'} element={<TeamInfo/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
