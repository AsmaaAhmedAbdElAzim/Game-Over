import React, { useEffect ,  useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Home() {
  const [randomGame, setRandomGame] = useState([])
 async function getRandomData(){
 

  const options = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/filter',
    params: {tag: '3d.mmorpg.fantasy.pvp', platform: 'pc'},
    headers: {
      'X-RapidAPI-Key': 'ee956e5f47msh980fe373efcfe76p1b2aecjsn906f396c876b',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    setRandomGame(response.data);
  }).catch(function (error) {
    console.error(error);
  });
  

  
  }

  console.log(randomGame.map((game)=> game.title));
  
  useEffect(()=>{
    getRandomData()
  },[])

  return <>
  <Helmet>
                <meta charSet="utf-8" />
                <title>Game Over</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
  <div className=" header">
    <div className="d-flex  align-items-center justify-content-center">
      <div className="text-header pt-5 text-center">
        <h1 className='fw-bolder py-2'>Find & track the best <span>free-to-play</span> games!</h1>
        <p className='text-muted'>Track what you've played and search for what to play next! Plus get free premium loot!</p>
        <button><Link to='/platforms/browser'>Browse Game</Link> </button>
      </div>
    </div>
  </div>

  <section className='randomGame mt-5'>
    <div className="randomCaption d-flex align-items-center ">
    <i class="fa-solid fa-robot fa-2x pe-2"></i>
    <h2>Personalized Recommendations</h2>
    </div>
    <div className="container my-5">
      <div className="row">
        {randomGame.splice(1,3).map((game,index)=>{ return<>
        
          <div className="col-md-4">
            <div className="gameCard">
            <img className='w-100' src={game.thumbnail} alt="" />
            <div className="captionCard  d-flex justify-content-between align-items-center">
              <h3 color='fw-bolder '>{game.title}</h3>
              <button className='free me-2'>Free</button>
            </div>
            </div>
          </div>
        </>
          
        })}
        
      </div>
    </div>
  </section>

  </>
}

