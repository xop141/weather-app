import './App.css';
import { useState, useEffect } from 'react';
import imgLeft from './img/logo-left.svg';
import imgRight from './img/logo-right.svg';
import search from './img/search.svg';

function App() {
  const [input, setInput] = useState(""); 
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]); 

  
  const handleInput = (event) => {
    const value = event.target.value;
    setInput(value);

    if (value.trim() === "") {
      setFilteredData([]); 
      return;
    }

    const filtered = data
      .filter((item) =>
        item.cities.some((city) =>
          city.toLowerCase().includes(value.toLowerCase())
        )
      )
      .slice(0, 5); 

    setFilteredData(filtered);
  };

 
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then((response) => response.json())
      .then((result) => {
        setData(result.data); 
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="h-screen w-screen bg-green-400 flex justify-center items-center">
      <div className="h-36 w-36 bg-customwhite absolute flex justify-center items-center gap-4 rounded-full">
        <img src={imgLeft} className="w-11 h-20" alt="Logo Left" />
        <img src={imgRight} className="w-11 h-20" alt="Logo Right" />
      </div>
      <div className="h-full w-3/6 bg-customwhite">
        <div className="bg-white w-[567px] h-[80px] rounded-[48px] flex items-center justify-center gap-4">
          <div className="w-12 h-12">
            <img src={search} alt="Search Icon" />
          </div>
          <input
            className="h-[44px] w-[455px]"
            onChange={handleInput}
            value={input}
            placeholder="Search for cities..."
          />
        </div>
        {filteredData.length > 0 && (
          <ul className="mt-4 bg-white w-[567px] p-4 rounded-lg shadow-lg">
            {filteredData.map((item, index) => (
              <li key={index} className="p-2 border-b last:border-none">
                <strong>{item.country}:</strong>{" "}
                {item.cities
                  .filter((city) =>
                    city.toLowerCase().includes(input.toLowerCase())
                  )
                  .join(", ")}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="h-full w-3/6 bg-customDark"></div>
    </div>
  );
}

export default App;