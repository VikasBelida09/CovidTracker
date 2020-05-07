import React,{useState,useEffect} from 'react'
import { fetchDailyData } from '../../api'
import {Line,Bar} from 'react-chartjs-2'
import styles from './Charts.module.css'
export default function Charts({data:{confirmed,deaths,recovered},country}) {
    const [dailydata, setdailydata] = useState([])
    useEffect(() => {
        const fetchAPI=async()=>{
              setdailydata(await fetchDailyData())
        }
        fetchAPI()
        console.log(dailydata)
    }, [])

    const lineChart=()=>{
      return (
          dailydata[0] ? (
              <Line
              data={
                  {
                    labels:dailydata.map(({date})=>date),
                    datasets:[{
                       data:dailydata.map(({confirmed})=>confirmed),
                       label:'Infected',
                       borderColor:'#3333ff',
                       fill:true
                    },{
                       data:dailydata.map(({deaths})=>deaths),
                       label:'Deaths',
                       borderColor:'red',
                       backgroundColor:'rgba(255,0,0,0.5)',
                       fill:true                        
         
                    }]
                  }
              }
              >
              </Line>
          ):null
      )
    }
    const barchart=()=>{
        return(
            confirmed ?(
                    <Bar
                      data={
                          {
                            labels:['Infected','recovered','deaths'],
                            datasets:[{
                               label:'People',
                                backgroundColor:[
                                    'rgba(0,0,255,0.5)',
                                    'rgba(0,255,0,0.5)',
                                    'rgba(255,0,0,0.5)',
                                ],
                                data:[confirmed.value,recovered.value,deaths.value]      
                            }],
                            options:[{
                                legend:{display:false},
                                title:{display:true,text:`current state in ${country}`}
                            }]

                          }
                      }
                    >
                    </Bar>
            ):null
        )
    }
    return (
        <div className={styles.container}>
            {country?barchart():lineChart()}   
        </div>
    )
}
