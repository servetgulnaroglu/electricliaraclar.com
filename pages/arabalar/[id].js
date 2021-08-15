import SingleCarLayout from "../../components/singlecarlayout"
import { getCarData, getAllCarIds } from "../../lib/cars"


export async function getStaticProps({ params }) {
    const carData = getCarData(params.id)
    return {
      props: {
        carData
      }
    }
}
export async function getStaticPaths() {
    const paths = getAllCarIds()
    return {
      paths,
      fallback: false
    }
}
  
export default function Car({carData}){
    return (
        <>
            <SingleCarLayout car={carData.car}/>
        </>
    )
}