"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

const SearchInput = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="flex w-full max-w-sm ">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search here..."
        className={cn(
          "transition-all duration-300  border border-muted rounded-md rounded-r-none focus: outline-none px-1.5 border-r-0",
          query ? "w-72" : "w-40 focus:w-72 text-sm "
        )}
      />
      <Button
        type="button"
        variant="default"
        className="rounded-l-none bg-muted text-white cursor-pointer hover:bg-muted-foreground"
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SearchInput;
