import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SortFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function SortFilter({ value, onChange }: SortFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="name-asc">Name (A-Z)</SelectItem>
        <SelectItem value="name-desc">Name (Z-A)</SelectItem>
        <SelectItem value="grade-asc">Grade (Best first)</SelectItem>
        <SelectItem value="grade-desc">Grade (Worst first)</SelectItem>
      </SelectContent>
    </Select>
  );
}