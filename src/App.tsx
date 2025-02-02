import React, { useState, useEffect } from 'react';
import { Search, MapPin, Thermometer, Droplets, Wind, RotateCcw } from 'lucide-react';

interface WeatherData {
  city: string;
  temp: number;
  tempF: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  icon: string;
}

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [useCelsius, setUseCelsius] = useState(true);

  const API_KEY = '2ef0a16d2ea8e65d0ca117110dbca839';
  const API_BASE = 'https://api.openweathermap.org/data/2.5';

  const fetchWeather = async (searchCity: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const url = `${API_BASE}/weather?q=${encodeURIComponent(searchCity)}&appid=${API_KEY}&units=metric`;
      console.log('Fetching weather data from:', url.replace(API_KEY, 'API_KEY')); // Log URL without exposing API key
      
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'City not found');
      }

      const data = await response.json();
      console.log('Weather data received:', data); // Log the response data
      
      setWeather({
        city: data.name,
        temp: Math.round(data.main.temp),
        tempF: Math.round((data.main.temp * 9/5) + 32),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert to km/h
        condition: data.weather[0].main,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      });
    } catch (err) {
      console.error('Error fetching weather:', err); // Log any errors
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const url = `${API_BASE}/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`;
            console.log('Fetching weather data by coordinates:', url.replace(API_KEY, 'API_KEY')); // Log URL without exposing API key
            
            const response = await fetch(url);
            
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || 'Failed to fetch weather data');
            }

            const data = await response.json();
            console.log('Location weather data received:', data); // Log the response data
            setCity(data.name);
            setWeather({
              city: data.name,
              temp: Math.round(data.main.temp),
              tempF: Math.round((data.main.temp * 9/5) + 32),
              humidity: data.main.humidity,
              windSpeed: Math.round(data.wind.speed * 3.6),
              condition: data.weather[0].main,
              icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            });
          } catch (err) {
            console.error('Error fetching weather by location:', err); // Log any errors
            setError('Failed to get weather for your location');
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          console.error('Geolocation error:', err); // Log geolocation errors
          setError('Failed to get your location');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 p-4">
      <div className="max-w-md mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Weather App
        </h1>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="w-full px-4 py-2 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              disabled={loading}
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={getLocation}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
          >
            <MapPin className="w-4 h-4" />
            Use my location
          </button>
          <button
            onClick={() => setUseCelsius(!useCelsius)}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
          >
            <RotateCcw className="w-4 h-4" />
            Switch to °{useCelsius ? 'F' : 'C'}
          </button>
        </div>

        {loading && (
          <div className="text-center text-gray-600">
            Loading weather data...
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 bg-red-100 p-3 rounded-lg">
            {error}
          </div>
        )}

        {weather && !error && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {weather.city}
            </h2>
            
            <div className="flex justify-center mb-4">
              <img
                src={weather.icon}
                alt={weather.condition}
                className="w-24 h-24"
              />
            </div>

            <div className="text-4xl font-bold text-gray-800 mb-4">
              {useCelsius ? `${weather.temp}°C` : `${weather.tempF}°F`}
            </div>

            <div className="text-xl text-gray-600 mb-6">
              {weather.condition}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center justify-center gap-2 text-blue-600 mb-1">
                  <Droplets className="w-5 h-5" />
                  Humidity
                </div>
                <div className="text-lg font-semibold text-gray-800">
                  {weather.humidity}%
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center justify-center gap-2 text-blue-600 mb-1">
                  <Wind className="w-5 h-5" />
                  Wind Speed
                </div>
                <div className="text-lg font-semibold text-gray-800">
                  {weather.windSpeed} km/h
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;