
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ClanStats {
  name: string;
  strength: number;
  defense: number;
  health: number;
  description: string;
  leaderRace: string;
}

interface ClanAbilitiesProps {
  abilities: string[];
  clan: ClanStats;
}

const ClanAbilities = ({ abilities, clan }: ClanAbilitiesProps) => {
  return (
    <Card className="p-6 mb-6 bg-indigo-50">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Клан: {clan.name}</h2>
        <Badge className="bg-indigo-600">{clan.leaderRace}</Badge>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
        <div>
          <p className="text-gray-600">Сила</p>
          <p className="text-xl font-bold">{clan.strength}</p>
        </div>
        <div>
          <p className="text-gray-600">Защита</p>
          <p className="text-xl font-bold">{clan.defense}</p>
        </div>
        <div>
          <p className="text-gray-600">Здоровье</p>
          <p className="text-xl font-bold">{clan.health}</p>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Описание:</h3>
        <p className="text-gray-700 italic">{clan.description}</p>
      </div>
      
      <div>
        <h3 className="font-semibold mb-2">Способности:</h3>
        <ul className="space-y-2">
          {abilities.map((ability, index) => {
            const [name, description] = ability.split(': ');
            return (
              <li key={index} className="border-l-4 border-indigo-500 pl-3 py-1">
                <span className="font-bold">{name}:</span> {description}
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
};

export default ClanAbilities;
