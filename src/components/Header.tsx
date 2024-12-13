import { Link } from "react-router-dom";
import { CartButton } from "./CartButton";
import { Apple } from "lucide-react";

export function Header() {
  return (
    <header className="border-b w-full">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
          <Apple className="h-6 w-6" />
          <span>Food Explorer</span>
        </Link>
          <CartButton />
        
      </div>
    </header>
  );
}
