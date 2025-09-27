import { useLocation, Navigate } from "react-router-dom";
import { Card } from "flowbite-react";

const TeamInfo = () => {
  const location = useLocation();
  const { team } = location.state || {};

  if (!team) {
    return <Navigate to="/teams" replace />;
  }

  return (
    <div className="min-h-screen p-4">
      <Card className="bg-gray-800 w-96 max-w-sm mt-6 mb-6">
        <img src={team.crest} alt={team.tla}/>
        <div className={'flex justify-center text-3xl'}>{team.name}</div>
      </Card>
    </div>
  );
};

export default TeamInfo;