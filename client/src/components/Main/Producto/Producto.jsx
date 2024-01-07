import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from "../../../context/authContext";
import Swal from 'sweetalert2';

const Producto = ({id,imagen,nombre,coleccion,precio}) => {
  const { userstate } = useContext(userContext);

  const deleteProduct = () => {
    Swal.fire({
      title: "¿Seguro que quieres eliminar este producto?",
      showDenyButton: true,
      confirmButtonText: "Sí",
      denyButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        async function deleteP() {
          const opciones = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          };
          let productDeleted = await fetch(`http://localhost:3000/admin/borrarProducto/${id}`, opciones).then(
            (response) => response.json()
          );
          if (productDeleted == "success") {
            Swal.fire("Se ha eliminado el producto con éxito", "", "success");
          } else {
            Swal.fire("No se ha podido eliminar el producto", "", "error");
          }
        }
        deleteP()
      }
    });
  };

  return (
    <>
      <Link to={`/detalle/${id}`} style={{ textDecoration: 'none', color: "black"}}>
        <section className='product'>
          <img src={`${imagen}`}/>
          <section>
            <h1>{nombre}</h1><br />
            <h4>Colección: {coleccion}</h4><br />
            <h1 className='precio'>{precio} €</h1>
            {userstate != null && userstate.admin == true ? (
              <section id="adminButtons">
              <Link to={`/edit/${id}`}>
                <img src="/edit.png"/>
              </Link>
              <img src="/delete.png" onClick={deleteProduct}/>
              </section>
            ) : ( <></> )}
          </section>
        </section>
      </Link>
    </>
  )
};

export default Producto;
