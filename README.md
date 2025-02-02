# Weather App

A modern, responsive weather application built with React, TypeScript, and Tailwind CSS. The app provides real-time weather information using the OpenWeatherMap API, featuring both city search and geolocation capabilities.

![Weather App Screenshot](https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80&w=1200)

## Features

- 🔍 Search weather by city name
- 📍 Get weather for current location
- 🌡️ Toggle between Celsius and Fahrenheit
- 💨 Display wind speed and humidity
- 🎨 Beautiful, responsive design with glassmorphism effects
- ⚡ Real-time weather updates
- 🌐 Integration with OpenWeatherMap API

## Running the Project Locally

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-app
```

2. Install dependencies:
```bash
npm install
```

1. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
```env
VITE_WEATHER_API_KEY=your_api_key_here
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173
```

## Technical Approach & Implementation

### Architecture

The app is built using modern React practices and follows these key principles:
- Functional components with hooks for state management
- TypeScript for type safety
- Tailwind CSS for responsive styling
- Lucide React for consistent iconography

### Key Components

4. **Weather Data Fetching**
   - Implemented using the Fetch API with async/await
   - Error handling for failed API requests
   - Type-safe response handling with TypeScript interfaces

5. **Geolocation Integration**
   - Uses browser's Geolocation API
   - Fallback to manual city search if geolocation fails
   - Error handling for permission denials

6. **UI/UX Design**
   - Responsive layout using Tailwind CSS
   - Glassmorphism effects for modern aesthetics
   - Loading states and error messages for better user feedback

### Challenges & Solutions

7. **API Error Handling**
   - Challenge: Different error types from OpenWeatherMap API
   - Solution: Implemented comprehensive error handling with specific error messages

8. **Type Safety**
   - Challenge: Ensuring type safety with API responses
   - Solution: Created detailed TypeScript interfaces for weather data

9. **Geolocation Reliability**
   - Challenge: Inconsistent geolocation behavior across browsers
   - Solution: Added robust error handling and fallback to manual city search

10. **Unit Conversion**
   - Challenge: Accurate temperature conversion between units
   - Solution: Implemented precise conversion logic with rounding

11. **Response Time**
   - Challenge: Slow API responses affecting user experience
   - Solution: Added loading states and optimistic updates

### Code Organization

```
src/
├── App.tsx           # Main application component
├── index.css         # Global styles
├── main.tsx         # Application entry point
└── vite-env.d.ts    # TypeScript declarations
```

## Future Improvements

12. Add weather forecasts for upcoming days
13. Implement weather alerts
14. Add more weather details (pressure, visibility, etc.)
15. Add city autocomplete for search
16. Implement local storage for recent searches
17. Add weather animations based on conditions

## Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Vite
- OpenWeatherMap API
- Lucide React Icons
