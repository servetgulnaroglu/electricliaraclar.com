import SingleCarLayout from "../../components/singlecarlayout"
import { getCarData, getAllCarIds } from "../../lib/cars"
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import * as ga from '../lib/ga'
export async function getStaticProps({ params }) {
    const carData = await getCarData(params.id)
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
    const router = useRouter()

    useEffect(() => {
      const handleRouteChange = (url) => {
        ga.pageview(url)
      }
      //When the component is mounted, subscribe to router changes
      //and log those page views
      router.events.on('routeChangeComplete', handleRouteChange)

      // If the component is unmounted, unsubscribe
      // from the event with the `off` method
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    }, [router.events])
    return (
        <>
            <SingleCarLayout car={carData.car}/>
        </>
    )
}