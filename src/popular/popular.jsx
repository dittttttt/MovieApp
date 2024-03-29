import React, { useEffect, useState } from "react";
import axios from "axios";
import { StarIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

//Initial API KEY
const API_KEY = "77b3a402465e7a82a0baf4ac6fbae43d";

export default function MovieApp() {
  const [popular, setPopular] = useState([]);
  const [query, setSearchQuery] = useState("");
  const [numOfItems, setNumOfItems] = useState(10);
  const [isNotFound, SetIsNotFound] = useState(false);

  const navigate = useNavigate();

  //Fetching Data API {{ POPULAR }}
  useEffect(() => {
    const popularMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
          { headers: { accept: "application/json" } }
        );
        console.log("response.data.popular", response.data.results);
        setPopular(response.data.results);
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    };
    popularMovies();
  }, []);

  // Search Function
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle changes in the number of items select
  const handleNumOfItemsChange = (event) => {
    setNumOfItems(parseInt(event.target.value));
  };

  //to lowerchase & filtering
  const filteredData = popular
    .filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
    .slice(0, numOfItems);

  //setIsNotFound
  useEffect(() => {
    if (filteredData.length === 0 && query !== "") {
      SetIsNotFound(true);
    } else {
      SetIsNotFound(false);
    }
  }, [filteredData, query]);

  return (
    <div className="text-white">
      {/* Navbar  */}
      <div className="flex justify-between items-center text-xl py-5 px-12 bg-gray-900 fixed top-0 left-0 w-full shadow-md z-10">
        <a href="/" className="text-3xl">
          <strong className="text-yellow-500">PRIME</strong>MOVIES
        </a>
        <ul className="flex">
          <li className="my-2 mx-4  hover:text-yellow-400">
            <a href="/">Home</a>
          </li>
          <li className="my-2 mx-4 hover:text-yellow-400">
            <a href="/top-rated">Top Rated</a>
          </li>
          <li className="my-2 mx-4  text-yellow-400">
            <a href="/popular">Popular</a>
          </li>
          <li className="my-2 mx-4  hover:text-yellow-400">
            <a href="/upcoming">Up Coming</a>
          </li>
        </ul>
        <div className="flex gap-4">
          <p>Aditya</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
      </div>
      {/* Top Rated Movies */}
      <div className="flex justify-center mt-24">
        <div className="py-12">
          <div className=" text-center py-">
            <p className="text-5xl pb-4">
              <strong>Popular Movies</strong>
            </p>
            <p className="pb-5">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit nobis pariatur explicabo,
            </p>
            <div className="flex justify-center gap-4 mt-4">
              {/* Search */}
              <div>
                <input
                  type="text"
                  name="search"
                  placeholder="Search"
                  value={query}
                  onChange={handleSearchChange}
                  className="rounded-md p-2 text-black"
                />
              </div>
              {/* Num of Items */}
              <div>
                <select
                  id="numOfItems"
                  className="text-black py-2 px-5 rounded-md"
                  value={numOfItems}
                  onChange={handleNumOfItemsChange}
                >
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </div>
          {/* Show Popular Movie */}
          <div>
          {isNotFound ? ( // Tampilkan pesan "Not Found" jika tidak ada hasil pencarian
              <div className="text-center mt-10 text-red-500 font-bold">
                Movie Not Found
              </div>
            ) : (
            <div className="mx-auto max-w-[90%] grid grid-cols-5 gap-8 pb-2 mt-12">
              {filteredData?.map((e) => (
                <div
                  key={e?.id}
                  onClick={() => {
                    navigate("/detail", { state: { id: e?.id } });
                  }}
                  className=" w-[250px]  px-3"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${e?.poster_path}`}
                    alt=""
                    className="rounded-md w-full hover:scale-105"
                  />
                  <p className="mt-4">
                    <strong>{e?.title}</strong>
                  </p>
                  <div className="flex">
                    <p className="text-gray-400">{e?.release_date}</p>
                  </div>
                  <div className="flex">
                    {/* icon view */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    <p className="ms-1">
                      {e?.popularity
                        .toFixed(3)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </p>
                  </div>
                </div>
              ))}
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
