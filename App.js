import './App.css';
import { useState, useEffect } from 'react';
import imgLeft from './img/logo-left.svg';
import imgRight from './img/logo-right.svg';
import search from './img/search.svg';
import sun from './img/icon.png'
import moon from "./img/icon2.png";
import circle1 from './img/circle1.svg';
import circle2 from './img/circle2.svg'

function App() {
  const [input, setInput] = useState(""); 
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("Ulan Bator"); 
  const [weather,SetWeather] = useState(["current.temp_c:0,current.condition.text:,current.last_updated:"])
  const apiKey = 'f8dede5e4bc144e897022321251501'

  const handleInput = (event) => {
    const value = event.target.value;
    setInput(value);

    if (value.trim() === "") {
      setFilteredData([]); 
      return;
    }

    const filtered = data
      .filter((item) => {
        return item.cities.some((city) =>
          city.toLowerCase().includes(value.toLowerCase())
        );
      })
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

  const handleCityClick = (city) => {
    setSelectedCity(city); 
    setInput(""); 
    setFilteredData([]);
  
    
  };

  
  useEffect(() => {
    const getWeather = async () => {
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${selectedCity}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        const result = await response.json();
        SetWeather(result); 
        console.log(weather)
        
      
        
      } catch (error) {
        console.log("Error fetching weather:", error);
      }
    };

    getWeather();
  }, [selectedCity]);
  return (
    <div className="h-screen w-screen flex justify-center items-center">
     <img src={circle1} className='absolute  top-[200px] left-[350px]' />
     <img src={circle2} className='absolute bottom-[200px] right-[350px]' />
      <div className="w-[940px] h-[940px] border-solid border-opacity-10 border absolute flex justify-center items-center gap-4 rounded-full">
        <div className="w-[540px] h-[540px] border-solid border-opacity-10 border absolute flex justify-center items-center gap-4 rounded-full">
          <div className="w-[340px] h-[340px] border-solid border-opacity-10 border absolute flex justify-center items-center gap-4 rounded-full">
            <div className="h-36 w-36 bg-customwhite border-solid border-white absolute flex justify-center items-center gap-4 rounded-full">
              <img src={imgLeft} className="w-11 h-20" alt="Logo Left" />
              <img src={imgRight} className="w-11 h-20" alt="Logo Right" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-min h-min absolute top-0 left-[3/6]">
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
          <ul className="mt-4 bg-white w-[567px] p-4 rounded-lg shadow-lg absolute z-100">
            {filteredData.map((item, index) => (
              <li key={index} className="p-2 border-b last:border-none z-100">
                <strong>{item.country}:</strong>{" "}
                {item.cities
                  .filter((city) =>
                    city.toLowerCase().includes(input.toLowerCase())
                  )
                  .map((city, i) => (
                    <span
                      key={i}
                      className="cursor-pointer hover:underline"
                      onClick={() => handleCityClick(city)}
                  
                      
                    >
                      {city}
                    
                    </span>
                  
                  ))}
              </li>
            ))}
            
          </ul>
        )}
      
      </div>

      <div className="h-full w-3/6 bg-customwhite flex justify-center items-center  ">
        <div className="w-[414px] h-[832px] bg-White rounded-[44px] backdrop-blur-24 flex flex-col justify-center gap-[30px] absolute">
      
          {weather &&  (
            <div className="text-[48px] text-black h-[200px] flex flex-col items-start">
              <div className='p-[40px] flex flex-col items-start'>
              <p className="text-center text-[18px] text-Dategray h-[25px]">
           <strong> {weather.current.last_updated.slice(0,10)}</strong>
            </p>
              <strong>{selectedCity}</strong>
            </div>
            </div>
          )}
             <div className='w-full h-[264px] flex justify-center'>
          <img src={sun} className='w-[264px]'/>
        </div>
        {weather && (
            <div className="text-center mt-4 text-[144px] text-black flex flex-col items-start w-full p-[48px] ">
         <div className=' flex flex-col items-start '>
              <p>    {weather.current.temp_c}    </p>
              <p className='text-[24px] text-customyellow'>{weather.current.condition.text}</p>
              </div>
            </div>
            
          )}
 
        </div>
     
      </div>

      <div className="h-full w-3/6 bg-customDark flex justify-center items-center ">
        <div className="w-[414px] h-[832px] bg-Dark rounded-[44px] backdrop-blur-lg flex flex-col justify-center gap-[30px]">
      
          {weather &&  (
            <div className="text-[48px] text-black h-[200px] flex flex-col items-start">
              <div className='p-[40px] flex flex-col items-start'>
              <p className="text-center text-[18px] text-Dategray h-[25px] ">
           <strong> {weather.current.last_updated.slice(0,10)}</strong>
            </p>
              <strong className='text-white'>{selectedCity}</strong>
            </div>
            </div>
          )}
             <div className='w-full h-[264px] flex justify-center'>
          <img src={moon} className='w-[264px]'/>
        </div>
        {weather && (
            <div className="text-center mt-4 text-[144px] text-black flex flex-col items-start w-full p-[48px] ">
         <div className='flex flex-col items-start '>
              <p className='text-white'>    {weather.current.temp_c}    </p>
              <p className='text-[24px] text-custompink'>{weather.current.condition.text}</p>
              </div>
            </div>
            
          )}
 
        </div>
     
      </div>
    </div>
  );
}

export default App;
