
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ClanAbilities from "@/components/ClanAbilities";
import MonsterBattle from "@/components/MonsterBattle";

interface ClanStats {
  name: string;
  strength: number;
  defense: number;
  health: number;
  description: string;
  leaderRace: string;
}

const ClanBattle = () => {
  const [clanStats, setClanStats] = useState<ClanStats>({
    name: "",
    strength: 50,
    defense: 30,
    health: 100,
    description: "",
    leaderRace: ""
  });

  const [abilities, setAbilities] = useState<string[]>([]);
  const [showBattle, setShowBattle] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClanStats({
      ...clanStats,
      [name]: name === "strength" || name === "defense" || name === "health" 
        ? parseInt(value) || 0 
        : value
    });
  };

  const generateAbilities = () => {
    // Базовые способности на основе расы лидера
    const raceBasedAbilities: Record<string, string> = {
      "эльф": "Точный выстрел: +20% к критическому урону против летающих монстров",
      "гном": "Подземная ярость: +25% к защите против подземных монстров",
      "человек": "Адаптивная тактика: +15% ко всем характеристикам в длительных сражениях",
      "орк": "Боевой клич: Снижает защиту монстров на 15%",
      "дварф": "Каменная кожа: Снижает входящий урон на 20%",
      "ящер": "Ядовитая кровь: Наносит 10 урона атакующим монстрам",
      "капибара": "Водная адаптация: +30% к скорости атаки и 15% к уклонению"
    };

    // Анализ описания клана для генерации контекстных способностей
    let descriptionAbility = "Уникальная тактика: ";
    
    if (clanStats.description.toLowerCase().includes("огонь") || clanStats.description.toLowerCase().includes("пламя")) {
      descriptionAbility += "Огненная аура: Наносит 15 урона всем атакующим монстрам";
    } else if (clanStats.description.toLowerCase().includes("лед") || clanStats.description.toLowerCase().includes("холод")) {
      descriptionAbility += "Ледяная защита: Замораживает атакующих монстров, снижая их скорость на 30%";
    } else if (clanStats.description.toLowerCase().includes("свет") || clanStats.description.toLowerCase().includes("святой")) {
      descriptionAbility += "Божественное благословение: Лечит 10 единиц здоровья после каждого боя";
    } else if (clanStats.description.toLowerCase().includes("тьма") || clanStats.description.toLowerCase().includes("тени")) {
      descriptionAbility += "Теневой удар: 25% шанс нанести двойной урон";
    } else {
      descriptionAbility += "Сплоченность: +10% ко всем характеристикам";
    }

    // Генерация способности на основе силы клана
    const strengthAbility = clanStats.strength > 70 
      ? "Сокрушительный удар: 30% шанс оглушить монстра на один ход" 
      : "Точный удар: +15% к точности атаки";

    // Получение способности на основе расы лидера
    const raceAbility = raceBasedAbilities[clanStats.leaderRace.toLowerCase()] || 
      "Лидерство: Усиливает все характеристики клана на 10%";

    setAbilities([raceAbility, descriptionAbility, strengthAbility]);
    setShowBattle(true);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Создание боевого клана</h1>
      
      <Card className="p-6 mb-6 bg-slate-50">
        <h2 className="text-xl font-semibold mb-4">Статистика клана</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2">Название клана</label>
            <Input 
              name="name" 
              value={clanStats.name} 
              onChange={handleInputChange} 
              placeholder="Введите название клана"
              className="mb-4"
            />
            
            <label className="block mb-2">Сила</label>
            <Input 
              type="number" 
              name="strength" 
              value={clanStats.strength} 
              onChange={handleInputChange}
              min="1"
              max="100"
              className="mb-4"
            />
            
            <label className="block mb-2">Защита</label>
            <Input 
              type="number" 
              name="defense" 
              value={clanStats.defense} 
              onChange={handleInputChange}
              min="1"
              max="100"
              className="mb-4"
            />
            
            <label className="block mb-2">Здоровье</label>
            <Input 
              type="number" 
              name="health" 
              value={clanStats.health} 
              onChange={handleInputChange}
              min="1"
              max="1000"
              className="mb-4"
            />
          </div>
          
          <div>
            <label className="block mb-2">Раса лидера</label>
            <Input 
              name="leaderRace" 
              value={clanStats.leaderRace} 
              onChange={handleInputChange} 
              placeholder="Например: эльф, гном, человек, орк, капибара"
              className="mb-4"
            />
            
            <label className="block mb-2">Описание клана</label>
            <Textarea 
              name="description" 
              value={clanStats.description} 
              onChange={handleInputChange} 
              placeholder="Опишите ваш клан, его историю и особенности..."
              className="h-40"
            />
            
            {clanStats.leaderRace.toLowerCase() === "капибара" && (
              <div className="mt-4 p-3 bg-amber-100 rounded-md">
                <p className="text-sm text-amber-800">
                  <span className="font-bold">Капибары особенные!</span> Они получают особые бонусы и уникальную аватарку.
                </p>
              </div>
            )}
          </div>
        </div>
        
        <Button 
          onClick={generateAbilities} 
          className={`w-full mt-2 ${clanStats.leaderRace.toLowerCase() === "капибара" ? "bg-amber-600 hover:bg-amber-700" : "bg-indigo-600 hover:bg-indigo-700"}`}
          disabled={!clanStats.name || !clanStats.leaderRace || !clanStats.description}
        >
          Сгенерировать способности
        </Button>
      </Card>
      
      {showBattle && (
        <>
          <ClanAbilities abilities={abilities} clan={clanStats} />
          <MonsterBattle clan={clanStats} abilities={abilities} />
        </>
      )}
    </div>
  );
};

export default ClanBattle;
