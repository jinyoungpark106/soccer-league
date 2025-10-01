import React, {useState, useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import { Card } from "flowbite-react";
import {apiUrl, formatDate} from "../utils/helper.ts";
import type {MatchType} from "./Matches.tsx";

const TeamMatches = () => {
  const [matches, setMatches] = useState<Array<MatchType>>([]);
  const [searchParams] = useSearchParams();
  const teamCode = searchParams.get("teamCode");
  const navigate = useNavigate();

  const onClickMatch = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
    const selectedMatch = matches.filter(match => match.id === id);
    navigate("/matchInfo", {state: {match: selectedMatch[0]}});
  };

  useEffect(() => {
    fetch(`${apiUrl}/api/getTeamMatchData?teamCode=${teamCode}`)
      .then(res => res.json())
      .then(data => {
        setMatches(data?.matchData?.matches ?? []);
      });
  }, [teamCode]);

  return (
    <div className="min-h-screen p-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {matches.map((match: MatchType, i: number) => {
          const matchDate = formatDate(match.utcDate);
          return (
            <Card
              key={i}
              onClick={(e) => onClickMatch(e, match.id)}
              className="bg-gray-800 w-90 h-35 max-w-sm mt-2 ml-1 mr-1"
            >
              <div className={'flex justify-between items-center'}>
                <div className={'text-gray-400'}>Matchday {match.matchday}</div>
                <div className={'text-sm text-gray-400'}>{match.competition.name}</div>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <div className="flex flex-2 flex-col gap-1">
                  <div className={'flex'}>
                    <img src={match.homeTeam.crest} alt={match.homeTeam.tla} className={'w-7 h-7 mr-2'}/>
                    <div className={'flex-2'}>{match.homeTeam.shortName}</div>
                    <div className={'flex-1 items-end'}>{match.score.fullTime.home}</div>
                  </div>
                  <div className={'flex'}>
                    <img src={match.awayTeam.crest} alt={match.awayTeam.tla} className={'w-7 h-7 mr-2'}/>
                    <div className={'flex-2'}>{match.awayTeam.shortName}</div>
                    <div className={'flex-1 items-end'}>{match.score.fullTime.away}</div>
                  </div>
                </div>
                <div className="flex-1 text-xs font-medium">{matchDate}</div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TeamMatches;