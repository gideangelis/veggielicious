import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

import styled from "styled-components";

import Searchbar from "../Searchbar/Searchbar";

const spoonacularApiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
const override = {
  display: "block",
  margin: "200px auto",
};

function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    async function getSearched(query) {
      try {
        if (!query) return;
        setIsLoading(true);
        const res = await fetch(`
                https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonacularApiKey}&query=${query}
                `);

        if (res) {
          const data = await res.json();
          setSearchedRecipes(data.results);
        }
      } catch (error) {
        console.error("There was a problem fetching searched recipes:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getSearched(params.search);
  }, [params.search]);

  return (
    <>
      <Searchbar />
      {isLoading && <ClipLoader color="#324a24" cssOverride={override} />}
      <RecipesCount>
        
        {searchedRecipes.length > 0 && <><h4>Search results for &quot;{params.search}&quot;</h4> <span>{searchedRecipes.length} recipes found</span></>}
        {searchedRecipes.length === 1 && <><h4>Search results for &quot;{params.search}&quot;</h4> <span>{searchedRecipes.length} recipe found</span></> }
        {searchedRecipes.length === 0 && <><h4>No recipes founded for &quot;{params.search}&quot;. </h4> <p>Search for another ingredient or recipe! 🥰</p></>}
      </RecipesCount>
      <Grid>
        {searchedRecipes.map((item) => {
          return (
            <Card key={item.id}>
              <Link to={"/recipe/" + item.id}>
                <Wrapper>
                  <img src={item.image} alt="" />
                  <h4>{item.title}</h4>
                </Wrapper>
              </Link>
            </Card>
          );
        })}
      </Grid>
    </>
  );
}

const Grid = styled.div`
  padding: 0 5rem;
  margin-top: 60px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  transition: all 0.4s ease;
  width: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
  }

  h4 {
    position: absolute;
    left: 0%;
    bottom: 5%;
    font-size: 1rem;
    font-weight: 800;
    padding: 0.8rem;
    background-color: rgba(97, 179, 72, 0.8);
    width: 50%;
    border-radius: 0 1rem 1rem 0;
    overflow: hidden;
    text-align: center;
  }

  a {
    color: white;
    background-color: red;
  }

  &:hover {
    opacity: 0.8;
  }

  @media screen and (max-width: 500px) {
    width: 80%;
  }

`;

const Wrapper = styled.div`
  position: relative;
`;

const RecipesCount = styled.div`
  padding: 3rem 5rem 0 5rem;
  
  h4 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 10px;
    color: var(--primary-color);
  }

  span {
    font-size: 1.2rem;
    font-weight: 400;
  }

  p {
    font-style: italic;
  }

  @media screen and (max-width: 500px) {
    h4 {
      font-size: 1.2rem;
    }

    span {
      font-size: 1rem;
    }
  }
`

export default Searched;
