import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import {apiUrl} from "../utils/helper.ts";

type StandingsType = {
  draw: number,
  form: null,
  goalDifference: number,
  goalsAgainst: number,
  goalsFor: number,
  lost: number,
  playedGames: number,
  points: number,
  position: number,
  won: number,
  team: {
    crest: string,
    id: number,
    name: string,
    shortName: string,
    tla: string,
  },
};

type StandingsResponse = {
  standingData: StandingsType[];
};

const Standings = () => {
  const [standings, setStandings] = useState<Array<StandingsType>>([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/getStandingData`)
      .then(res => res.json())
      .then((data: StandingsResponse) => setStandings(data.standingData));
  }, []);

  return (
    <div className="overflow-x-auto mt-10 mb-10 bg-gray-800">
      <Table>
        <TableHead className="bg-gray-700">
          <TableRow>
            <TableHeadCell>Club</TableHeadCell>
            <TableHeadCell className="font-medium dark:text-white">PTS</TableHeadCell>
            <TableHeadCell>W</TableHeadCell>
            <TableHeadCell>D</TableHeadCell>
            <TableHeadCell>L</TableHeadCell>
            <TableHeadCell>GF</TableHeadCell>
            <TableHeadCell>GA</TableHeadCell>
            <TableHeadCell>GD</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y !bg-gray-800">
          {
            standings?.map((standing: StandingsType, i: number) => {
              return (
                <TableRow key={i} className="!bg-gray-800 border-gray-700">
                  <TableCell className="flex content-center text-white">
                    <div className={'w-6 content-center'}>{standing.position}</div>
                    <div className={'w-15 content-center'}><img src={standing.team.crest} alt={standing.team.tla} className={'w-7 h-7'}/></div>
                    <div className="w-25 content-center font-medium dark:text-white"><Link to={`/teamMatches?teamCode=${standing.team.tla}`}>{standing.team.shortName}</Link></div>
                  </TableCell>
                  <TableCell className="font-medium text-white">{standing.points}</TableCell>
                  <TableCell className="text-white">{standing.won}</TableCell>
                  <TableCell className="text-white">{standing.draw}</TableCell>
                  <TableCell className="text-white">{standing.lost}</TableCell>
                  <TableCell className="text-white">{standing.goalsFor}</TableCell>
                  <TableCell className="text-white">{standing.goalsAgainst}</TableCell>
                  <TableCell className="text-white">{standing.goalDifference}</TableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default Standings;