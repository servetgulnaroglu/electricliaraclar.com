import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import fs from 'fs'
import path from 'path'
const carsDirectory = path.join(process.cwd(), 'cars');
import SORTING_METHODS from './sortContsants';
export function getCarData(id){
    const fullPath = path.join(carsDirectory, 'cars.json')   
    const fileContent = fs.readFileSync(fullPath, 'utf8')
    var json = JSON.parse(fileContent);

    var car = json[id]
    return {
        id,
        car
    }
}
export function getAllCarIds() {
    const fullPath = path.join(carsDirectory, 'cars.json')   
    const fileContent = fs.readFileSync(fullPath, 'utf8')
    var json = JSON.parse(fileContent);

    var idArr = []
    for (var key in json) {
        if (json.hasOwnProperty(key)) {
            idArr.push({
                params: {
                    id: key
                }
            })
        }
    }
    return idArr
}

export function getCarId(model){
    return model.replace(/\s+/g,"-");
}



export async function getCarsSorted(as){
    const fullPath = path.join(carsDirectory, 'cars.json')   
    const fileContent = fs.readFileSync(fullPath, 'utf8')
    var json = JSON.parse(fileContent);
    var data = await sortJsonAsArray(as, json);
    return  data;
}

// export async function getCarsSorted(as, json){
//     return await sortJsonAsArray(as,json)
// }

export async function sortJsonAsArray(as, json){
    var arr  = jsonToArray(json);
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

function jsonToArray(json){
    var arr = [];
    for(var key in json){
        arr.push(json[key]);
    }
    return arr;
}


