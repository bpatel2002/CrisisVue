// components/MassShootingEvent.tsx
'use client';

// import React from 'react';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Import your MassShootingEvent component
import MassShootingEvent from './MassShootingEvent.tsx'; // Adjust the path as needed

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Make a GET request to your API endpoint using Axios
    axios.get('http://127.0.0.1:5000/events')
      .then((response) => {
        // Assuming your API returns an array of event documents
        setEvents(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);



  return (
    <div>
      <h1>Recent Events</h1>
      {events.map((event_document, index) => (
        <MassShootingEvent
          key={index}
          event={event_document.event_name}
          date={event_document.date}
          perpetrator={event_document.perpetrator}
          location={event_document.location}
          numVictims={event_document.casualties}
        />
      ))}
    </div>
  );
}

// console.log(event_document.location);

export default EventList;


// interface MassShootingEventProps {
//   event: string;
//   date: string;
//   perpetrator: string;
//   location: string;
//   numVictims: number;
//   // summary: string;

// }

// "perpetrator": perpetrator,
// "summary": summary,
// "date": date,
// "location": location,
// "motive": motive,
// "how": how,
// "additional_fields": additional_fields

// const MassShootingEvent: React.FC<MassShootingEventProps> = ({
//   event,
//   date,
//   perpetrator,
//   location,
//   numVictims,
// }) => {
//   return (
//     <div>
//       <h2>{event}</h2>
//       <p>Date: {date}</p>
//       <p>Perpetrator: {perpetrator}</p>
//       <p>Location: {location}</p>
//       <p>Number of Victims: {numVictims}</p>
//     </div>
//   );
// };

// export default MassShootingEvent;

// compoenent that returns all events in one 

// import "./App.css";
// import Axios from "axios";
// import RecipeTile from "./components/RecipeTile";
// import FavoriteTile from "./components/favoriteTile";
// import { useState } from "react";

// function App() {
//   const [query, setquery] = useState("");
//   const [recipes, setrecipes] = useState([]);
//   const [favorites, setfavorites] = useState([]);
//   const [healthlabel, sethealthlabel] = useState("vegetarian");

//   const APP_ID = "8a99bf63";
//   const APP_KEY = "48c446195f8931988191fdb35b80d712";

//   var apiurl = `http://127.0.0.1:5000/events`;
//   var dburl = "https://foodify-application.herokuapp.com/getFavoritedRecipes";

//   async function getRecipes() {
//     var result = await Axios.get(apiurl);
//     setrecipes(result.data.hits);
//   }

//   async function getFavorites() {
//     var result = await Axios.post(dburl);
//     setfavorites(result.data.favorites);
//     console.log(result.data)
//   }

//   const onSubmit = (e) => {
//     e.preventDefault();
//     getRecipes();
//   };

//   const onClickViewFavorites = (e) => {
//     e.preventDefault();
//     setrecipes([]);
//     getFavorites();
//   };

//   getFavorites();

//   return (
//     <div className="app">
//       <title>Foodify</title>
//       <h1 className="title">FOODIFY</h1>

//       <form className="app__searchForm" onSubmit={onSubmit}>
//         <div className="search">
//           <input
//             type="text"
//             className="app__input"
//             placeholder="enter ingredient"
//             value={query}
//             onChange={(e) => setquery(e.target.value)}
//           />

//           <select className="app__healthlabels">
//             <option onClick={() => sethealthlabel("vegan")}>Vegan</option>
//             <option onClick={() => sethealthlabel("vegetarian")}>
//               Vegetarian
//             </option>
//             <option onClick={() => sethealthlabel("dairy-free")}>
//               Dairy Free
//             </option>
//             <option onClick={() => sethealthlabel("egg-free")}>Egg Free</option>
//             <option onClick={() => sethealthlabel("pork-free")}>
//               Pork Free
//             </option>
//           </select>
//           <input className="app__submit" type="submit" value="Search" />
//           <button className="show__favorites" onClick={onClickViewFavorites}>
//             View Favorites
//           </button>
//         </div>
//       </form>

//       <div className="app__recipes">
//         {recipes?.map((recipe) => {
//           return <RecipeTile recipe={recipe} />;
//         })}
//       </div>
//       <div className="app_recipes">
//         {favorites?.map((favorite) => {
//           return <FavoriteTile favorite={favorite} />;
//         })}
//       </div>
//     </div>
//   );
// }

// export default App;

