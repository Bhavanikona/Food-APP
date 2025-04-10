import React, { useState } from 'react';
import '../Home/Home.css'
import Header from '../../Components/Header/Header';
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../Components/Food-display/FoodDisplay';
import MobileApp from '../../Components/MobileApp/MobileApp';

const Home = () => {
  const[ category,setcategory]=useState("All");
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setcategory={setcategory}/>
      <FoodDisplay category={category}/>
      <MobileApp></MobileApp>
    </div>
  )
}

export default Home
