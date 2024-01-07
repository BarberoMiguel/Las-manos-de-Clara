import React, { useContext } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { userContext } from "../../../context/authContext";
import Swal from 'sweetalert2';

const Login = () => {
  const { userstate, updateUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const datos = {
        email: result.user.email,
        nombre: result.user.displayName,
      };
      const opciones = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      };
      let emailSignedIn = await fetch("http://localhost:3000/google", opciones).then(
        (response) => response.json()
      );
      if (emailSignedIn.ok == "error") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se ha podido iniciar sesión"
        });
      } else {
        updateUser(emailSignedIn.user);
        Swal.fire({
          icon: "success",
          text: "Se ha iniciado sesión con éxito"
        }).then((result) => {
          navigate("/home")
        });
      }
    } catch (error) {
      updateUser(null)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se ha podido iniciar sesión"
      });
      console.error(error);
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    const email = e.target.email.value;
    const contraseña = e.target.password.value;
    let alert = "";
    if (!/^[A-Za-z\ ]{3,20}$/.test(nombre)) {
      alert +=
        "El nombre tiene que tener entre 3 y 20 caracteres y contener solo letras <br>";
    }
    if (!/^[\w\.-]+@[\w\.-]+\.\w{2,}$/.test(email)) {
      alert += "Introduce un email valido <br>";
    }
    if (!/^[A-Za-z0-9\-_#@]{6,30}$/.test(contraseña)) {
      alert +=
        "La contraseña tiene que ser alfanumerica entre 6 y 30 caracteres y puede contener (-,_,@,#) <br>";
    }
    if (alert.length > 0) {
      Swal.fire({
        icon: "error",
        html: alert,
      });
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, contraseña);
        await signInWithEmailAndPassword(auth, email, contraseña);
        const datos = {
          email: email,
          nombre: nombre,
        };
        const opciones = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        };
        let emailSignedIn = await fetch("http://localhost:3000/signUp", opciones).then(
          (response) => response.json()
        );
        if (emailSignedIn.ok == "error") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se ha crear el usuario"
          });
        } else if (emailSignedIn.ok == false) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ese usuario ya existe, prueba a iniciar sesión"
          });
        } else {
          updateUser(emailSignedIn.user);
          e.target.reset();
          Swal.fire({
            icon: "success",
            text: "Se ha iniciado sesión con éxito"
          }).then((result) => {
            navigate("/home")
          });
        }
      } catch (error) {
        updateUser(null)
        Swal.fire({
          icon: "error",
          title: "No se ha podido iniciar sesión",
          text: error
        });
        console.error(error);
      }
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const contraseña = e.target.password.value;
    let alert = "";
    if (!/^[\w\.-]+@[\w\.-]+\.\w{2,}$/.test(email)) {
      alert += "Introduce un email valido <br>";
    }
    if (!/^[A-Za-z0-9\-_#@]{6,30}$/.test(contraseña)) {
      alert +=
        "La contraseña tiene que ser alfanumerica entre 6 y 30 caracteres y puede contener (-,_,@,#) <br>";
    }
    if (alert.length > 0) {
      Swal.fire({
        icon: "error",
        html: alert,
      });
    } else {
      try {
        console.log("prueba1");
        await signInWithEmailAndPassword(auth, email, contraseña);
        console.log("prueba3");
        const datos = {
          email: email,
        };
        const opciones = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        };
        let emailSignedIn = await fetch("http://localhost:3000/login", opciones).then(
          (response) => response.json()
        );
        console.log(emailSignedIn);
        if (emailSignedIn.ok == "error") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se ha podido iniciar sesión"
          });
        } else if (emailSignedIn.ok == false) {
          Swal.fire({
            icon: "error",
            title: "Vaya...",
            text: "Este usuario no existe, registrate primero"
          });
        } else {
          updateUser(emailSignedIn.user);
          e.target.reset();
          Swal.fire({
            icon: "success",
            text: "Se ha iniciado sesión con éxito"
          }).then((result) => {
            navigate("/home")
          });
        }
      } catch (error) {
        updateUser(null)
        Swal.fire({
          icon: "error",
          title: "No se ha podido iniciar sesión",
          text: error
        });
        console.error(error);
      }
    }
  }

  return (
    <>
    <section id='loginContainer'>
      <section id='Signin'>
        <h1>Registrarse:</h1>
        <form onSubmit={handleSignin}>
          <label htmlFor="nombre">Nombre:</label><br />
          <input type="text" name='nombre' minLength={3} maxLength={20} required/> <br />
          <label htmlFor="email">Email:</label><br />
          <input type="email" name='email' required/> <br />
          <label htmlFor="password">Contraseña:</label><br />
          <input type="password" name='password' minLength={6} maxLength={30} required/> <br />
          <button type="submit">Registrarse</button>
        </form>
      </section>
      <section id='Login'>
        <h1>Iniciar sesión:</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label><br />
          <input type="email" name='email' required/> <br />
          <label htmlFor="password">Contraseña:</label><br />
          <input type="password" name='password'required/> <br />
          <button type="submit">Iniciar sesión</button>
        </form>
      </section>
    </section>
    
    <div id="google">
      <h1>Inicia sesión con google:</h1>
      <img onClick={handleGoogleSignIn} src="/google.png" alt="google"/>
    </div>
    </>
  );
};

export default Login;
