import React from "react";
import { useContext } from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { signOut } from '../../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { userContext } from "../../context/authContext";
import { ThemeContext } from "../../context/ThemeContext";
import Swal from 'sweetalert2';

const Header = () => {
  const { userstate, updateUser } = useContext(userContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/coleccion`);
        const result = await response.json();
        setData(result)
      } catch (error) {
        setData(null)
      }
    }
    fetchData()
  }, []);

  const handleLogin = async () => {
    if (userstate != null) {
      Swal.fire({
        title: "¿Quieres cerrar sesión?",
        showDenyButton: true,
        confirmButtonText: "Sí",
        denyButtonText: `No`
      }).then((result) => {
        if (result.isConfirmed) {
          async function logout() {
            await signOut();
            let respuesta = await fetch("http://localhost:3000/logout").then(res => res.json())
            if (respuesta == "success") {
              updateUser(null);
              Swal.fire("Se ha cerrado sesión con éxito", "", "success");
            } else {
              Swal.fire("No se ha podido cerrar sesión", "", "error");
            }
          }
          logout()
        }
      });
    } else {
      navigate("/login");
    }
  };

  const toggleMenu = () => {
    document.getElementById("MenuLateral").classList.toggle("hide");
  }

  const colecciones = () => {
    if (data != null) {
      return data.map(c => (
        <li><Link to={`/coleccion/${c.coleccion}`}><h1>{`${c.coleccion}`}</h1></Link></li>
      ));
    }
  };

  return (
    <>
    <section id="header" onMouseOver={toggleTheme} onMouseOut={toggleTheme}>
      {theme == "light" ? (
        <img id="Menu" src="/MenuLight.png" onClick={toggleMenu}/>
      ) : (
        <img id="Menu" src="/MenuDark.png" onClick={toggleMenu}/>
      )}
      <Link to='/home'>
        <img src="/favicon.png"/>
      </Link>
      <section id="MenuDerecha">
        {theme == "light" ? (
          <Link to='/search'>
            <img src="/searchLight.png"/>
          </Link>
        ) : (
          <Link to='/search'>
            <img src="/searchDark.png"/>
          </Link>
        )}
        {theme == "light" ? (
          <img src="/loginLight.png" onClick={handleLogin}/>
        ) : (
          <img src="/loginDark.png" onClick={handleLogin}/>
        )}
        {theme == "light" ? (
          <Link to='/carrito'>
            <img src="/carritoLight.png"/>
          </Link>
        ) : (
          <Link to='/carrito'>
            <img src="/carritoDark.png"/>
          </Link>
        )}
      </section>
    </section>
    <section id="MenuLateral" className="hide">
      <section id="menuContent">
          <ul>
              <li><Link to='/search'><h1>Buscar</h1></Link></li>
              {colecciones()}
              <li><Link to='/carrito'><h1>Carrito</h1></Link></li>
          </ul>
      </section>
    </section>
    </>
  );
};

export default Header;
