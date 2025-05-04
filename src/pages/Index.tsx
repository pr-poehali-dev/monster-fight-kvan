
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-800">
        Битва Кланов
      </h1>
      <p className="text-lg text-center mb-8 max-w-md text-gray-700">
        Создайте свой клан, выберите расу лидера и сразитесь с монстрами в этой увлекательной игре!
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700 px-6 py-6 text-lg">
          <Link to="/clan-battle">
            <Icon name="Swords" className="mr-2 h-5 w-5" />
            Начать сражение
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
