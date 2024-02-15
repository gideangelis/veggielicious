import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Searchbar.module.css";

import { FaSearch } from "react-icons/fa";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  function submitHandler(e) {
    e.preventDefault();

    if (!input) {
      alert("Search for an ingredient or a recipe! 🥑");
      return;
    }

    navigate("/searched/" + input);
    setInput('');
  }

  return (
    <form className={styles.searchBar} onSubmit={submitHandler}>
      <div>
        <input
          className={styles.inputSearch}
          type="text"
          placeholder="What would you like to eat?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <FaSearch />
      </div>
    </form>
  );
}

export default Search;
