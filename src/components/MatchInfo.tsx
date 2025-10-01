import {useLocation, Navigate} from "react-router-dom";
import { Card } from "flowbite-react";
import {formatDate} from "../utils/helper.ts";

const teamStats: [string, number, number][] = [
  ['Shots', 0, 0],
  ['Shots on target', 0, 0],
  ['Possession', 0, 0],
  ['Passes', 0, 0],
  ['Pass accuracy', 0, 0],
  ['Fouls', 0, 0],
  ['Yellow cards', 0, 0],
  ['Red cards', 0, 0],
  ['Offsides', 0, 0],
  ['Corners', 0, 0],
];

const MatchInfo = () => {
  const location = useLocation();
  const { match } = location.state || {};

  if (!match) {
    return <Navigate to="/matches" replace />;
  }

  return (
    <div className="min-h-screen p-4 text-[13px] md:text-base">
      <Card className="bg-gray-800 w-90 md:w-2xl mt-6 mb-6">
        <div className={'flex flex-1 text-gray-400'}>
          <div className={'pr-2'}>{match.competition.name}</div> - <div className={'pl-2'}>{formatDate(match.utcDate)}</div>
        </div>
        <div className={'flex flex-1'}>
          <div className="flex flex-1 justify-center">
            <img src={match.homeTeam.crest} alt={match.homeTeam.tla} className="w-15 h-15"/>
          </div>
          <div className="flex flex-1 items-center">
            <div className={'flex-1 text-left text-4xl'}>{match.score.fullTime.home}</div>
            <div className={'flex-1 text-center text-4xl text-gray-400'}>-</div>
            <div className={'flex-1 text-right text-4xl'}>{match.score.fullTime.away}</div>
          </div>
          <div className="flex flex-1 justify-center">
            <img src={match.awayTeam.crest} alt={match.awayTeam.tla} className="w-15 h-15"/>
          </div>
        </div>
        <div className={'flex flex-1'}>
          <div className={'flex-1 text-center'}>{match.homeTeam.shortName}</div>
          <div className="flex-1"/>
          <div className={'flex-1 text-center'}>{match.awayTeam.shortName}</div>
        </div>
        <div className={'flex flex-1 text-gray-400'}>
          <div className={'flex flex-1 justify-start'}><img src={match.homeTeam.crest} alt={match.homeTeam.tla} className="w-5 h-5"/></div>
          <div className={'flex flex-1 justify-center'}>TEAM STATS</div>
          <div className={'flex flex-1 justify-end'}><img src={match.awayTeam.crest} alt={match.awayTeam.tla} className="w-5 h-5"/></div>
        </div>
        {teamStats.map((team) => {
          return (
            <div className={'flex flex-1 text-gray-400'}>
              <div className={'flex flex-1 justify-start pl-1'}>{team[1]}</div>
              <div className={'flex flex-1 justify-center'}>{team[0]}</div>
              <div className={'flex flex-1 justify-end pr-1'}>{team[2]}</div>
            </div>
          );
        })}
      </Card>
    </div>
  );
};

export default MatchInfo;