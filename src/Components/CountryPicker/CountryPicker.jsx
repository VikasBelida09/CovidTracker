import React,{useState,useEffect} from 'react'
import {NativeSelect, FormControl} from '@material-ui/core'
import styles from './CountryPicker.module.css'
import { fetchcountries } from '../../api'

export default function CountryPicker({handleCountryChange}) {
    const [countriess, setcountriess] = useState([])
    useEffect(() => {
        const fetchedCountries=async()=>{
               setcountriess(await fetchcountries())
        }
        fetchedCountries()
    }, [setcountriess ])
    console.log(countriess)
    return (
        <div>
           <FormControl className={styles.formControl}>
               <NativeSelect defaultValue="" onChange={(e)=>{handleCountryChange(e.target.value)}}>
                   <option value="">Global</option>
                   {countriess.map((country,i)=><option key={i} value={country}>{country}</option>)}
               </NativeSelect>   
           </FormControl>
        </div>
    )
}
