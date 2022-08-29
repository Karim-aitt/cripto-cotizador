import { useState, useEffect } from 'react'
import styled from '@emotion/styled'

import { Formulario } from './components/Formulario'
import { Resultado } from './components/Resultado'
import Spinner from './components/Spinner'

import ImagenCripto from "./img/imagen-criptos.png"
// Aqui se crean los style components

const Heading = styled.h1`
  font-family: "Lato", sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  /* PseudoElemento de linea azul bajo el heading */
  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  /* Responsive para movil */
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 2rem;
  }
`
const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Footer = styled.div`
  display: flex;
  justify-content: center;
  color: #FFF;
  margin-top: 50px;
`

function App() {

  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)


  useEffect(() => {
    // Con este if y el objetc keys prevenimos que se cargue al iniciar, solo cuando se
    // activa cuando el state monedas varia.
    if(Object.keys(monedas).length >0){
      const cotizarCripto = async () => {
        setCargando(true)
        setResultado({})
        const {moneda , criptoMoneda } = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`
        
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        // Inyeccion dinamica
        setResultado(resultado.DISPLAY[criptoMoneda][moneda])
        setCargando(false)
      }
      cotizarCripto()
    }
  }, [monedas])

  return (
    <>
      <Contenedor>
        <Imagen 
        src={ImagenCripto}
        alt="Imagen Criptomonedas"
        >
        </Imagen>
        <div>
          <Heading>Cotiza Criptomonedas al Instante</Heading>
          <Formulario 
            setMonedas={setMonedas}
          />
          {cargando && <Spinner />}
          {resultado.PRICE  && <Resultado resultado={resultado} />}
        </div>
        
      </Contenedor>

      <Footer>
          <p>Creado por <a href='https://github.com/Karim-aitt' target="_blank">Karim Gonzalez</a> 2022</p>
      </Footer>
    </>
  )
}

export default App
