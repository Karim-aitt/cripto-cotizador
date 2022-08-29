import {useState, useEffect} from 'react'
import styled from '@emotion/styled'

import { Error } from './Error'
import { useSelectMonedas } from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'


const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`


export const Formulario = ({setMonedas}) => {

    // Para almacenar los valores de las monedas
    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    // Hook que toma parametros de valor inicial como useState "Elige tu moneda" (label) y un array de valores
    // un array destructuring desestructura segun indice no por nombre(moneda es state)
    // object destructuring si es por nombre.
    const [moneda, SelectMonedas] = useSelectMonedas("Elige tu moneda", monedas)
    const [criptoMoneda, SelectCriptoMoneda] = useSelectMonedas("Elige tu Criptomoneda", criptos)


    useEffect(() => {
        // Fetch a la api para conseguir las 10 criptos
        const consultarAPI = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
            const respuesta = await fetch(url);
            const resultado = await respuesta.json()
        
        // Almacenamos los valores que queremos de la respuesta en un objeto
            const arrayCriptos = resultado.Data.map(cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto
            })
            // Guardamos la info en un state
            setCriptos(arrayCriptos)
        };
        consultarAPI();
    },[])

    // Validacion formulario
    const handleSubmit = (e) => {
        e.preventDefault()
        if([moneda, criptoMoneda].includes("")){
            setError(true)
            return
        }
        setError(false)
        setMonedas({
            moneda,
            criptoMoneda
        })
    }

  return (
    <>
        {error && <Error>Todos los campos son obligatorios</Error>}
        <form
        onSubmit={handleSubmit}
        >
            <SelectMonedas 

            />
            
            <SelectCriptoMoneda 

            />

            <InputSubmit 
            type="submit" 
            value="Cotizar"

            />
        </form>
    </>
  )
}
