import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import {apiUrl} from "../utils/helper.ts";

export type TeamType = {
  id: number,
  crest: string,
  founded: {crest: string, shortName: string, tla: string},
  name: string,
  shortName: string,
  coach: {name: string, nationality: string, dateOfBirth: string},
  squad: Array<SquadType>,
  tla: string,
  venue: string,
  website: string,
};

export type SquadType = {
  dateOfBirth: string,
  name:string,
  nationality: string,
  position: string,
};

const Teams = () => {
  const [teams, setTeams] = useState<Array<TeamType>>([]);
  const navigate = useNavigate();

  const onClickTeam = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
    const selectedTeam = teams.filter(team => team.id === id);
    navigate("/teamInfo", {state: {team: selectedTeam[0]}});
  };

  useEffect(() => {
    fetch(`${apiUrl}/api/getTeamData`)
      .then(res => res.json())
      .then(data => {
        setTeams(data?.teamData?.teams ?? []);
      });
  }, []);

  return (
    <div className="min-h-screen p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mt-4 mb-4">
        {teams.map((team: TeamType, i: number) => {
          return (
            <div key={i}>
              <Card
                onClick={(e) => onClickTeam(e, team.id)}
                className="flex items-center w-43 h-43 bg-gray-800 max-w-sm mt-1 mb-1 ml-1 mr-1 p-2 cursor-pointer hover:bg-gray-700"
              >
                <img src={team.crest} alt={team.tla}/>
                <div className={'flex justify-center'}>{team.shortName}</div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Teams;