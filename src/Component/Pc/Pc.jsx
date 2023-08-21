import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Pc() {
    const [plateformData, setPlateformData] = useState([]);
    const [visable, setVisable] = useState(20);

  async function getPlatformdata(){
    const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
      params: {platform: 'pc'},
      headers: {
        'X-RapidAPI-Key': 'ee956e5f47msh980fe373efcfe76p1b2aecjsn906f396c876b',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      setPlateformData(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }

  useEffect(()=>{
    getPlatformdata()
  },[])

  function seeMore() {
    setVisable(visable +20)
  }
  return <>
   <Helmet>
                <meta charSet="utf-8" />
                <title>Game Over</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
 <section className='randomGame mt-5'>
     
     <div className="container my-5">
       <div className="row g-4">
         {plateformData.length > 0 ? plateformData.splice(0, visable).map((game, index) => {
           return <>

             <div key={index} className="col-md-4">

               <Link to={`/DescriptionGame/${game.id}`}>
               <div className="gameCard">
              <img className='w-100' src={game.thumbnail} alt="" />
              <div className="captionCard ">
                <div className="head d-flex justify-content-between align-items-center">
                  <h3 color='fw-bolder px-3 '>{game.title}</h3>
                <button className='free me-2'>Free</button>
                </div>
                <p className='px-3'>{game.developer}</p>
                <div className='d-flex justify-content-between align-items-center'>
                <i class="fa-solid fa-square-plus px-3"></i>
                  <div>
                  <span className='genre'>{game.genre}</span>
                  <i class="fa-brands fa-windows px-3 "></i>
                 
  
                  </div>
  
                </div>
              </div>
              
              
              </div>
                 
               </Link>
             </div>

           </>

         }) : <div>
           <div className="d-flex justify-content-center align-item-center">
             <div class="spinner">
               <div class="cube1"></div>
               <div class="cube2"></div>
             </div>
           </div>

         </div>}


       </div>

       <div className="buttonMore m-auto d-flex justify-content-center py-5 ">
         {visable < plateformData.length ?
           <button onClick={seeMore} className='seeMore'>
             See More
           </button>
         :''}
         
       </div>
     </div>
   </section>
  </>
}
