
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

interface ClanStats {
  name: string;
  strength: number;
  defense: number;
  health: number;
  description: string;
  leaderRace: string;
}

interface Monster {
  name: string;
  type: string;
  strength: number;
  defense: number;
  health: number;
  maxHealth: number;
  image: string;
}

interface MonsterBattleProps {
  clan: ClanStats;
  abilities: string[];
}

const MonsterBattle = ({ clan, abilities }: MonsterBattleProps) => {
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [currentMonster, setCurrentMonster] = useState<Monster>({
    name: "Гоблин-разведчик",
    type: "гуманоид",
    strength: 40,
    defense: 20,
    health: 80,
    maxHealth: 80,
    image: "https://images.unsplash.com/photo-1542623024-a797a755b8d0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  });
  
  const [clanCurrentHealth, setClanCurrentHealth] = useState(clan.health);
  const [battleEnded, setBattleEnded] = useState(false);
  const [roundCount, setRoundCount] = useState(0);
  const [isCapybaraRage, setIsCapybaraRage] = useState(false);
  
  const monsters = [
    {
      name: "Гоблин-разведчик",
      type: "гуманоид",
      strength: 40,
      defense: 20,
      health: 80,
      maxHealth: 80,
      image: "https://images.unsplash.com/photo-1542623024-a797a755b8d0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      name: "Горный тролль",
      type: "гигант",
      strength: 70,
      defense: 40,
      health: 150,
      maxHealth: 150,
      image: "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7a9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      name: "Древний дракон",
      type: "дракон",
      strength: 100,
      defense: 80,
      health: 300,
      maxHealth: 300,
      image: "https://images.unsplash.com/photo-1577493340887-b7bfff550145?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    }
  ];

  // Проверка, является ли лидер капибарой
  const isCapybara = clan.leaderRace.toLowerCase() === "капибара";

  useEffect(() => {
    // Если здоровье клана меньше 30%, и лидер - капибара, активируем ярость
    if (isCapybara && clanCurrentHealth < clan.health * 0.3 && !isCapybaraRage) {
      setIsCapybaraRage(true);
      setBattleLog(prev => [...prev, "🌊 КАПИБАРСКАЯ ЯРОСТЬ АКТИВИРОВАНА! Урон увеличен на 20%, восстановление 5 здоровья каждый ход!"]);
    }
  }, [clanCurrentHealth, clan.health, isCapybara, isCapybaraRage]);

  const attack = () => {
    if (battleEnded) return;
    
    setRoundCount(roundCount + 1);
    const newLog = [...battleLog];
    
    // Рассчет урона клана по монстру
    let clanDamage = Math.max(5, clan.strength - currentMonster.defense / 2);
    
    // Применение эффектов способностей
    const abilityText = abilities.join(' ').toLowerCase();
    
    // Капибарская ярость
    if (isCapybara && isCapybaraRage) {
      clanDamage *= 1.2; // +20% к урону
      setClanCurrentHealth(prev => Math.min(clan.health, prev + 5)); // Восстановление 5 здоровья
      newLog.push(`🌊 Капибара восстанавливает 5 здоровья благодаря ярости!`);
    }
    
    // Водная адаптация капибар
    if (isCapybara && abilityText.includes("водная адаптация")) {
      clanDamage *= 1.1; // +10% к урону благодаря ускоренной атаке
    }
    
    if (abilityText.includes("критическ") && Math.random() < 0.2) {
      clanDamage *= 2;
      newLog.push(`🔥 КРИТИЧЕСКИЙ УДАР! Клан ${clan.name} наносит ${clanDamage.toFixed(0)} урона!`);
    } else {
      newLog.push(`Клан ${clan.name} атакует и наносит ${clanDamage.toFixed(0)} урона.`);
    }
    
    // Снижение здоровья монстра
    const newMonsterHealth = Math.max(0, currentMonster.health - clanDamage);
    setCurrentMonster({...currentMonster, health: newMonsterHealth});
    
    // Проверка победы над монстром
    if (newMonsterHealth <= 0) {
      newLog.push(`🎉 Монстр ${currentMonster.name} побежден!`);
      
      // Выбор следующего монстра
      const nextMonsterIndex = monsters.findIndex(m => m.name === currentMonster.name) + 1;
      
      if (nextMonsterIndex < monsters.length) {
        const nextMonster = monsters[nextMonsterIndex];
        newLog.push(`😱 Появляется новый противник: ${nextMonster.name}!`);
        setCurrentMonster(nextMonster);
      } else {
        newLog.push(`🏆 Поздравляем! Клан ${clan.name} победил всех монстров!`);
        setBattleEnded(true);
      }
      
      setBattleLog(newLog);
      return;
    }
    
    // Атака монстра
    const monsterDamage = Math.max(5, currentMonster.strength - clan.defense / 2);
    
    // Защитные способности
    let actualDamage = monsterDamage;
    if (abilityText.includes("снижает входящий урон")) {
      actualDamage = monsterDamage * 0.8;
      newLog.push(`🛡️ Способность "Каменная кожа" снижает урон от монстра!`);
    }
    
    // Уклонение капибар
    if (isCapybara && abilityText.includes("водная адаптация") && Math.random() < 0.15) {
      actualDamage = 0;
      newLog.push(`🌊 Капибара уклоняется от атаки!`);
    }
    
    if (actualDamage > 0) {
      newLog.push(`${currentMonster.name} атакует и наносит ${actualDamage.toFixed(0)} урона.`);
    }
    
    // Контратака от способностей
    if (abilityText.includes("наносит") && abilityText.includes("атакующим")) {
      const counterDamage = 10;
      newLog.push(`⚡ Контратака! Монстр получает ${counterDamage} урона от ауры клана.`);
      setCurrentMonster({...currentMonster, health: Math.max(0, newMonsterHealth - counterDamage)});
    }
    
    // Обновление здоровья клана
    const newClanHealth = Math.max(0, clanCurrentHealth - actualDamage);
    setClanCurrentHealth(newClanHealth);
    
    // Проверка поражения клана
    if (newClanHealth <= 0) {
      newLog.push(`😢 Клан ${clan.name} потерпел поражение!`);
      setBattleEnded(true);
    }
    
    setBattleLog(newLog);
  };
  
  const restartBattle = () => {
    setBattleLog([]);
    setCurrentMonster(monsters[0]);
    setClanCurrentHealth(clan.health);
    setBattleEnded(false);
    setRoundCount(0);
    setIsCapybaraRage(false);
  };

  return (
    <Card className="p-6 mb-6 bg-slate-50">
      <h2 className="text-xl font-semibold mb-4">Арена сражений</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="text-center">
          <h3 className="font-bold mb-2">
            Клан: {clan.name}
            {isCapybaraRage && <span className="ml-2 text-amber-600">🌊 В ЯРОСТИ!</span>}
          </h3>
          <Progress 
            value={(clanCurrentHealth / clan.health) * 100} 
            className={`h-2 mb-1 ${isCapybara ? 'bg-amber-100' : ''}`} 
            indicatorClassName={isCapybaraRage ? 'bg-amber-500' : ''}
          />
          <p className="text-sm mb-4">Здоровье: {clanCurrentHealth}/{clan.health}</p>
          
          <div className={`p-3 rounded-md mb-2 ${isCapybara ? 'bg-amber-100' : 'bg-indigo-100'}`}>
            <p className="font-semibold">⚔️ Сила атаки: {clan.strength}{isCapybaraRage ? ' (+20%)' : ''}</p>
            <p className="font-semibold">🛡️ Защита: {clan.defense}</p>
            {isCapybara && <p className="font-semibold">🌊 Раса лидера: Капибара</p>}
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="font-bold mb-2">Монстр: {currentMonster.name}</h3>
          <Progress value={(currentMonster.health / currentMonster.maxHealth) * 100} className="h-2 mb-1" />
          <p className="text-sm mb-2">Здоровье: {currentMonster.health}/{currentMonster.maxHealth}</p>
          
          <div className="p-3 bg-red-100 rounded-md mb-2">
            <p className="font-semibold">⚔️ Сила атаки: {currentMonster.strength}</p>
            <p className="font-semibold">🛡️ Защита: {currentMonster.defense}</p>
            <p className="font-semibold">🧩 Тип: {currentMonster.type}</p>
          </div>
          
          <img 
            src={currentMonster.image} 
            alt={currentMonster.name} 
            className="w-full h-40 object-cover rounded-md"
          />
        </div>
      </div>
      
      <div className="flex gap-4 mb-6">
        <Button 
          onClick={attack} 
          disabled={battleEnded}
          className={`flex-1 ${isCapybara ? 'bg-amber-600 hover:bg-amber-700' : 'bg-red-600 hover:bg-red-700'}`}
        >
          <Icon name="Swords" className="mr-2" />
          Атаковать
        </Button>
        
        <Button 
          onClick={restartBattle} 
          variant="outline"
          className="flex-1"
        >
          <Icon name="RefreshCw" className="mr-2" />
          Начать заново
        </Button>
      </div>
      
      <Separator className="my-4" />
      
      <div>
        <h3 className="font-semibold mb-2 flex items-center">
          <Icon name="ScrollText" className="mr-2" />
          Журнал сражения {roundCount > 0 ? `(Раунд ${roundCount})` : ""}
        </h3>
        <div className="bg-slate-100 p-3 rounded-md h-40 overflow-y-auto">
          {battleLog.length === 0 ? (
            <p className="text-center text-gray-500 italic">Нажмите кнопку "Атаковать", чтобы начать сражение</p>
          ) : (
            <ul className="space-y-1">
              {battleLog.map((log, index) => (
                <li key={index} className={`text-sm ${
                  log.includes("побежден") || log.includes("победил") 
                    ? "font-bold text-green-600" 
                    : log.includes("поражение") 
                      ? "font-bold text-red-600" 
                      : log.includes("КАПИБАРСКАЯ ЯРОСТЬ") || log.includes("Капибара")
                        ? "font-bold text-amber-600"
                        : ""
                }`}>
                  {log}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MonsterBattle;
