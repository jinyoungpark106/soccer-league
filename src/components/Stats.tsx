import {useState, useEffect, useRef} from "react";
import { Card } from "flowbite-react";
import {apiUrl} from "../utils/helper.ts";

type ScorerType = {
  assists: number,
  goals: number,
  player: {name: string},
  team: {crest: string, shortName: string, tla: string},
};

const Stats = () => {
  const [scorers, setScorers] = useState<Array<ScorerType>>([]);
  const preGoalRef = useRef(0);
  const currentNoRef = useRef(0);

  useEffect(() => {
    fetch(`${apiUrl}/api/getStatData`)
      .then(res => res.json())
      .then(data => {
        setScorers(data?.statData?.scorers?? []);
      });
  }, []);

  return (
    <div className="min-h-screen p-4">
      <Card className="bg-gray-800 w-90 md:w-2xl mt-6 mb-6">
        <div className="mb-4">
          <h5 className="text-xl font-bold leading-none text-white">Goals</h5>
        </div>
        <div className="flow-root">
          <ul className="divide-y divide-gray-700">
            <li className="flex justify-between py-3 text-xs text-gray-400">
              <div className={'flex-2'}>player</div>
              <div className={'flex flex-1'}>
                <div className={'flex-1 flex justify-end'}>goals</div>
                <div className={'flex-1 flex justify-end'}>assists</div>
              </div>
            </li>
            {scorers?.map((scorer: ScorerType, i: number) => {
              currentNoRef.current = preGoalRef.current === scorer.goals ? currentNoRef.current : i + 1;
              preGoalRef.current = scorer.goals;
              return (
                <li key={i} className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4 justify-between">
                    <div className={'flex flex-2'}>
                      <div className="flex items-center">{currentNoRef.current}</div>
                      <div className="min-w-0 flex-1 ml-4">
                        <p className="truncate text-sm font-medium text-white">{scorer.player.name}</p>
                        <p className="flex items-center mt-1 text-xs text-gray-400">
                          <img src={scorer.team.crest} alt={scorer.team.tla} className={'w-4 h-4 mr-1'}/>
                          {scorer.team.shortName}
                        </p>
                      </div>
                    </div>
                    <div className={'flex flex-1 text-base font-semibold text-white'}>
                      <div className="flex-1 flex justify-end pr-1">{scorer.goals}</div>
                      <div className="flex-1 flex justify-end pr-1">{scorer.assists ?? 0}</div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default Stats;