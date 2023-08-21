import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { Helmet } from 'react-helmet';
export default function DescriptionGame() {
  let allParams = useParams();
  let idSectorGame = allParams.id;

  const [gamesById, setGamesById] = useState([])

  async function getGameById(id) {
    const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
      params: { id },
      headers: {
        'X-RapidAPI-Key': 'ee956e5f47msh980fe373efcfe76p1b2aecjsn906f396c876b',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      setGamesById(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }

  useEffect(() => {
    getGameById(idSectorGame)
  }, [])
  
  return <>
  <Helmet>
                <meta charSet="utf-8" />
                <title>{gamesById.title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
    <div className="container mt-5">
      <div className="row">
      
        <div className="col-md-4">
          <div className="img-game">
            <img src={gamesById.thumbnail} className='w-100' />
            <div className=" d-flex justify-content-between mt-2">
              <button className='playNow'>
                <a href={gamesById.game_url}>Play Now </a>
              </button>
              <div className="disc-free free w-25 text-center">Free</div>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="description-game">
            <h3>{gamesById.title}</h3>
            <p>{gamesById.description}</p>
            gamesById.minimum_system_requirements
              <h3 className='py-3'>Minimum System Requirements</h3>
            <span className='d-block'><h6 className='fw-bolder d-inline' >Graphics :</h6>{gamesById.minimum_system_requirements?.graphics}</span>
            <span className='d-block'><h6 className='fw-bolder d-inline' >Memory :</h6>{gamesById.minimum_system_requirements?.memory}</span>
            <span className='d-block mb-4'><h6 className='fw-bolder d-inline'>Os :</h6>{gamesById.minimum_system_requirements?.os}</span> 
             

             

<Carousel controls={false} indicators={false}>
      <Carousel.Item>
      <div>
            {gamesById.screenshots ? (
              <img 
              src={gamesById.screenshots[0]?.image}
              className='d-block w-100'
              alt='screenshot'/>
            ):(
              <img
              src='./../../puplic/img/gaming.ebaf2ffc84f4451d.jpg'
              className='d-block w-100'
              alt='screenshot'
              />

            )}
          </div>
      </Carousel.Item>
      <Carousel.Item>
      <div>
            {gamesById.screenshots ? (
              <img 
              src={gamesById.screenshots[1]?.image}
              className='d-block w-100'
              alt='screenshot'/>
            ):(
              <img
              src='./../../puplic/img/gaming.ebaf2ffc84f4451d.jpg'
              className='d-block w-100'
              alt='screenshot'
              />

            )}
          </div>
      
      </Carousel.Item>
      <Carousel.Item>
      <div>
            {gamesById.screenshots?(
              <img 
              src={gamesById.screenshots[2]?.image}
              className='d-block w-100'
              alt='screenshot'/>
            ):(
              <img
              src='./../../puplic/img/gaming.ebaf2ffc84f4451d.jpg'
              className='d-block w-100'
              alt='screenshot'
              />

            )}
          </div>

        
      </Carousel.Item>
    </Carousel>
 
            <h3 className='py-3 mt-4'>Additional information</h3>
            <div className='row g-4'>
              <div className="col-md-4">
                <div className="add">
                  <h6>Title</h6>
                  <p>{gamesById.title}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="add">
                  <h6>Developer</h6>
                  <p>{gamesById.developer}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="add">
                  <h6>Publisher</h6>
                  <p>{gamesById.publisher}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="add">
                  <h6>Release_date</h6>
                  <p>{gamesById.release_date}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="add">
                  <h6>Genre</h6>
                  <p>{gamesById.genre}</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="add">
                  <h6 >Platform</h6>
                  <div className="addInfo d-flex ">
                    <p>{gamesById.platform}</p>
                    <i class="fa-brands fa-windows px-3 "></i>
                  </div>
                  
                </div>
              </div>


            </div>

          </div>
        </div>
      </div>
    </div>
  </>
}

