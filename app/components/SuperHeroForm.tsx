"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import type { Superhero } from "../types";

interface SuperheroFormProps {
  onAddSuperhero: (superhero: Omit<Superhero, "id">) => void;
}

export default function SuperHeroForm({ onAddSuperhero }: SuperheroFormProps) {
  const [name, setName] = useState("");
  const [superpower, setSuperpower] = useState("");
  const [avatar, setAvatar] = useState("");
  const [humilityScore, setHumilityScore] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const score = Number.parseInt(humilityScore, 10);
    if (name && superpower && score >= 1 && score <= 10) {
      onAddSuperhero({ name, avatar, superpower, humilityScore: score });
      setName("");
      setSuperpower("");
      setAvatar("");
      setHumilityScore("");
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="my-6">
          <Button variant="outline">Add a superhero</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a superheo</DialogTitle>
            <DialogDescription>
              Add a new superhero to the list of humble superheroes.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit}
            className="mb-8 p-6 bg-gray-100 rounded-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Add a New Superhero</h2>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="superpower">Superpower</Label>
                <Input
                  id="superpower"
                  value={superpower}
                  onChange={(e) => setSuperpower(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="humilityScore">Humility Score (1-10)</Label>
                <Input
                  id="humilityScore"
                  type="number"
                  min="1"
                  max="10"
                  value={humilityScore}
                  onChange={(e) => setHumilityScore(e.target.value)}
                  required
                />
              </div>
              <Button type="submit">Add Superhero</Button>
            </div>
          </form>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
