"use client";

import { useState } from "react";
import { Check, ChevronDown, Plus } from "lucide-react";
import { Logo } from "@/components/logo";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const organizations = [
  { id: 1, name: "Monsters Inc." },
  { id: 2, name: "Acme Corp" },
  { id: 3, name: "Stark Industries" },
];

const projects = [
  { id: 1, name: "Remote Sensing Dashboard" },
  { id: 2, name: "Satellite Imagery Analysis" },
  { id: 3, name: "Land Cover Classification" },
];

export function TopNav() {
  const [openOrg, setOpenOrg] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(organizations[0]);
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center">
        <div className="border-r border-border/40 h-full flex items-center">
          <Logo />
        </div>
        <div className="flex items-center gap-2 px-4">
          <Popover open={openOrg} onOpenChange={setOpenOrg}>
            <PopoverTrigger asChild>
              <button
                className="flex items-center gap-2 px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
              >
                {selectedOrg.name}
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search organization..." />
                <CommandList>
                  <CommandEmpty>No organization found.</CommandEmpty>
                  <CommandGroup>
                    {organizations.map((org) => (
                      <CommandItem
                        key={org.id}
                        onSelect={() => {
                          setSelectedOrg(org);
                          setOpenOrg(false);
                        }}
                        className="flex items-center justify-between"
                      >
                        {org.name}
                        {selectedOrg.id === org.id && (
                          <Check className="h-4 w-4" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        setOpenOrg(false);
                        // Handle new organization creation
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      New Organization
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <span className="text-muted-foreground">/</span>

          <Popover open={openProject} onOpenChange={setOpenProject}>
            <PopoverTrigger asChild>
              <button
                className="flex items-center gap-2 px-2 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
              >
                {selectedProject.name}
                <ChevronDown className="h-4 w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <Command>
                <CommandInput placeholder="Search project..." />
                <CommandList>
                  <CommandEmpty>No project found.</CommandEmpty>
                  <CommandGroup>
                    {projects.map((project) => (
                      <CommandItem
                        key={project.id}
                        onSelect={() => {
                          setSelectedProject(project);
                          setOpenProject(false);
                        }}
                        className="flex items-center justify-between"
                      >
                        {project.name}
                        {selectedProject.id === project.id && (
                          <Check className="h-4 w-4" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => {
                        setOpenProject(false);
                        // Handle new project creation
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      New Project
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="ml-auto flex items-center gap-4 px-4">
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Feedback
          </button>
          <div className="h-6 w-px bg-border" />
          <button className="rounded-full size-8 bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
            <span className="text-sm font-medium">SN</span>
          </button>
        </div>
      </div>
    </header>
  );
}