import { useEffect, useState } from "react";

import styles from "./Popular.module.css";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import { Link } from "react-router-dom";

const spoonacularApiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    async function getPopular() {
      const isPopular = JSON.parse(localStorage.getItem("popular"));

      try {
        if (isPopular) {
          setPopular(isPopular);
        } else {
          const res = await fetch(
            `https://api.spoonacular.com/recipes/random?apiKey=${spoonacularApiKey}&number=9&tags=vegetarian`
          );
          const data = await res.json();

          console.log(data.recipes);

          localStorage.setItem("popular", JSON.stringify(data.recipes));
          setPopular(data.recipes);
        }
      } catch (error) {
        console.error("There was an error fetching recipes:", error);
      }
    }

    getPopular();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2>Popular Picks</h2>
      <Splide
        options={{
          perPage: 3,
          rewind: true,
          gap: '1rem',
          breakpoints: {
            900: {
              perPage: 2,
            },
            640: {
              perPage: 1,
            }
          }
            
        }}
      >
        {popular.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <div className={styles.card}>
                <Link to={"/recipe/" + recipe.id}>
                  <div className={styles.titleDiv}>
                  <p>{recipe.title}</p>
                  </div>
                  <img src={recipe.image} alt={recipe.title} />
                </Link>
              </div>
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
}

export default Popular;
