import React, {useState, useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import { Card } from "flowbite-react";
import {apiUrl, formatDate} from "../utils/helper.ts";

export type MatchType = {
  id: number,
  awayTeam: {crest: string, shortName: string, tla: string},
  competition: {name: string, code: string},
  homeTeam: {crest: string, shortName: string, tla: string},
  matchday: number,
  score: {fullTime: {away: number, home: number}},
  utcDate: Date,
};

const TeamMatches = () => {
  const [matches, setMatches] = useState<Array<MatchType>>([]);
  const [searchParams] = useSearchParams();
  const teamCode = searchParams.get("teamCode");
  const printedMatchdays = new Set<number>();
  const navigate = useNavigate();

  const onClickMatch = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
    const selectedMatch = matches.filter(match => match.id === id);
    navigate("/matchInfo", {state: {match: selectedMatch[0]}});
  };

  useEffect(() => {
      fetch(`${apiUrl}/api/getMatchData`)
      .then(res => res.json())
      .then(data => {
        setMatches(data?.matchData?.matches ?? []);
      });
  }, [teamCode]);

  return (
    <div className="min-h-screen p-4">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {matches.map((match: MatchType, i: number) => {
          const matchDate = formatDate(match.utcDate);
          const showMatchday = !printedMatchdays.has(match.matchday);

          if (showMatchday) {
            printedMatchdays.add(match.matchday);
          }

          return (
            <div key={i}>
              {showMatchday ?
                <div className="font-bold mt-4 text-gray-400 ml-4">Matchday {match.matchday}</div> :
                i%10 === 1 && <div className="hidden md:block h-10"/>}
              <Card
                onClick={(e) => onClickMatch(e, match.id)}
                className="bg-gray-800 w-90 h-35 max-w-sm mt-2 ml-1 mr-1 cursor-pointer hover:bg-gray-700"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex flex-2 flex-col gap-1">
                    <div className={'flex'}>
                      <img src={match.homeTeam.crest} alt={match.homeTeam.tla} className={'w-7 h-7 mr-2'}/>
                      <div className={'flex-3'}>{match.homeTeam.shortName}</div>
                      <div className={'flex-1 items-end'}>{match.score.fullTime.home}</div>
                    </div>
                    <div className={'flex'}>
                      <img src={match.awayTeam.crest} alt={match.awayTeam.tla} className={'w-7 h-7 mr-2'}/>
                      <div className={'flex-3'}>{match.awayTeam.shortName}</div>
                      <div className={'flex-1 items-end'}>{match.score.fullTime.away}</div>
                    </div>
                  </div>
                  <div className="flex-1 text-xs font-medium">{matchDate}</div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamMatches;