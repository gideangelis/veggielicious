import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./RecipeElement.module.css";
import { ClipLoader } from "react-spinners";
import { PiCookingPotLight } from "react-icons/pi";
import { PiForkKnife } from "react-icons/pi";

import BackButton from "../Button/BackButton";

const spoonacularApiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

const override = {
  display: "block",
  margin: "200px auto",
};

function RecipeElement() {

  const [recipeDetails, setRecipeDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();


  useEffect(() => {
    async function fetchDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(`
        https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${spoonacularApiKey}
        `);

        const data = await res.json();
        setRecipeDetails(data);
      } catch (error) {
        console.error("There was a problem fetching recipe details:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDetails();
  }, [params.name]);

  return (
    <div className={styles.recipeElement}>
      <BackButton />
      <div className={styles.detailsWrapper}>
        {isLoading && <ClipLoader color="#324a24" cssOverride={override} />}

        <div className={styles.imageContainer}>
          <img alt={recipeDetails.title} src={recipeDetails.image} />
        </div>

        <div className={styles.detailsContainer}>
        
          <div className={styles.recipeTitle}>
            <h3>{recipeDetails.title}</h3>
          </div>

          <div className={styles.labelsWrapper}>
            {/* Vegan Label */}
            {recipeDetails.vegan === true ? (
              <div className={styles.label}>Vegan</div>
            ) : (
              <div className={styles.label}>Vegetarian</div>
            )}

            {/* Dairy free Label */}
            {recipeDetails.dairyFree === true ? (
              <div className={styles.label}>Dairy free</div>
            ) : (
              ""
            )}

            {/* Dairy free Label */}
            {recipeDetails.glutenFree === true ? (
              <div className={styles.label}>Gluten free</div>
            ) : (
              ""
            )}

            {/* Very healthy Label */}
            {recipeDetails.veryHealthy === true ? (
              <div className={styles.label}>Very healthy</div>
            ) : (
              ""
            )}
          </div>

          <div className={styles.cookingTime}>
            <PiCookingPotLight /> Ready in {recipeDetails.readyInMinutes}{" "}
            minutes
          </div>

          <div className={styles.servings}>
            <PiForkKnife /> {recipeDetails.servings} servings
          </div>

          {/* Ingredients */}
          <div className={styles.ingredientsWrapper}>
            <h4>Ingredients</h4>
            <ul className={styles.ingredientsList}>
              {recipeDetails &&
                recipeDetails.extendedIngredients &&
                recipeDetails.extendedIngredients.map((ingredient, i) => (
                  <li key={i}>{ingredient.original}</li>
                ))}
            </ul>
          </div>

          <div className={styles.instructionsWrapper}>
            <h4>Instructions</h4>
            <ul className={styles.instructionsList}>
              {recipeDetails.analyzedInstructions &&
                recipeDetails.analyzedInstructions.length &&
                recipeDetails.analyzedInstructions[0].steps.map((step, i) => (
                  <li className={styles.step} key={i}>
                    <span>{step.number}</span>
                    {step.step}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeElement;
