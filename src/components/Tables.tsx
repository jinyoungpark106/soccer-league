import {useEffect, useState} from "react";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";

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

const Tables = () => {
  const [standings, setStandings] = useState<Array<StandingsType>>([]);

  useEffect(() => {

  }, []);

  return (
    <div className="overflow-x-auto mt-10 mb-20">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Club</TableHeadCell>
            <TableHeadCell className="font-medium dark:text-white">PTS</TableHeadCell>
            <TableHeadCell>W</TableHeadCell>
            <TableHeadCell>D</TableHeadCell>
            <TableHeadCell>L</TableHeadCell>
            <TableHeadCell>GD</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
          {
            standings?.map((standing: StandingsType) => {
              return (
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="flex content-center">
                    <div className={'w-6 content-center'}>{standing.position}</div>
                    <div className={'w-15 content-center'}><img src={standing.team.crest} alt={standing.team.tla} className={'w-7 h-7'}/></div>
                    <div className="w-25 content-center font-medium dark:text-white">{standing.team.shortName}</div>
                  </TableCell>
                  <TableCell className="font-medium dark:text-white">{standing.points}</TableCell>
                  <TableCell>{standing.won}</TableCell>
                  <TableCell>{standing.draw}</TableCell>
                  <TableCell>{standing.lost}</TableCell>
                  <TableCell>{standing.goalDifference}</TableCell>
                </TableRow>
              );
            })
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default Tables;