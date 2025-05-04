
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Navigation = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  return (
    <div className="fixed top-4 left-4 z-50">
      {!isHomePage && (
        <Link to="/">
          <Button variant="outline" size="sm" className="bg-white bg-opacity-80 backdrop-blur-sm">
            <Icon name="Home" className="mr-2 h-4 w-4" />
            Главное меню
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Navigation;
