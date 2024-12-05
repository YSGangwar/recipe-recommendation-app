"use client";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import RecipeCard from "./RecipeCard";
export default function Form() {
  const [list, setList] = useState<string[]>([]);
  const [ingredient, setIngredient] = useState<string>("");
  const [recipes, setRecipes] = useState([]);
  const addIngredient = () => {
    if (ingredient.trim() === "") return;
    setList((prev) => [...prev, ingredient]);
    setIngredient("");
  };

  const handleGetRecipe = async () => {
    const listString = list.join(",");
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${listString}&number=4`,
      {
        headers: {
          "x-api-key": "6a0b7a3e1eb84781bed847d6de9ffae2",
        },
      }
    );
    console.log(response.data, ">>>>>>>");
    setRecipes(response.data);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="flex flex-col items-center gap-4 w-full max-w-lg p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-xl font-bold text-gray-800 text-center">
          Fill the Ingredients You Have
        </h1>
        <div className="flex w-full gap-2">
          <TextField
            onChange={(e) => setIngredient(e.target.value)}
            value={ingredient}
            label="Add Ingredient"
            variant="outlined"
            fullWidth
            size="small"
          />
          <Button
            onClick={addIngredient}
            variant="contained"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </Button>
        </div>
      </div>
  
      {list.length > 0 && (
        <div className="mt-6 w-full max-w-lg p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Ingredient List
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {list.map((ingredient, index) => (
              <li key={index} className="pl-2">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      )}
      <Button
        onClick={handleGetRecipe}
        variant="contained"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-2 rounded"
      >
        Get Recipe
      </Button>
      {recipes?.length && <RecipeCard recipes={recipes} />}
    </div>
  );
}
