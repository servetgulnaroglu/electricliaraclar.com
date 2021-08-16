import Head from 'next/head'
import { useEffect, useState } from 'react';
import SingleCarLayout from '../components/singlecarlayout';
import Filter from '../components/filter'
import { getCarsSorted} from '../lib/cars';
import css from '../styles/singlecarlayout.module.css';
import SORTING_METHODS from '../lib/sortContsants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const initialSortingMethod = SORTING_METHODS.ALPHABETIC
export async function getServerSideProps() {
  // Fetch data from external API
  const cars = await getCarsSorted(initialSortingMethod);
  // Pass data to the page via props
  return { props: { cars } }
}

export default function Home({cars}) {
  const [filterType, setFilterType] = useState(initialSortingMethod)
  const [carsState, setCarsState] = useState(cars);

  
  return (
    <div className="container">
      <Head>
        <title>Electricli Araclar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={css.centerMax1024}>
        <div className={css.carsHeader}>
          <h1>Tüm Elektrikli Araçlar</h1>
          <h5>{cars.length} araç</h5>
          <div className={css.carsFilter}>
            <div className={css.dropdown}>
              <button className={css.dropbtn}>{filterTypeToString(filterType)}</button>
              <div className={css.dropdownContent}>
                {Object.keys(SORTING_METHODS).map((method)=>{
                  return <a href="#" key={method} onClick={()=>{
                    setFilterType(method);
                    setCarsState(sortJsonAsArray(method,carsState))
                  }}>{filterTypeToString(method)}</a>
                })
                }
              </div>
            </div>
          </div>
        </div>
        <div className={css.centerMax1024}>
          {carsState.map(element => {
            return <SingleCarLayout key={element.model}  car={element} home/>
          })}
        </div>
      </div>
    </div>
  )
}

function filterTypeToString(filterType){
  switch(filterType){
    case SORTING_METHODS.ALPHABETIC:
      return "Alfabetik";
    break;
    case SORTING_METHODS.PRICE_LOW_TO_HIGH_DE:
      return "Fiyat Azdan Çoğa - Almanya";
    break;
    case SORTING_METHODS.PRICE_HIGH_TO_LOW_DE:
      return "Fiyat Çoktan Aza - Almanya";
    break;
    case SORTING_METHODS.PRICE_LOW_TO_HIGH_NL:
      return "Fiyat Azdan Çoğa - Hollanda ";
    break;
    case SORTING_METHODS.PRICE_HIGH_TO_LOW_NL:
      return "Fiyat Çoktan Aza - Hollanda";
    break;
    case SORTING_METHODS.PRICE_LOW_TO_HIGH_GB:
      return "Fiyat Azdan Çoğa - Birleşik Krallık";
    break;
    case SORTING_METHODS.PRICE_HIGH_TO_LOW_GB:
      return "Fiyat Çoktan Aza - Birleşik Krallık";
    break;
    case SORTING_METHODS.RANGE:
      return "Menzil";
    break;
    case SORTING_METHODS.EFFICIENCY:
      return "Verim";
    break;
    case SORTING_METHODS.FASTCHARGING:
      return "Hızlı Şarj";
    break;
    case SORTING_METHODS.ACCELERATION:
      return "Hızlanma";
    break;
    default:
      return "none";
    break;
  }
}


function sortJsonAsArray(as, arr){
  switch(as){
      case SORTING_METHODS.ALPHABETIC:
          arr.sort((a,b)=>{
              return a.model.localeCompare(b.model);
          })
      break;
      case SORTING_METHODS.PRICE_LOW_TO_HIGH_DE:
          arr.sort((a,b)=>{
              if(a.price.germany.value == "Not Available"){
                  return -1;
              }
              if(b.price.germany.value == "Not Available"){
                  return 1;
              }
              var aVal = parseInt(a.price.germany.value.
              substring(1, a.price.germany.value.indexOf(",")))
              var bVal = parseInt(b.price.germany.value.
              substring(1, b.price.germany.value.indexOf(",")))

              return aVal - bVal;
          })
      break;
      case SORTING_METHODS.PRICE_HIGH_TO_LOW_DE:
          arr.sort((a,b)=>{
              if(a.price.germany.value == "Not Available"){
                  return 1;
              }
              if(b.price.germany.value == "Not Available"){
                  return -1;
              }
              var aVal = parseInt(a.price.germany.value.
              substring(1, a.price.germany.value.indexOf(",")))
              var bVal = parseInt(b.price.germany.value.
              substring(1, b.price.germany.value.indexOf(",")))

              return bVal - aVal;
          })
      break;
      
      
      case SORTING_METHODS.PRICE_LOW_TO_HIGH_NL:
          arr.sort((a,b)=>{
              if(a.price.theNetherlands.value == "Not Available"){
                  return -1;
              }
              if(b.price.theNetherlands.value == "Not Available"){
                  return 1;
              }
              var aVal = parseInt(a.price.theNetherlands.value.
              substring(1, a.price.theNetherlands.value.indexOf(",")))
              var bVal = parseInt(b.price.theNetherlands.value.
              substring(1, b.price.theNetherlands.value.indexOf(",")))

              return aVal - bVal;
          })
      break;
      case SORTING_METHODS.PRICE_HIGH_TO_LOW_NL:
          arr.sort((a,b)=>{
              if(a.price.theNetherlands.value == "Not Available"){
                  return 1;
              }
              if(b.price.theNetherlands.value == "Not Available"){
                  return -1;
              }
              var aVal = parseInt(a.price.theNetherlands.value.
              substring(1, a.price.theNetherlands.value.indexOf(",")))
              var bVal = parseInt(b.price.theNetherlands.value.
              substring(1, b.price.theNetherlands.value.indexOf(",")))

              return bVal - aVal;
          })
      break;
      
      
      case SORTING_METHODS.PRICE_LOW_TO_HIGH_GB:
          arr.sort((a,b)=>{
              if(a.price.unitedKingdom.value == "Not Available"){
                  return -1;
              }
              if(b.price.unitedKingdom.value == "Not Available"){
                  return 1;
              }
              var aVal = parseInt(a.price.unitedKingdom.value.
              substring(1, a.price.unitedKingdom.value.indexOf(",")))
              var bVal = parseInt(b.price.unitedKingdom.value.
              substring(1, b.price.unitedKingdom.value.indexOf(",")))

              return aVal - bVal;
          })
      break;
      case SORTING_METHODS.PRICE_HIGH_TO_LOW_GB:
          arr.sort((a,b)=>{
              if(a.price.unitedKingdom.value == "Not Available"){
                  return 1;
              }
              if(b.price.unitedKingdom.value == "Not Available"){
                  return -1;
              }
              var aVal = parseInt(a.price.unitedKingdom.value.
              substring(1, a.price.unitedKingdom.value.indexOf(",")))
              var bVal = parseInt(b.price.unitedKingdom.value.
              substring(1, b.price.unitedKingdom.value.indexOf(",")))

              return bVal - aVal;
          })
      break;
      
      
      case SORTING_METHODS.RANGE:
          arr.sort((a,b)=>{
              return parseInt(b.realRange.substring(0, b.realRange.indexOf(" "))) -
                     parseInt(a.realRange.substring(0, a.realRange.indexOf(" ")))  ;
          })
      break;
      case SORTING_METHODS.EFFICIENCY:
          arr.sort((a,b)=>{
              return parseInt(b.efficency.substring(0, b.efficency.indexOf(" "))) -
                     parseInt(a.efficency.substring(0, a.efficency.indexOf(" ")))  ;
          })
      break;
      case SORTING_METHODS.FASTCHARGING:
          arr.sort((a,b)=>{
              return parseInt(b.batteryAndCharging.europe.fastchargeTime.value.substring(0, b.batteryAndCharging.europe.fastchargeTime.value.indexOf(" "))) -
                     parseInt(a.batteryAndCharging.europe.fastchargeTime.value.substring(0, a.batteryAndCharging.europe.fastchargeTime.value.indexOf(" ")))  ;
          })
      break;
      case SORTING_METHODS.ACCELERATION:
          arr.sort((a,b)=>{
              return - parseInt(b.performance.acceleration0and100kmOverH.value.substring(0, b.performance.acceleration0and100kmOverH.value.indexOf(" ")))+
                     parseInt(a.performance.acceleration0and100kmOverH.value.substring(0, a.performance.acceleration0and100kmOverH.value.indexOf(" ")))  ;
          })
      break;
      default:
      break;
  }
  return arr;
}