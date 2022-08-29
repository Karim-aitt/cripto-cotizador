import styled from "@emotion/styled"

const Contenedor = styled.div`
    color: #fff;
    font-family: "Lato", sans-serif;

    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`
const Texto = styled.p`
    font-size: 18px;

    span {
        color: #66A2FE;
        font-weight: 700;
    }

`
const Precio = styled.p`
    font-size: 24px;

    span {
        color: #66A2FE;
        font-weight: 700;
    }

`
const Imagen = styled.img`
    display: block;
    width: 120px;
`


export const Resultado = ({resultado}) => {
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = resultado

  return (
    <Contenedor>
        <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="imagen cripto"></Imagen>
        <div>
            <Precio>El precio es de: <span>{PRICE}</span></Precio>
            <Texto>Precio más alto del día: <span>{HIGHDAY}</span></Texto>
            <Texto>Precio más bajo del día: <span>{LOWDAY}</span></Texto>
            <Texto>Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Texto>
            <Texto>Última Actualización: <span>{LASTUPDATE}</span></Texto>
        </div>
    </Contenedor>
  )
}