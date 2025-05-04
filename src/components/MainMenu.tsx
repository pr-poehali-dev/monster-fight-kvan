
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

interface GameMode {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  enabled: boolean;
}

const MainMenu = () => {
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  
  const gameModes: GameMode[] = [
    {
      id: "clan-battle",
      title: "Битва кланов",
      description: "Создайте свой клан и сразитесь с монстрами. Выберите расу лидера и настройте характеристики.",
      icon: "Swords",
      path: "/clan-battle",
      enabled: true
    },
    {
      id: "clan-wars",
      title: "Война кланов",
      description: "Сразитесь с другими кланами за территорию и ресурсы. Создавайте альянсы и разрабатывайте стратегии.",
      icon: "Shield",
      path: "/clan-wars",
      enabled: false
    },
    {
      id: "clan-builder",
      title: "Конструктор кланов",
      description: "Расширенный редактор для создания уникальных кланов с особыми навыками и историей.",
      icon: "Hammer",
      path: "/clan-builder",
      enabled: false
    }
  ];
  
  const handleModeSelect = (mode: GameMode) => {
    setSelectedMode(mode);
  };
  
  const capybaraQuotes = [
    "Капибары всегда побеждают!",
    "Выбирай капибару — выбирай победу!",
    "С капибарой бесконечные возможности!"
  ];
  
  const randomCapybaraQuote = capybaraQuotes[Math.floor(Math.random() * capybaraQuotes.length)];
  
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card className="w-full p-8 bg-gradient-to-br from-indigo-50 to-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Мир Кланов</h1>
          <p className="text-lg text-gray-600">Создавай. Сражайся. Побеждай.</p>
          <div className="text-amber-600 font-bold mt-2 text-sm animate-pulse">
            {randomCapybaraQuote}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {gameModes.map((mode) => (
            <Card 
              key={mode.id}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md flex flex-col h-full
                ${mode.enabled ? 'bg-white' : 'bg-gray-100 opacity-70'}`}
              onClick={() => mode.enabled && handleModeSelect(mode)}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold">{mode.title}</h3>
                <Icon name={mode.icon as any} className={`${mode.enabled ? 'text-indigo-600' : 'text-gray-400'}`} />
              </div>
              <p className="text-sm text-gray-600 mb-3 flex-grow">{mode.description}</p>
              
              {mode.enabled ? (
                <Link to={mode.path} className="w-full">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                    Играть
                    <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Button disabled className="w-full bg-gray-300 cursor-not-allowed">
                  Скоро
                  <Icon name="Lock" className="ml-2 h-4 w-4" />
                </Button>
              )}
            </Card>
          ))}
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Icon name="Info" className="mr-2 h-4 w-4" />
                  Об игре
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>О игре "Мир Кланов"</DialogTitle>
                  <DialogDescription>
                    Версия: 1.0.0 (Бета)
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="mb-4">
                    "Мир Кланов" - это игра о создании и развитии кланов в фэнтезийном мире. 
                    Создавайте уникальные кланы, выбирайте расу лидера и сражайтесь с монстрами.
                  </p>
                  <p className="text-amber-600 font-bold">
                    Совет: Капибары получают особые бонусы и имеют бесконечное здоровье!
                  </p>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button>Закрыть</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Icon name="Settings" className="mr-2 h-4 w-4" />
                  Настройки
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Настройки</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-gray-500 italic">
                    Настройки будут доступны в следующем обновлении.
                  </p>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button>Закрыть</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div>
            <p className="text-sm text-gray-500">©2025 Мир Кланов</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MainMenu;
