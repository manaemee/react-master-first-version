import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import {Helmet} from "react-helmet";

const Container = styled.div`
padding: 0px 20px;
max-width: 480px;
margin: 0 auto;
`
const Header = styled.header`
height: 10vh;
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 20px;
`;
const CoinList = styled.ul``;
const Coin = styled.li`
background-color: white;
color:${props => props.theme.bgColor};
padding: 20px;
margin-bottom: 10px;
border-radius: 15px;
a{
    display: block;
    display: flex;
    align-items: center;
}
&:hover{
    a{
        color: ${props => props.theme.hoverColor};
        font-weight: 800;
        font-size: 20px;
    }
}
`;
const Title = styled.h1`
font-size: 48px;
color: ${props => props.theme.accentColor};
`
const Img = styled.img`
width: 25px;
height: 25px;
margin-right: 10px;
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

function Coins(){
  /*  const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
      (async () => {
          const response = await fetch("https://api.coinpaprika.com/v1/coins");
          const json = await response.json();
          setCoins(json.slice(0,100));
          setLoading(false);
      })()
    }, []);*/
    const { isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);
    return (
        <Container>
                  <Helmet>
            <title>
           coins
            </title>
        </Helmet>
            <Header>
                <Title>Coins</Title>
            </Header>
          {isLoading ? "Loading..."  : (<CoinList>
               {data?.slice(0,50).map((coin)=>(
                   <Coin key={coin.id}>
                       <Link to={`/${coin.id}`} state={{ name: coin.name}}>
                       <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`}/>
                           {coin.name} &rarr;

                       </Link>
                   </Coin>
               ))}
            </CoinList>)}
        </Container>
    )
}
export default Coins;