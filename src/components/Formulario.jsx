import {useState, useEffect} from 'react'
import styled from '@emotion/styled'
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


export const Formulario = () => {

    // Para almacenar los valores de las monedas
    const [criptos, setCriptos] = useState([])

    // Parametro que toma de valor inicial como useState "Elige tu moneda"
    // un array destructuring desestructura segun indice no por nombre(moneda es state)
    // object destructuring si es por nombre.
    const [moneda, SelectMonedas] = useSelectMonedas("Elige tu moneda", monedas)
    // const [SelectCriptoMonedas] = useSelectMonedas("Elige tu Criptomoneda")


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

  return (
    <form>
        <SelectMonedas 

        />
        
        {/* <SelectCriptoMonedas /> */}

        <InputSubmit 
        type="submit" 
        value="Cotizar"

        />
    </form>
  )
}
