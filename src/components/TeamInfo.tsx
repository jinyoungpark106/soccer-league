import { useEffect } from "react";
import {useLocation, Navigate} from "react-router-dom";
import { Card } from "flowbite-react";
import type {SquadType} from "./Teams.tsx";

const TeamInfo = () => {
  const location = useLocation();
  const { team } = location.state || {};

  if (!team) {
    return <Navigate to="/teams" replace />;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen p-4">
      <Card className="bg-gray-800 w-90 md:w-2xl mt-6 mb-6">
        <div className="flex flex-col items-center">
          <a href={team.website} target="_blank" rel="noopener noreferrer">
            <img src={team.crest} alt={team.tla} className="w-45 h-45 mb-4"/>
          </a>
          <div className={'text-center text-3xl'}>
            <a href={team.website} target="_blank" rel="noopener noreferrer">{team.name}</a>
          </div>
          <div className={'text-center text-gray-400'}>{team.venue}</div>
          <div className="flow-root text-xs text-gray-400 mt-5 w-full">
            <ul className="list-disc pl-5 mt-5">
              <li>
                <span>Coach - </span>{team.coach.name}
              </li>
            </ul>
            <ul className="divide-y divide-gray-700 mt-5">
              <li className="py-3">
                <div>Squad</div>
              </li>
              {team?.squad?.map((squad: SquadType, i: number) => {
                return (
                  <li key={i} className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 md:flex-2">{squad.name}</div>
                      <div className="flex-1">{squad.position}</div>
                      <div className="flex-1">{squad.dateOfBirth}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TeamInfo;