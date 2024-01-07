import React, { useContext } from 'react';
import { useState, useEffect } from "react";
import { userContext } from "../../../context/authContext";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Detalle = () => {
  const [data, setData] = useState(null);
  const [comentarios, setComentarios] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [component, setComponent] = useState(false);
  const [imagen, setImagen] = useState(null);
  const { userstate } = useContext(userContext);

  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/detalle/${id}`);
        const result = await response.json();
        console.log(result[0]);
        setData(result[0])
      } catch (error) {
        setData(null)
      }
    }
    fetchData()
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/comentarios/${id}`);
        const result = await response.json();
        console.log(result);
        setComentarios(result)
      } catch (error) {
        setComentarios(null)
      }
    }
    fetchData()
  }, [refresh]);

  const imagenGrande = () => {
    if (imagen != null) {
      return (
        <img src={`${imagen}`} />
      )
    }
  };

  const toggleImagen = (imagenA) => {
    setImagen(imagenA)
  }

  const imagenes = () => {
    return data.imagenes.map(imagenA => (
      <img src={`${imagenA}`} onMouseOver={() => toggleImagen(imagenA)}/>
    ));
  };

  const PaintProduct = () => {
    if (data != null) {
      return (
        <section id='detalles'>
          <section id='detallesImg'>
            <section id='imagenGrande'>{imagenGrande()}</section>
            <section id='seccionimagenes'>{imagenes()}</section>
          </section>
          <section id='detallesInfo'>
            {data.stock > 0 ? (
              <h1 id='stock' className='green'>EN STOCK</h1>
            ) : ( <h1 id='stock' className='red'>SIN STOCK</h1>)}
            <h1 id='title'>{`${data.nombre}`}</h1>
            <h2>Colección: {`${data.coleccion}`}</h2>
            <h3>Descripción:</h3>
            <p>{`${data.descripcion}`}</p>
            <section>
              <h1 id='precio'>{`${data.precio}`} €</h1>
              {data.stock > 0 ? (
              <button onClick={toggleComponent}>Añadir al carrito</button>
            ) : ( <button disabled >Añadir al carrito</button> )}
            </section>
          </section>
        </section>
      )
    } else {
      return (<h1>Cargando</h1>)
    }
  }

  const comentariosSubmit = async (e) => {
    e.preventDefault();
    let comentario = e.target.comentario.value;
    if (comentario.length == 0) {
      Swal.fire("Tienes que escribir un comentario para poder publicarlo", "", "error");
    } else {
      if (!/^[A-Za-z0-9\,.¡!?¿]+(?:\s*[A-Za-z0-9\,.¡!?¿]+)*$/.test(comentario)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El comentario solo puede contener caracteres alfanumericos, puntos y comas"
        });
      } else {
        const datos = {
          comentario: comentario,
        };
        const opciones = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        };
        let comentarioPosted = await fetch(`http://localhost:3000/admin/comentarios/${id}`, opciones).then(
          (response) => response.json()
        );
        if (comentarioPosted == "success") {
          Swal.fire("Se ha publicado el comentario con éxito", "", "success");
          setRefresh(!refresh);
        } else {
          Swal.fire("No se ha podido publicar el comentario", "", "error");
        }
      }
    }
  };

  const comentariosSection = () => {
    if (comentarios != null && comentarios.length > 0) {
      return comentarios.map(comentario => (
        <section className='comentario'>
          {userstate != null && userstate.admin == true ? (
            <img src="/delete.png" onClick={handleDelete(comentario.comNum)}/>
          ) : (<></>)}
          <h4><b>{`${comentario.nombre_usuario}`}</b></h4>
          <p>{`${comentario.comentario}`}</p>
        </section>
      ));
    } else {
      return (
        <h2>No hay comentarios todavía. Se el primero en comentar</h2>
      )
    }
  };

  const handleDelete = (comNum) => {
    Swal.fire({
      title: "¿Seguro que quieres eliminar este comentario?",
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        async function deleteC() {
          const opciones = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          };
          let comentarioDeleted = await fetch(`http://localhost:3000/borrarComentario/${comNum}`, opciones).then(
            (response) => response.json()
          );
          if (comentarioDeleted == "success") {
            Swal.fire("Se ha eliminado el comentario con éxito", "", "success");
            setRefresh(!refresh);
          } else {
            Swal.fire("No se ha podido eliminar el comentario", "", "error");
          }
        }
        deleteC()
      }
    });
  };

  const toggleComponent = () => {
    setComponent(!component);
  }

  const añadirCarrito = (e) => {
    e.preventDefault();
  }

  const Colores = () => {
    if (data != null) {
      return data.color.map( (c, index) => (
        <option value={`${c}`} key={index} style={{ backgroundColor: c , color: c }}>{c}</option>
      ));
    } 
  };

  return (
    <>
      <section id='detalleContainer'>
        {PaintProduct()}
        <section id='comentarios'>
          <h1>Comentarios:</h1>
          {userstate != null ? (
            <form onSubmit={comentariosSubmit}>
              <button type="submit">Publicar</button>
              <label htmlFor="comentario">Escribe tu comentario:</label>
              <textarea name="comentario" cols="30" rows="5"></textarea>
            </form>
          ) : (<h2>Tienes que iniciar sesión para poder comentar</h2>)}
          {comentariosSection()}
        </section>
        {component ? (
            <section id='añadirCarrito'>
              <h1>Elige las características del pruducto</h1>
              <form onSubmit={añadirCarrito}>
                <label htmlFor="color">Color:</label>
                <select name="color">
                  {Colores()}
                </select>
                <label htmlFor="talla">Talla:</label>
                <select name="talla">
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select> <br />
                <button type="submit" className='Add'>Añadir al Carrito</button>
                <button onClick={toggleComponent} className='Cancel'>Cancelar</button>
              </form>
            </section>
          ) : (<></>)}
      </section>
    </>
  );
};

export default Detalle;
