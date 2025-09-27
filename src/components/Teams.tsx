import {useState, useEffect} from "react";
import { Card } from "flowbite-react";
import {apiUrl} from "../utils/helper.ts";

type TeamType = {
  coach: {name: string},
  crest: string,
  founded: {crest: string, shortName: string, tla: string},
  name: string,
  shortName: string,
  squad: Array<SquadType>,
  tla: string,
  venue: string,
};

type SquadType = {
  dateOfBirth: string,
  name:string,
  nationality: string,
  position: string,
};

const Teams = () => {
  const [teams, setTeams] = useState<Array<TeamType>>([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/getTeamData`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setTeams(data?.teamData?.teams ?? []);
      });
  }, []);

  return (
    <div className="min-h-screen p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mt-4 mb-4">
        {teams.map((team: TeamType, i: number) => {
          return (
            <div key={i}>
              <Card href="#" className="flex items-center w-45 h-45 bg-gray-800 max-w-sm mt-1 mb-1 ml-1 mr-1 p-2">
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