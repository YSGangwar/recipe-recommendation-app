import React from "react";

interface Recipe {
  id: number;
  title: string;
  image: string;
  usedIngredients: Ingredient[];
  missedIngredients: Ingredient[];
}

interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  image: string;
}

export default function RecipeCard({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Recipes Based on Your Ingredients
      </h1>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-200"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {recipe.title}
              </h2>

              {/* Used Ingredients */}
              <p className="text-sm font-medium text-gray-600">
                Used Ingredients:
              </p>
              <ul className="text-sm text-gray-700 list-disc ml-5 mb-3">
                {recipe.usedIngredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </li>
                ))}
              </ul>

              {/* Missed Ingredients */}
              <p className="text-sm font-medium text-gray-600">
                Missing Ingredients:
              </p>
              <ul className="text-sm text-gray-700 list-disc ml-5">
                {recipe.missedIngredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
