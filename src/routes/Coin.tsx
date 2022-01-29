import { useEffect, useState } from "react";
import { Link, useLocation, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import {Routes, Route} from "react-router-dom";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import {fetchCoinInfo , fetchCoinPrice} from "../api"
import {Helmet} from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome} from "@fortawesome/free-solid-svg-icons";
const Container = styled.div`
padding: 0px 20px;
max-width: 480px;
margin: 0 auto;
`
const Header = styled.header`
height: 10vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-bottom: 20px;
`;
const Title = styled.h1`
font-size: 48px;
color: ${props => props.theme.accentColor};
`
const Overview = styled.div`
display: flex;
justify-content: space-between;
background-color: rgba(0,0,0,0.5);
padding: 10px 20px;
border-radius: 10px;
`;
const OverviewItem = styled.div`
display: flex;
flex-direction: column;
align-items: center;
span:first-child{
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
}
`;
const Description = styled.p`
margin: 20px 0px;
`
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
const HomeButton = styled.div`
 color: ${props => props.theme.textColor};
 font-size: 20px;
`;
interface RouterState{
state: {
    name:string;
};
} 

interface InfoData{
    id: string;
    name: string;
    hash_algorithm:string;
    symbol: string;
    rank: number;
    description: string;
}

interface PriceData{
    id: string ;
    name: string ;
    symbol: string ;
    rank: number ;
    circulating_supply: number ;
    total_supply: number ;
    max_supply: number ;
    beta_value: number ;
    first_data_at: string ;
    last_updated: string ;
    quotes: {
        USD:{
            ath_date: string,
            ath_price: number,
            market_cap: number,
            price:number,
        }
    };
}
function Coin(){

    const {coinId} = useParams();
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    const {state} = useLocation() as RouterState; 
    const {isLoading: infoLoading , data:infoData} = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId!));
    const {isLoading: tickersLoading,data:tickersData } = useQuery<PriceData>(["tickers", coinId], () => fetchCoinPrice(coinId!));
    /*const [loading ,setLoading] = useState(true);
    const [info, setInfo] = useState<InfoData>();
    const [priceinfo, setPriceInfo] = useState<PriceData>();
 
    useEffect(()=>{
        (async ()=>{
            const infoData = await(await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
            const priceData = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
           setInfo(infoData);
           setPriceInfo(priceData);
           setLoading(false);
        })();
    }, []);*/
   const loading = infoLoading || tickersLoading;
    return (  
    <Container>
        <Helmet>
            <title>
                {state?.name ? state.name : loading ? "Loading": infoData?.name}
            </title>
        </Helmet>
        <Header>
     
            <Link to="/react-master-first-version">
                <HomeButton>
                <FontAwesomeIcon icon={faHome} />
                </HomeButton>
            </Link>
            
            <Title>{coinId}</Title>
        </Header>
  {loading ? "Loading..." : (
      <>
        <Overview>
            <OverviewItem>
                <span>Rank:</span>
                <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
                <span>Symbol:</span>
                <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
                <span>Price:</span>
                <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
        </Overview>    
            <Description>
                {infoData?.description}
            </Description>
         <Overview>   
            <OverviewItem>
                <span>Total Supply:</span>
                <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
                <span>Max Supply:</span>
                <span>{tickersData?.max_supply}</span>
            </OverviewItem>
        </Overview>
        <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

        <Routes>
            <Route path="price" element={ <Price/>}>
        </Route>
        <Route path="chart" element={<Chart coinId={coinId!}/>}>
        </Route>
    </Routes>
      </>
  )}
  </Container>
  )}
export default Coin;