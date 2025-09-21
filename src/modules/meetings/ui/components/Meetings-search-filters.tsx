import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";
import { DEFAULT_PAGE } from "@/constants";

export const MeetingsSearchFilter = () => {
  const [filters, setFilters] = useMeetingsFilter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      search: e.target.value,
      page: DEFAULT_PAGE,
    });
  };

  return (
    <div className="relative">
      <Input
        placeholder="Filter by name"
        className="h-9 bg-white w-[200px] pl-7"
        value={filters.search || ""}
        onChange={handleChange}
      />
      <SearchIcon className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
};