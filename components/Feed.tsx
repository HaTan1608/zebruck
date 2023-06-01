"use client";

import { useState, useEffect } from "react";
import Product from "./Product";

const Feed = () => {
  const [allProducts, setAllProducts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/products`);

      const data = await response.json();
      console.log(data);
      setAllProducts(data);
    };
    fetchPosts();
  }, []);
  const createProduct = async () => {
    console.log("123123");
    try {
      const response = await fetch("/api/products/new", {
        method: "POST",
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  //   const filterPrompts = (searchtext) => {
  //     const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
  //     return allPosts.filter(
  //       (item) =>
  //         regex.test(item.creator.username) ||
  //         regex.test(item.tag) ||
  //         regex.test(item.prompt)
  //     );
  //   };

  //   const handleSearchChange = (e) => {
  //     clearTimeout(searchTimeout);
  //     setSearchText(e.target.value);

  //     // debounce method
  //     setSearchTimeout(
  //       setTimeout(() => {
  //         const searchResult = filterPrompts(e.target.value);
  //         setSearchedResults(searchResult);
  //       }, 500)
  //     );
  //   };

  //   const handleTagClick = (tagName) => {
  //     setSearchText(tagName);

  //     const searchResult = filterPrompts(tagName);
  //     setSearchedResults(searchResult);
  //   };

  return (
    <section className="feed">
      {/* <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form> */}

      {/* All Prompts */}
      <h1
        className="text-5xl font-bold text-center"
        onClick={() => createProduct()}
      >
        DEALS OF THE DAY
      </h1>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {allProducts.map((product: any) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
      {/* {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )} */}
    </section>
  );
};

export default Feed;
