import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Barcode } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onBarcodeSearch: (barcode: string) => void;
}

export function SearchBar({ onSearch, onBarcodeSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [barcode, setBarcode] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleBarcodeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onBarcodeSearch(barcode);
  };

  return (
    <div className="space-y-4 w-full">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>
      <form onSubmit={handleBarcodeSearch} className="flex gap-2">
        <Input
          placeholder="Enter barcode..."
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" variant="outline">
          <Barcode className="h-4 w-4 mr-2" />
          Search Barcode
        </Button>
      </form>
    </div>
  );
}