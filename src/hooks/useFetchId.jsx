import { useEffect, useState } from "react";

export default function useFetchId(id) {
  const spoonacularApiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

  const [recipeDetails, setRecipeDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchSingleRecipe() {
        try {
          const res = await fetch(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${spoonacularApiKey}`
          );
          const data = res.json();
          setRecipeDetails(data);
        } catch (error) {
          console.log(`Something went wrong: ${error}`);
        } finally {
          setLoading(false);
        }
      }

      fetchSingleRecipe();
  }, [id, spoonacularApiKey]);

  return { recipeDetails, loading };
}
