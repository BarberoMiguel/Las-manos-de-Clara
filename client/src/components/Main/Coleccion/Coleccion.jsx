import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import { userContext } from "../../../context/authContext";
import { useParams } from 'react-router-dom';
import Producto from "../Producto/Producto";

const Coleccion = () => {
  const [data, setData] = useState(null);
  const [busqueda, setBusqueda] = useState(null);
  const { userstate } = useContext(userContext);

  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/Products`);
        const result = await response.json();
        console.log(result);
        setData(result)
      } catch (error) {
        setData(null)
      }
    }
    fetchData()
  }, []);

  useEffect(() => {
    if (data != null) {
      setBusqueda(data.filter(el => el.coleccion == id))
    }
  }, [data, id]);

  const paintBusqueda = () => {
    if (busqueda != null) {
      return busqueda.map(producto => (
        <Producto
          key={producto.id}
          id={producto.id}
          imagen={producto.imagenes[0]}
          nombre={producto.nombre}
          coleccion={producto.coleccion}
          precio={producto.precio}
        />
      ));
    }
  };
  

  return (
    <>
      <section id='searchContainer'>
        {userstate != null && userstate.admin == true ? (
          <Link to='/create'>
            <button>Crear Producto</button>
          </Link>
        ) : (<></>)}
        {paintBusqueda()}
      </section>
    </>
  );
};

export default Coleccion;
