import React, { useState } from "react";
import "./App.css";
import data from "./data.json";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  const handleSearch = () => {
    if(query){
    // fetch(`/search?query=${encodeURIComponent(query)}`)
    //   .then((response) => response.json())
    //   .then((data) => setResults(data))
    //   .catch((error) => console.error("Erro ao buscar os resultados:", error));
      setResults(data.results.filter((result) => result.title.includes(query)));
      setShowResults(true);
      setCurrentPage(1); 
    }
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(results.length / resultsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="App">
      <h1>Elasticsearch</h1>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Digite sua pesquisa"
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      {showResults && 
        <>
          <div className="results">
            {currentResults.length > 0 ? (
              currentResults.map((result, index) => (
                <div key={index} className="result">
                  <h3>{result.title}</h3>
                  <p>{result.abs}</p>
                  <a href={result.url}>
                    Link
                  </a>
                </div>
              ))
            ) : (
              <div className="result">
                <p>Nenhum resultado encontrado.</p>
              </div>
            )}
          </div>
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              >
              {"<"}
            </button>
            {pageNumbers.map((number) => (
              <button
              key={number}
              className={currentPage === number ? "active" : ""}
              onClick={() => setCurrentPage(number)}
              >
                {number}
              </button>
            ))}
            <button
              disabled={currentPage === pageNumbers.length}
              onClick={() => setCurrentPage(currentPage + 1)}
              >
              {">"}
            </button>
          </div>
        </>
      }
    </div>
  );
}

export default App;
