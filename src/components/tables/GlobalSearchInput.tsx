import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface GlobalSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const GlobalSearchInput: React.FC<GlobalSearchInputProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="relative max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
      <Input
        placeholder="Search..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="pl-10"
      />
    </div>
  );
};

export default GlobalSearchInput;
