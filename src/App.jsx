//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"
import { useState, useEffect } from 'react'
//import Paciente from "./components/Paciente";

//El <> y </> alrededor del contenido del return indican que esos elementos 
//(en este caso, un <div> con una etiqueta <h1>) son parte de un fragmento 
//y no se traducirán en un nodo adicional en el 

//JSX - Javascript sintax extension
/*
  Es un lenguaje de templates que muestra el HTML, pero tiene todas las funciones de javascript
  -JSX es un lenguaje estricto
  -Cada componente debe tener un return
  -Puedes usar fragments para evitar tanto codigo HTML <> </>
  -{ Dentro de estas javes, se puede ingresar codigo JavaScript }
*/

function App() {
  //Aqui todas las funciones de JS que quieras, para hacer validaciones, procesar datos, etc...

  //const [count, setCount] = useState(0)
  //Todas las funciones deben de tener un return, ya que es lo que se va a mostrar en pantalla
  //Dentro del return puedes usar ternarios, pero no ifs

  //En nuevas versiones de react ya no es necesario crear un useEffect, se puede poner directamente en el useState
  const [pacientes, setPacientes] = useState(JSON.parse(localStorage.getItem('pacientes')) ?? []);
  const [paciente, setPaciente] = useState({});

  /*

  Este effect ya no es necesario, se puede colocar directamente en el useState de pacientes la implementacion 
  del localStorage

  useEffect(() => {
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      console.log('Datos recuperados del localStorage:', pacientesLS);
      setPacientes(pacientesLS);
    }
    obtenerLS();
  }, []);
  */

  //Este efect detecta lo que hay en setPaciente, se sincroniza y ya no se reinicia al recargar
  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes]);

  
  const eliminarPaciente = id => {
    
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id);
    setPacientes(pacientesActualizados)
    
  }
  //Props, sirven para pasar los states entre componentes, se pasan de padre a hijo, no de hijo a padre
  

  return (
    <div className="container mx-auto mt-20"> {/*Este fragment es el elemento con el nivel mas alto, los elementos dentro de el son sus hijos */}
      
     
      <Header/>

      <div className="mt-12 md:flex">
          <Formulario 
              pacientes = {pacientes}
              setPacientes = {setPacientes}
              paciente = {paciente}
              setPaciente={setPaciente}
          />
          <ListadoPacientes 
            pacientes={pacientes}
            setPaciente={setPaciente}
            eliminarPaciente={eliminarPaciente}
          />
      </div>

      
    </div>

    
  )
}

export default App
