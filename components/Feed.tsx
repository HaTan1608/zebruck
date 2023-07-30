"use client";
import { useState, useEffect } from "react";
import Product from "./Product";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const Feed = () => {
  const [allProducts, setAllProducts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
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
    <section className="feed z-10">
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
      <div style={{ width: "100%" }}>
        {" "}
        <Image
          src="/assets/images/banner.jpeg"
          alt="logo"
          width={500}
          height={500}
          sizes="(max-width: 768px) 100vw"
          className="object-contain"
        />
      </div>
      <h1
        className="font-bold mt-4 text-center text-xl md:text-5xl"
        onClick={() => createProduct()}
      >
        NEW COLLECTION
      </h1>
      <Carousel
        responsive={responsive}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        swipeable={false}
        draggable={false}
        showDots={false}
        infinite={true}
        autoPlay={true}
        itemClass="carousel-item-padding-40-px"
      >
        {allProducts.map((product: any) => (
          <Product key={product.id} product={product} />
        ))}
      </Carousel>
      <h1
        className=" font-bold mt-4 text-center text-xl md:text-5xl"
        onClick={() => createProduct()}
      >
        BEST SELLER
      </h1>
      <Carousel
        responsive={responsive}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        swipeable={false}
        draggable={false}
        showDots={false}
        autoPlay={true}
        infinite={true}
        itemClass="carousel-item-padding-40-px"
      >
        {allProducts.map((product: any) => (
          <Product key={product.id} product={product} />
        ))}
      </Carousel>
      {allProducts.map((product: any) => (
        <Product key={product.id} product={product} />
      ))}
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
