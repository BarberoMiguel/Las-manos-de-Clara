import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import { userContext } from "../../../context/authContext";
import Producto from "../Producto/Producto";

const Search = () => {
  const [data, setData] = useState(null);
  const [coleccion, setColeccion] = useState(null);
  const [busqueda, setBusqueda] = useState(null);
  const { userstate } = useContext(userContext);
  console.log(userstate);

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
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/coleccion`);
        const result = await response.json();
        setColeccion(result)
      } catch (error) {
        setColeccion(null)
      }
    }
    fetchData()
  }, []);

  const Filter = (e) => {
    e.preventDefault();
    let parametros = e.target.parametros.value;
    let coleccionesB = e.target.coleccion.value;
    let datos = data;
    if (parametros.length > 0) {
      datos = datos.filter(el => el.nombre.toLowerCase().includes(parametros.toLowerCase()))
    }
    if (coleccionesB != "Todas") {
      datos = datos.filter(el => el.coleccion == coleccionesB)
    }
    setBusqueda(datos);
  }

  const colecciones = () => {
    if (coleccion != null) {
      return coleccion.map(c => (
        <option value={`${c.coleccion}`}>{`${c.coleccion}`}</option>
      ));
    }
  };

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
        <form onSubmit={Filter}>
          <section>
            <button type="submit">Buscar</button>
          </section>
          <section>
            <input type="text" name="parametros" placeholder='Introduce el contenido de la busqueda:' /><br />
            <label htmlFor="coleccion">Coleccion:</label>
            <select name="coleccion">
              <option value="Todas">Todas</option>
              {colecciones()}
            </select>
          </section>
        </form>
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

export default Search;
