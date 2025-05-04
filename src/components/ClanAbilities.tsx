
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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
  // Получение аватарки для расы капибара
  const getCapybaraAvatar = () => {
    // Случайный выбор одной из трех аватарок капибары
    const capybaraImages = [
      "https://cdn.poehali.dev/files/3e857d52-6a50-4fd0-89f7-0343baa91621.jpg",
      "https://cdn.poehali.dev/files/37fa74cc-047b-420b-96d1-0f271d1eca3a.jpeg",
      "https://cdn.poehali.dev/files/da837279-c45c-4019-bc37-52949b7d0ac2.jpg"
    ];
    
    const randomIndex = Math.floor(Math.random() * capybaraImages.length);
    return capybaraImages[randomIndex];
  };

  // Проверка, является ли лидер капибарой
  const isCapybara = clan.leaderRace.toLowerCase() === "капибара";
  
  return (
    <Card className="p-6 mb-6 bg-indigo-50">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          {isCapybara && (
            <Avatar className="mr-4 h-16 w-16 border-2 border-indigo-300">
              <AvatarImage src={getCapybaraAvatar()} alt="Аватар капибары" />
              <AvatarFallback>КП</AvatarFallback>
            </Avatar>
          )}
          <h2 className="text-xl font-semibold">Клан: {clan.name}</h2>
        </div>
        <Badge className={`${isCapybara ? 'bg-amber-600' : 'bg-indigo-600'}`}>
          {clan.leaderRace}
        </Badge>
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
          {isCapybara && (
            <li className="border-l-4 border-amber-500 pl-3 py-1 bg-amber-50">
              <span className="font-bold">Капибарская мудрость:</span> Когда впадаешь в ярость, противники получают на 20% больше урона, а ты восстанавливаешь 5 здоровья каждый ход
            </li>
          )}
        </ul>
      </div>
    </Card>
  );
};

export default ClanAbilities;
