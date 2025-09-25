import {useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "flowbite-react";

type MatchType = {
  awayTeam: {crest: string, shortName: string, tla: string},
  competition: {name: string},
  homeTeam: {crest: string, shortName: string, tla: string},
  matchday: number,
  score: {fullTime: {away: number, home: number}},
  utcDate: Date,
};

const TeamMatches = () => {
  const [matches, setMatches] = useState<Array<MatchType>>([]);
  const [searchParams] = useSearchParams();
  const teamCode = searchParams.get("teamCode");
  const printedRounds = new Set<number>();

  useEffect(() => {
    // fetch('http://localhost:3000/api/getMatchData')
      fetch('https://soccer-league-nine.vercel.app/api/getMatchData')
      .then(res => res.json())
      .then(data => {
        console.log(data.detail.matches);
        setMatches(data?.detail?.matches ?? []);
      });
  }, [teamCode]);

  return (
    <div className="min-h-screen p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {matches.map((match: MatchType, i: number) => {
          const matchDate = new Date(match.utcDate).toLocaleString();
          const showRound = !printedRounds.has(match.matchday);

          if (showRound) {
            printedRounds.add(match.matchday);
          }

          return (
            <div key={i}>
              {showRound ? <div className="font-bold mt-4">ROUND {match.matchday}</div> : i%10 === 1 && <div className="h-10"/>}
              <Card href="#" className="w-96 h-35 max-w-sm mt-2">
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
                  <div className="flex-1 text-sm font-medium">{matchDate}</div>
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