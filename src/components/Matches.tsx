import {useState, useEffect} from "react";
import { Dropdown, DropdownItem, Card } from "flowbite-react";
import {teamLogo, teams} from "../utils/helper";

type MatchType = {
  MatchNumber: number,
  RoundNumber: number,
  DateUtc: string,
  Location: string,
  HomeTeam: string,
  AwayTeam: string,
  Group: null,
  HomeTeamScore: null,
  AwayTeamScore: null
}

const Matches = () => {
  const [matches, setMatches] = useState<Array<MatchType>>([]);
  const [selectedTeam, setSelectedTeam] = useState('liverpool');

  useEffect(() => {
    fetch("http://localhost:3000/api/getMatchData")
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);

  return (
    <div className="min-h-screen p-4">
      <Dropdown label={teams[selectedTeam]} className={'w-96'}>
        {
          Object.keys(teamLogo).map((key) => {
            return (
              <DropdownItem key={key} onClick={() => setSelectedTeam(teamLogo[key][0])}>{key}</DropdownItem>
            );
          })
        }
      </Dropdown>
      {matches.map((match: MatchType, i: number) => {
        const homeLogo = teamLogo[match.HomeTeam][1];
        const awayLogo = teamLogo[match.AwayTeam][1];
        const matchDate = new Date(match.DateUtc.replace(" ", "T")).toLocaleString();
        return (
          <Card key={i} href="#" className="w-96 h-35 max-w-sm mt-2">
            <div>ROUND {match.RoundNumber}</div>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex flex-2 flex-col gap-1">
                <div className={'flex'}>
                  <img src={`/images/${homeLogo}`} alt={homeLogo} className={'w-7 h-7 mr-2'}/>
                  <div className={'flex-2'}>{match.HomeTeam}</div>
                  <div className={'flex-1 items-end'}>{match.HomeTeamScore}</div>
                </div>
                <div className={'flex'}>
                  <img src={`/images/${awayLogo}`} alt={awayLogo} className={'w-7 h-7 mr-2'}/>
                  <div className={'flex-2'}>{match.AwayTeam}</div>
                  <div className={'flex-1 items-end'}>{match.AwayTeamScore}</div>
                </div>
              </div>
              <div className="flex-1 text-sm font-medium">{matchDate}</div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Matches;