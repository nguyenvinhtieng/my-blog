"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown, PlusIcon } from "lucide-react";
import { useState } from "react";

export default function BlogList() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className=" space-y-2"
      >
        <div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
          Topic
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">Add</span>
          </Button>
        </div>
        <CollapsibleContent>
          Yes. Free to use for personal and commercial projects. No attribution
          required.
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
