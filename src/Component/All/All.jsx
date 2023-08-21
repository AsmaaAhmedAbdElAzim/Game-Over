import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function All() {

  const [allGame, setAllGame] = useState([]);
  const [visable, setVisable] = useState(20);
  
  async function getAllGame() {

    const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
      headers: {
        'X-RapidAPI-Key': 'ee956e5f47msh980fe373efcfe76p1b2aecjsn906f396c876b',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      setAllGame(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }

  useEffect(() => {
    
    getAllGame()
    
  }, []);
  console.log(allGame);

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
          {allGame.length > 0 ? allGame.splice(0, visable).map((game, index) => {
            return <>

              <div key={index} className="col-md-4">

                <Link to={`/DescriptionGame/${game.id}`}>

                  <div className="gameCard">
                    <img className='w-100' src={game.thumbnail} alt="" />
                    <div className="captionCard  d-flex justify-content-between align-items-center">
                      <h3 color='fw-bolder '>{game.title}</h3>
                      <button className='free me-2'>Free</button>
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
          {visable < allGame.length ?
            <button onClick={seeMore} className='seeMore'>
              See More
            </button>
          :''}
          
        </div>
      </div>
    </section>

  </>
}
