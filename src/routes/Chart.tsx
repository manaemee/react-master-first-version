import { useQuery } from "react-query";
import {fetchCoinHistory} from "../api";
import ApexChart from "react-apexcharts";
interface ChartProps{
    coinId : string;
};
interface IHistorical{
time_open: string;
time_close:string;
open: number;
high: number;
low: number;
close: number;
volume: number;
market_cap: number;
}
function Chart({coinId}: ChartProps){
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId],
     ()=> fetchCoinHistory(coinId!),
    {
        refetchInterval: 10000,
      }
    );
   /* return <div>{isLoading ? "Loading..." : 
   ( <ApexChart type="line" 
   series={[
       {
           name:"price",
           data: data?.map(price => price.close.toFixed(3)),
       }
   ]}
                options={{
                    theme:{
                        mode:"dark",
                    },
                    chart:{
                        height:500,
                        width:500,
                        toolbar:{
                            show:false,
                        },
                        background: "transparent",
                    
                    },
                    grid:{
                        show:false,
                    },
                    
                    stroke:{
                        curve: "smooth",
                        width: 3,
                    },
                    fill:{
                        type:"gradient", 
                        gradient:{gradientToColors:["#8c7ae6"],
                        stops:[0,100],
                    },
                    },
                    colors:[
                        "#4cd137"
                    ],
                    tooltip:{
                        y:{
                            formatter:(value) => `$ ${value.toFixed(3)}`,
                        }    
                    },
                    xaxis:{
                        axisTicks:{show:false},
                 
                        type:"datetime",
                        categories: data?.map((price)=> price.time_close),
                    }
                }}
    />
    )}
    </div>;*/
return  (
    <div>
        {isLoading ? "Laoding..." : 
        <ApexChart
        type="candlestick"
        series={
            [
                {
                  data: 
                    
                        data?.map(d => ({
                            x:d.time_open,
                            y:[d.open, d.high, d.low, d.close],
                        })),
                      
                  
                },
              ]
        }
        options={{
            
            theme:{
                mode:"dark",
            },
           chart: {
                type: 'candlestick',
                height: 500,
                toolbar:{
                    show:false,
                },
                background: "transparent",
              },

              xaxis: {
                type: 'datetime',
                
              },
              yaxis: {
                labels:{
                    formatter:(value) => `$ ${value.toFixed(3)}`,
                },
                tooltip: {
                  enabled: true
                }
              },
       
        }}
        />}
    </div>
)

}
 
 export default Chart;