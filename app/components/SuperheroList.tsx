import type { Superhero } from "../types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface SuperheroListProps {
  superheroes: Superhero[];
  onDeleteSuperhero: (id: string) => void;
}

export default function SuperheroList({
  superheroes,
  onDeleteSuperhero,
}: SuperheroListProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Superheroes</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {superheroes.map((hero) => (
          <Card key={hero.id}>
            <CardHeader className="flex flex-row items-center px-4 py-8 gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={`${hero.avatar}`} />
                <AvatarFallback>
                  {hero.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{hero.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Superpower:</strong> {hero.superpower}
              </p>
              <p>
                <strong>Humility Score:</strong> {hero.humilityScore}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onDeleteSuperhero(hero.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
