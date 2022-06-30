import React from "react";
import { createContext, useContext, useState } from "react";
import axios from 'axios'

const ResultContext = createContext();

const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContextProvider = ({ children }) => {
    
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("elon musk");

    const matchYoutubeUrl = (url) => {
        var p =
          /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (url?.match(p)) {
          return true;
        }
        return false;
      };
    

    const getResults = async (type) => {
        setIsLoading(true)

        const response = await axios.get(`${baseUrl}${type}`, {
            headers: {
            'X-User-Agent': 'desktop',
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'google-search3.p.rapidapi.com'
            }
        })
        
        const data = response.data;
        console.log(data);

        if (type.includes("/news")) {
            setResults(data.entries);
          } else if (type.includes("/image")) {
            setResults(data.image_results);
          } else if (type.includes("/video")) {
          const filteredResults = [];
            data.results.map((result) => {
              if (matchYoutubeUrl(result.link)) filteredResults.push(result);
            });
      
            setResults(filteredResults);
          } else {
            setResults(data.results);
        }

        setIsLoading(false)
        
    }

    return (
        <ResultContext.Provider value={{getResults,results,searchTerm,setSearchTerm,isLoading}} >
            {children}
        </ResultContext.Provider>
    )

}

export const useResultContext = () => useContext(ResultContext);