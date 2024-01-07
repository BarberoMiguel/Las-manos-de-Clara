import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

  

  return (
    <>
      <Link to={`/coleccion/Verano`} style={{ textDecoration: 'none' }}>
        <section className='homeContainer' id='verano'>
          <h1>Colección de verano</h1>
        </section>
      </Link>
      <Link to={`/coleccion/Primavera`} style={{ textDecoration: 'none' }}>
        <section className='homeContainer' id='primavera'>
          <h1>Colección de primavera</h1>
        </section>
      </Link>
    </>
  );
};

export default Home;
