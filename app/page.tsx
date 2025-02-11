"use client";

import { useState, useEffect } from "react";
import SuperheroForm from "./components/SuperHeroForm";
import SuperheroList from "./components/SuperheroList";
import Loader from "./components/Loader";
import type { Superhero } from "./types";

export default function Home() {
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuperheroes();
  }, []);

  useEffect(() => {
    if (superheroes.length > 0) {
      setLoading(false);
    }
  }, [superheroes]);

  const fetchSuperheroes = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/superheroes"
      );
      const data = await response.json();
      setSuperheroes(data);
    } catch (error) {
      console.error("Error fetching superheroes:", error);
    }
  };

  const addSuperhero = async (newSuperhero: Omit<Superhero, "id">) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/superheroes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSuperhero),
        }
      );
      if (response.ok) {
        fetchSuperheroes();
      }
    } catch (error) {
      console.error("Error adding superhero:", error);
    }
  };
  const deleteSuperhero = async (id: string) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/superheroes/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchSuperheroes();
      }
    } catch (error) {
      console.error("Error deleting superhero:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Humble Superhero API
      </h1>
      <SuperheroForm onAddSuperhero={addSuperhero} />
      {loading ? (
        <Loader />
      ) : (
        <SuperheroList
          superheroes={superheroes}
          onDeleteSuperhero={deleteSuperhero}
        />
      )}
    </div>
  );
}
