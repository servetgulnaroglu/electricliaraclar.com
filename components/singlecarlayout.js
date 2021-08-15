import h from '../styles/singlecarlayout.module.css';
import d from '../styles/singleCarLayoutDetails.module.css';
import Link from 'next/link'
import Image from 'next/link'
import typeTwoMennekesImg from '../public/images/Type-2-Mennekes.jpeg'
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryFull, faBolt, faCarBattery, faFlag, faFlagUsa, faLeaf, faRoad, faUser } from '@fortawesome/free-solid-svg-icons';
import { Carousel } from 'react-carousel-minimal';
import { useEffect, useState } from 'react';
import checkImage from '../lib/imageExists';

export default function SingleCarLayout({ car, home }) {
    const [images,setImages] = useState([{image:car.firstImageUrl, caption:""}]);
    const [imagesReady, setImagesReady] = useState(false);
    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
    }
    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    }
    if (home) {
        return (
            <>
                <Head>
                    <title>Electrikli Araclar</title>
                </Head>
                <div className={h.item}>
                    <div className={h.dataWrapper}>
                        <div className={h.img}>
                            <Link href={getCarLink(car.model)}>
                                <img src={car.firstImageUrl} alt={car.model} />
                            </Link>
                        </div>
                        <div className={h.titleWrap}>
                            <h2>
                                <Link href={getCarLink(car.model)}>
                                    <span>{car.model}</span>
                                </Link>
                            </h2>
                            <div className={h.subtitle}>
                                Elektrikli Araç |
                                <span className={h.battery}>
                                    {car.batteryAndCharging.batteryUseable.value}
                                    {handleIfEstimation(car.batteryAndCharging.batteryUseable.isEstimation)}
                                </span>
                            </div>
                        </div>
                        <div className={h.icons}>
                            {car.batteryAndCharging.europe.fastchargePort != "-" ?
                                <>
                                    {/* <span title="Hızlı şarj mümkün" className="fastcharge_ja fa fa-bolt"></span>   */}
                                    <span title="Hızlı şarj">
                                        <FontAwesomeIcon icon={faBolt} />
                                    </span>
                                </>
                                :
                                <>
                                    <span title="Hızlı şarj yok">
                                        <FontAwesomeIcon icon={faBolt} style={{ color: 'lightgray' }} />
                                    </span>
                                </>
                            }
                            {/* arkadan cekis onden cekis datasi cekilmeli */}
                            {car.miscellaneous.segment.value == "" ? <></>
                                :
                                <>
                                    <span title="Market Segmenti" style={{ paddingLeft: '10px' }}>{car.miscellaneous.segment.value.substring(0, car.miscellaneous.segment.value.indexOf(" "))}</span>
                                </>
                            }

                            <span title="Koltuk Sayısı" style={{ paddingLeft: '10px' }}>
                                <FontAwesomeIcon icon={faUser} />
                                {car.miscellaneous.seats.value[0]}
                            </span>
                        </div>

                        <div className={h.specs}>
                            <p className={h.left}>
                                <span className={h.tag}>
                                    0-100 {handleIfEstimation(car.performance.acceleration0and100kmOverH.isEstimation)}
                                </span>
                                <span className={h.tagValue}>
                                    {car.performance.acceleration0and100kmOverH.value}
                                </span>
                            </p>
                            <p className={h.left}>
                                <span className={h.tag}>
                                    En Yüksek Hız {handleIfEstimation(car.performance.topSpeed.isEstimation)}
                                </span>
                                <span className={h.tagValue}>
                                    {car.performance.topSpeed.value}
                                </span>
                            </p>
                            <p className={h.left}>
                                <span className={h.tag}>
                                    Menzil {handleIfEstimation(car.performance.electricRange.isEstimation)}
                                </span>
                                <span className={h.tagValue}>
                                    {car.performance.electricRange.value}
                                </span>
                            </p>
                            <p className={h.left}>
                                <span className={h.tag}>
                                    Verim {handleIfEstimation(car.efficency.includes("*"))}
                                </span>
                                <span className={h.tagValue}>
                                    {car.efficency.substring(0, car.efficency.indexOf("Wh/km") + 5)}
                                </span>
                            </p>
                            <p className={h.left}>
                                <span className={h.tag}>
                                    Hızlı Şarj {handleIfEstimation(car.batteryAndCharging.europe.fastchargeTime.isEstimation)}
                                </span>
                                <span className={h.tagValue}>
                                    {car.batteryAndCharging.europe.fastchargeTime.value}
                                </span>
                            </p>
                        </div>

                        <div className={h.pricing + ' ' + h.alignRight}>
                            <span className={h.priceBuy}>
                                <span className="country_de" title="Almanya'da teşvik öncesi fiyat">
                                    {handleIfEstimation(car.price.germany.isEstimation) + car.price.germany.value}
                                </span>
                                <span className={h.flagIcon + " " + h.flagIconDe}>
                                </span>
                            </span>

                            <span className={h.priceBuy}>
                                <span className="country_nl" title="Teşviklerden önce Hollanda'da fiyat">
                                    {handleIfEstimation(car.price.theNetherlands.isEstimation) + car.price.theNetherlands.value}
                                </span>
                                <span className={h.flagIcon + " " + h.flagIconNl}></span>
                            </span>
                            <span className={h.priceBuy}>
                                <span className="country_uk" title="Teşviklerden sonra Birleşik Krallık'ta fiyat">
                                    {handleIfEstimation(car.price.unitedKingdom.isEstimation) + car.price.unitedKingdom.value}
                                </span>
                                <span className={h.flagIcon + " " + h.flagIconGb}></span>
                            </span>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        useEffect(()=>{
            async function getImageData(){
                for(var i = 2; i < 50; i++){
                    var imgUrl =car.firstImageUrl; 
                    imgUrl = imgUrl.substring(0, imgUrl.length-6) + (i < 10? "0" + i: i) + ".jpg";
                    var exists = await checkImage(imgUrl);
                    if(exists){
                        images.push({
                            image:imgUrl,
                            caption:""
                        })
                        console.log(images);
                    } else {
                        setImagesReady(true);
                        return;
                    }
                }
            }
            getImageData();
        }, []);
        
        // console.log(images);
        // setInterval(()=>{
        //     console.log(images);
        // },3000)
        return (<>
            <Head>
                <title>{car.model}</title>
            </Head>
            <div className={d.car}>
                <div className={d.headerContainer}>
                    <div className={d.header}>
                        <h1>{car.model}</h1>
                        <span>Elektrikli Araç</span>
                    </div>
                </div>
                <div className={d.images}>
                {!imagesReady ? 
                ""
                : 
                (
                        <Carousel
                        data={images}
                        time={5000}
                        width="850px"
                        height="500px"
                        captionStyle={captionStyle}
                        radius="10px"
                        slideNumber={true}
                        slideNumberStyle={slideNumberStyle}
                        captionPosition="bottom"
                        automatic={false}
                        dots={true}
                        pauseIconColor="white"
                        pauseIconSize="40px"
                        slideBackgroundColor="darkgrey"
                        slideImageFit="cover"
                        thumbnails={true}
                        thumbnailWidth="100px"
                        style={{
                        textAlign: "center",
                        maxWidth: "850px",
                        maxHeight: "500px",
                        margin: "40px auto",
                        }}
                    />  
                    )
                }
                
                </div>

                <section className={d.dataTable} id={d.icons}>
                    <a href="#charging">
                        <div className={d.icon}>
                            <FontAwesomeIcon className={d.iconInner} icon={faBatteryFull} />
                            <p>
                                {car.useableBattery.substring(0, car.useableBattery.indexOf("Useable"))}
                                <span>Kullanılabilir Batarya</span>
                            </p>
                        </div>
                    </a>
                    <a href="#range">
                        <div className={d.icon}>
                            <FontAwesomeIcon className={d.iconInner} icon={faRoad} />
                            <p>
                                {car.realRange.substring(0, car.realRange.indexOf("Real"))}
                                <span>Menzil</span>
                            </p>
                        </div>
                    </a>
                    <a href="#efficiency">
                        <div className={d.icon}>
                            <FontAwesomeIcon className={d.iconInner} icon={faLeaf} />
                            <p>
                                {car.efficency.substring(0, car.efficency.indexOf("Effi"))}
                                <span>Verim</span>
                            </p>
                        </div>
                    </a>
                </section>
                <section className={d.expectedNotification}>
                    <h5>* ile belirtilen yerler tahminidir.</h5>
                </section>
                <section className={d.dataTableContainer} id="main-data">

                    <div className={d.dataTable + " " + d.hasLegend} id="pricing">

                        <div className={d.inlineBlock}>
                            <h2>Fiyatlar</h2>

                            <table className={d.table}>
                                <tbody>
                                    <tr>
                                        <td><span className={h.flagIcon + " " + h.flagIconGb}></span> Birleşik Krallık {car.price.unitedKingdom.isEstimation ? "*" : ""}</td>
                                        <td className={d.tdRight}>{car.price.unitedKingdom.value}</td>
                                    </tr>
                                    <tr>
                                        <td><span className={h.flagIcon + " " + h.flagIconNl}></span> Hollanda {car.price.theNetherlands.isEstimation ? "*" : ""}</td>
                                        <td className={d.tdRight}>{car.price.theNetherlands.value}</td>
                                    </tr>
                                    <tr>
                                        <td><span className={h.flagIcon + " " + h.flagIconDe}></span> Almanya {car.price.germany.isEstimation ? "*" : ""}</td>
                                        <td className={d.tdRight}>{car.price.germany.value}</td>
                                    </tr>

                                </tbody></table>
                        </div>

                        <div className={d.inlineBlock + " " + d.tableRight}>
                            <h2>Durum</h2>

                            <table className={d.table}>
                                <tbody>
                                    <tr>
                                        <td><span style={{marginRight:"3px"}} className={h.flagIcon + " " + h.flagIconGb}></span>Birleşik Krallık</td>
                                        <td className={d.tdRight}>{car.availability.unitedKingdom}</td>
                                    </tr>
                                    <tr>
                                        <td><span  style={{marginRight:"3px"}} className={h.flagIcon + " " + h.flagIconNl}></span>Hollanda</td>
                                        <td className={d.tdRight}>{car.availability.theNetherlands}</td>
                                    </tr>
                                    <tr>
                                        <td><span style={{marginRight:"3px"}} className={h.flagIcon + " " + h.flagIconDe}></span>Almanya</td>
                                        <td className={d.tdRight}>{car.availability.germany}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>

                    <div className={d.dataTableLegend}>
                        Gösterilen fiyatlar, belirtilen ülkeler için tahmini hedef fiyatlardır ve herhangi bir dolaylı teşvik içermez. Birleşik Krallık için fiyatlandırma, "Plug-In Car Grant (PICG)"nin doğrudan teşvikini içerir. Fiyatlandırma ve dahil edilen seçenekler bölgeye göre farklılık gösterebilir ve herhangi bir dolaylı teşvik içermez.</div>

                    <div className={d.dataTable + " " + d.hasLegend} id="range">

                        <h2 className={d.h2}>Menzil <span style={{ fontSize: "16px" }}>{car.realRangeEstimatinoBeetweenXandYkm.betweenXandYkm.substring(7, car.realRangeEstimatinoBeetweenXandYkm.betweenXandYkm.length) + " arasında"}</span></h2>

                        <div className={d.inlineBlock}>
                            <table className={d.table}>
                                <tbody><tr>
                                    <td>Şehir - Soğuk Hava {handleIfEstimation(car.realRangeEstimatinoBeetweenXandYkm.cityColdWeather.isEstimation)} </td>
                                    <td className={d.tdRight}>{car.realRangeEstimatinoBeetweenXandYkm.cityColdWeather.value}</td>
                                </tr>
                                    <tr>
                                        <td>Otoyol - Soğuk Hava {handleIfEstimation(car.realRangeEstimatinoBeetweenXandYkm.highwayColdWeather.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.realRangeEstimatinoBeetweenXandYkm.highwayColdWeather.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Karışık - Soğuk Hava {handleIfEstimation(car.realRangeEstimatinoBeetweenXandYkm.combinedColdWeather.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.realRangeEstimatinoBeetweenXandYkm.combinedColdWeather.value}</td>
                                    </tr>
                                </tbody></table>
                        </div>

                        <div className={d.inlineBlock + " " + d.tableRight}>
                            <table className={d.table}>
                                <tbody><tr>
                                    <td>Şehir - Ilımlı Hava {handleIfEstimation(car.realRangeEstimatinoBeetweenXandYkm.cityMildWeather.isEstimation)} </td>
                                    <td className={d.tdRight}>{car.realRangeEstimatinoBeetweenXandYkm.cityMildWeather.value}</td>
                                </tr>
                                    <tr>
                                        <td>Otoyol - Ilımlı Hava {handleIfEstimation(car.realRangeEstimatinoBeetweenXandYkm.highwayMildWeather.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.realRangeEstimatinoBeetweenXandYkm.highwayMildWeather.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Karışık - Ilımlı Hava {handleIfEstimation(car.realRangeEstimatinoBeetweenXandYkm.combinedMildWeather.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.realRangeEstimatinoBeetweenXandYkm.combinedMildWeather.value}</td>
                                    </tr>
                                </tbody></table>
                        </div>

                    </div>

                    <div className={d.dataTableLegend}>
                        Çeşitli durumlarda gerçek dünya aralığının göstergesi. Soğuk hava: -10°C ve ısıtma kullanımına dayalı 'en kötü durum'. Hafif hava: 23°C'ye göre 'en iyi durum' ve klima kullanımı yok. Gerçek menzil hıza, sürüş tarzına, hava ve rota koşullarına bağlı olacaktır.
                    </div>



                    <div className={d.dataTable} id="performance">
                        <h2>Performans</h2>

                        <div className={d.inlineBlock}>
                            <table className={d.table}>
                                <tbody><tr>
                                    <td>Hızlanma 0 - 100 km/h {handleIfEstimation(car.performance.acceleration0and100kmOverH.isEstimation)}</td>
                                    <td className={d.tdRight}>{car.performance.acceleration0and100kmOverH.value.substring(0, car.performance.acceleration0and100kmOverH.value.indexOf("sec")) + " saniye"}</td>
                                </tr>
                                    <tr>
                                        <td>En Yüksek Hız {handleIfEstimation(car.performance.topSpeed.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.performance.topSpeed.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Elektrik Menzili {handleIfEstimation(car.performance.electricRange.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.performance.electricRange.value}</td>
                                    </tr>

                                </tbody></table>
                        </div>

                        <div className={d.inlineBlock + " " + d.tableRight}>
                            <table className={d.table}>
                                <tbody><tr>
                                    <td>Toplam Güç {handleIfEstimation(car.performance.acceleration0and100kmOverH.isEstimation)}</td>
                                    <td className={d.tdRight}>1000 kW (1360 PS)</td>
                                </tr>
                                    <tr>
                                        <td>Toplam Tork {handleIfEstimation(car.performance.acceleration0and100kmOverH.isEstimation)}</td>
                                        <td className={d.tdRight}>1200 Nm</td>
                                    </tr>
                                    <tr>
                                        <td>Sürüş {handleIfEstimation(car.performance.acceleration0and100kmOverH.isEstimation)}</td>
                                        <td className={d.tdRight}>AWD</td>
                                    </tr>

                                </tbody></table>
                        </div>

                    </div>
                    <div className={d.dataTable} id="charging">

                        <h2>Batarya ve Şarj Etme</h2>

                        <div className={d.inlineBlock}>
                            <table className={d.table}>
                                <tbody><tr>
                                    <td>Batarya Kapasitesi *</td>
                                    <td className={d.tdRight}>200.0 kWh</td>
                                </tr>

                                </tbody></table>
                        </div>

                        <div className={d.inlineBlock + " " + d.tableRight}>
                            <table className={d.table}>
                                <tbody><tr>
                                    <td>Kullanılabilir Batarya *</td>
                                    <td className={d.tdRight}>200.0 kWh</td>
                                </tr>

                                </tbody></table>
                        </div>

                        <h3>Avrupa</h3>

                        <div className={d.inlineBlock}>
                            <table className={d.table}>
                                <tbody><tr>
                                    <td>Sarj Portu *</td>
                                    <td className={d.tdRight}>Type 2</td>
                                </tr>


                                    <tr>
                                        <td>Şarj Gücü *</td>
                                        <td className={d.tdRight}>22 kW AC</td>
                                    </tr>
                                    <tr>
                                        <td>Sarj Süresi (0-&gt;970 km) *</td>
                                        <td className={d.tdRight}>10h45m</td>
                                    </tr>
                                    <tr>
                                        <td>Sarj Hızı *</td>
                                        <td className={d.tdRight}>91 km/h</td>
                                    </tr>
                                </tbody></table>
                        </div>

                        <div className={d.inlineBlock + " " + d.tableRight}>
                            <table className={d.table}>
                                <tbody><tr>
                                    <td>Hızlı Şarj Portu *</td>
                                    <td className={d.tdRight}>CCS</td>
                                </tr>




                                    <tr>
                                        <td>Hızlı Şarj Gücü (max) *</td>
                                        <td className={d.tdRight}>250 kW DC</td>
                                    </tr>
                                    <tr>
                                        <td>Hızlı Şarj Süresü (97-&gt;776 km) *</td>
                                        <td className={d.tdRight}>44 min</td>
                                    </tr>
                                    <tr>
                                        <td>Hızlı Şarj Hızı *</td>
                                        <td className={d.tdRight}>920 km/h</td>
                                    </tr>
                                </tbody></table>
                        </div>


                        <div className="data-table-to-charge-table"><a href="#charge-table">Tüm sarj bilgileri için tıklayın.</a></div>

                    </div>

                    <div className={d.dataTable + " " + d.hasLegend} id="efficiency">

                        <h2>Enerji Tüketimi</h2>

                        <h3>EVDB Gerçek Menzil</h3>

                        <div className={d.inlineBlock}>
                            <table className={d.table}>
                                <tbody><tr>
                                    <td>Menzil *</td>
                                    <td className={d.tdRight}>970 km</td>
                                </tr>
                                    <tr>
                                        <td>Araç Tüketimi *</td>
                                        <td className={d.tdRight}>206 Wh/km</td>
                                    </tr>
                                </tbody></table>
                        </div>

                        <div className={d.inlineBlock + " " + d.tableRight}>
                            <table className={d.table}>
                                <tbody><tr>
                                    <td>CO2 Emisyonları</td>
                                    <td className={d.tdRight}>0 g/km</td>
                                </tr>
                                    <tr>
                                        <td>Araç Yakıt Eşdeğeri * </td>
                                        <td className={d.tdRight}>2.3 l/100km</td>
                                    </tr>
                                </tbody></table>
                        </div>


                    </div>

                    <div className={d.dataTableLegend}>
                        Nominal = üretici tarafından yayınlanan resmi rakamlar. Nominal tüketim ve yakıt eşdeğerliği rakamları, şarj kayıplarını içerir.<br />Araç = aracın tahrik ve yerleşik sistemler için kullandığı hesaplanmış pil enerji tüketimi.
                    </div>

                    <div className={d.dataTable + " " + d.hasLegend} id="real-consumption">
                        <h2>Enerji Tüketimi						<span>between 142 - 288 Wh/km</span></h2>

                        <div className={d.inlineBlock}>
                            <table className={d.table}>
                                <tbody><tr>
                                    <td>Şehir - Soğuk Hava {handleIfEstimation(car.realRangeEstimatinoBeetweenXandYkm.cityColdWeather.isEstimation)} </td>
                                    <td className={d.tdRight}>{car.realRangeEstimatinoBeetweenXandYkm.cityColdWeather.value}</td>
                                </tr>
                                    <tr>
                                        <td>Otoyol - Soğuk Hava {handleIfEstimation(car.realRangeEstimatinoBeetweenXandYkm.highwayColdWeather.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.realRangeEstimatinoBeetweenXandYkm.highwayColdWeather.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Karışık - Soğuk Hava {handleIfEstimation(car.realRangeEstimatinoBeetweenXandYkm.combinedColdWeather.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.realRangeEstimatinoBeetweenXandYkm.combinedColdWeather.value}</td>
                                    </tr>
                                </tbody></table>
                        </div>

                        <div className={d.inlineBlock + " " + d.tableRight}>
                            <table className={d.table}>
                                <tbody><tr>
                                    <td>Şehir - Ilımlı Hava {handleIfEstimation(car.realRangeEstimatinoBeetweenXandYkm.cityMildWeather.isEstimation)} </td>
                                    <td className={d.tdRight}>{car.realRangeEstimatinoBeetweenXandYkm.cityMildWeather.value}</td>
                                </tr>
                                    <tr>
                                        <td>Otoyol - Ilımlı Hava {handleIfEstimation(car.realRangeEstimatinoBeetweenXandYkm.highwayMildWeather.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.realRangeEstimatinoBeetweenXandYkm.highwayMildWeather.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Karışık - Ilımlı Hava {handleIfEstimation(car.realRangeEstimatinoBeetweenXandYkm.combinedMildWeather.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.realRangeEstimatinoBeetweenXandYkm.combinedMildWeather.value}</td>
                                    </tr>
                                </tbody></table>
                        </div>

                    </div>

                    <div className={d.dataTableLegend}>
                        Çeşitli durumlarda gerçek dünya enerji kullanımının göstergesi. Soğuk hava: -10°C ve ısıtma kullanımına dayalı 'en kötü durum'. Hafif hava: 23°C'ye göre 'en iyi durum' ve klima kullanımı yok. Enerji kullanımı hıza, sürüş tarzına, iklime ve rota koşullarına bağlı olacaktır.	</div>
                    <div className={d.dataTable}>

                        <h2>Boyutlar ve Ağırlık</h2>

                        <div className={d.inlineBlock}>
                            <table className={d.table}>
                                <tbody><tr>
                                    <td>Uzunluk {handleIfEstimation(car.dimensionsAndWeight.length.isEstimation)}</td>
                                    <td className={d.tdRight}>{car.dimensionsAndWeight.length.value}</td>
                                </tr>
                                    <tr>
                                        <td>Genişlik {handleIfEstimation(car.dimensionsAndWeight.width.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.dimensionsAndWeight.width.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Aynalar Dahil Genişlik {handleIfEstimation(car.dimensionsAndWeight.widthAndMirrors.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.dimensionsAndWeight.widthAndMirrors.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Yükseklik {handleIfEstimation(car.dimensionsAndWeight.height.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.dimensionsAndWeight.height.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Dingil Açıklığı {handleIfEstimation(car.dimensionsAndWeight.wheelbase.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.dimensionsAndWeight.wheelbase.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Boş Ağırlık (EU) {handleIfEstimation(car.dimensionsAndWeight.weightUnladenEU.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.dimensionsAndWeight.weightUnladenEU.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Brüt Araç Ağırlığı (GVWR) {handleIfEstimation(car.dimensionsAndWeight.GrossVehicleWeightGVWR.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.dimensionsAndWeight.GrossVehicleWeightGVWR.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Maksimum Yük {handleIfEstimation(car.dimensionsAndWeight.maxPayload.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.dimensionsAndWeight.maxPayload.value}</td>
                                    </tr>
                                </tbody></table>
                        </div>

                        <div className={d.inlineBlock + " " + d.tableRight}>
                            <table className={d.table}>
                                <tbody><tr>
                                    <td>Kargo Hacmi {handleIfEstimation(car.dimensionsAndWeight.cargoVolume.isEstimation)}</td>
                                    <td className={d.tdRight}>{car.dimensionsAndWeight.cargoVolume.value}</td>
                                </tr>
                                    <tr>
                                        <td>Maksimum Kargo Hacmi {handleIfEstimation(car.dimensionsAndWeight.cargoVolumeMax.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.dimensionsAndWeight.cargoVolumeMax.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Kargo Hacmi Frenk {handleIfEstimation(car.dimensionsAndWeight.cargoVolumeFrunk.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.dimensionsAndWeight.cargoVolumeFrunk.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Çatı Yükü {handleIfEstimation(car.dimensionsAndWeight.roofLoad.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.dimensionsAndWeight.roofLoad.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Çeki Demiri Mümkün {handleIfEstimation(car.dimensionsAndWeight.towHitchPossible.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.dimensionsAndWeight.towHitchPossible.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Çekme Ağırlığı Frensiz {handleIfEstimation(car.dimensionsAndWeight.towingWeightUnbraked.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.dimensionsAndWeight.towingWeightUnbraked.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Çekme Ağırlığı Frenli {handleIfEstimation(car.dimensionsAndWeight.towingWeightBraked.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.dimensionsAndWeight.towingWeightBraked.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Maksimum Dikey Yük {handleIfEstimation(car.dimensionsAndWeight.verticalLoadMax.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.dimensionsAndWeight.verticalLoadMax.value}</td>
                                    </tr>
                                </tbody></table>
                        </div>

                    </div>


                    <div className={d.dataTable}>

                        <h2>Diğer Bilgiler</h2>

                        <div className={d.inlineBlock}>
                            <table className={d.table}>
                                <tbody><tr>
                                    <td>Koltuk Sayısı {handleIfEstimation(car.miscellaneous.seats.isEstimation)}</td>
                                    <td className={d.tdRight}>{car.miscellaneous.seats.value[0]}</td>
                                </tr>
                                    <tr>
                                        <td>Izofix {handleIfEstimation(car.miscellaneous.isofix.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.miscellaneous.isofix.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Dönüş Çapı {handleIfEstimation(car.miscellaneous.turningCircle.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.miscellaneous.turningCircle.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Platform {handleIfEstimation(car.miscellaneous.platform.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.miscellaneous.platform.value}</td>
                                    </tr>
                                </tbody></table>
                        </div>

                        <div className={d.inlineBlock + " " + d.tableRight}>
                            <table className={d.table}>
                                <tbody><tr>
                                    <td>Araba Gövdesi {handleIfEstimation(car.miscellaneous.carBody.isEstimation)}</td>
                                    <td className={d.tdRight}>{car.miscellaneous.carBody.value}</td>
                                </tr>
                                    <tr>
                                        <td>Segment {handleIfEstimation(car.miscellaneous.segment.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.miscellaneous.segment.value}</td>
                                    </tr>
                                    <tr>
                                        <td>Tavan Rayları {handleIfEstimation(car.miscellaneous.roofRails.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.miscellaneous.roofRails.value}</td>
                                    </tr>
                                    <tr>
                                        <td>EV Özel Platformu {handleIfEstimation(car.miscellaneous.EVDedicatedPlatform.isEstimation)}</td>
                                        <td className={d.tdRight}>{car.miscellaneous.EVDedicatedPlatform.value}</td>
                                    </tr>
                                </tbody></table>
                        </div>

                    </div>

                    <div className={d.dataTableLegend} id="main-legend">
                        * = tahmini değer. Ortalama enerji tüketimi ve menzili, orta sürüş stiline ve iklime bağlıdır. Gerçek hayattaki değerler önemli ölçüde farklılık gösterebilir. Fiyatlandırma bilgileri bazı bölgeler için geçerli olmayabilir. Bu sitedeki bilgilerden hiçbir hak elde edilemez.
                    </div>
                </section>



                <section className={d.dataTableContainer +  " " +  d.chargeTable} id="charge-table">
                    <h2 className={d.h2} style={{paddingBottom: "5px",borderBottom:"1px solid #ddd"}}>Ev ve Yol Şarjı(0 -&gt; 100%)</h2>
                    <div className={d.infoBox}>
                        <p>Normal bir duvar prizi veya bir şarj istasyonu kullanarak şarj etmek mümkündür. Halka açık şarj her zaman bir şarj istasyonu aracılığıyla yapılır.
                             EV'nin ne kadar hızlı şarj olabileceği, kullanılan şarj istasyonuna (EVSE) ve EV'nin maksimum şarj kapasitesine bağlıdır. 
                            Aşağıdaki tablo, {car.model}'ı şarj etmek için olası tüm seçenekleri göstermektedir. Her seçenek, pilin boştan doluya ne kadar hızlı şarj edilebileceğini gösterir.</p>
                        {/* <p>NOTE: Tesla has not released details about the on-board charger of the Roadster. The information
                            below is based on estimatation of the most likely on-board charger.</p> */}
                        <h3>Avrupa</h3>
                        <p>Avrupa'da bir EV'yi şarj etmek ülkeye göre değişir. Bazı Avrupa ülkeleri öncelikle şebekeye 1 fazlı bağlantılar kullanırken, 
                            diğer ülkeler neredeyse sadece 3 fazlı bağlantı kullanıyor. Aşağıdaki tablo {car.model}'ın şarj edilebileceği tüm olası yolları göstermektedir, 
                            ancak bazı şarj modları bazı ülkelerde yaygın olarak bulunmayabilir.</p>
                        <div>
                            <table className={d.table}>
                                <tbody><tr>
                                    <th>{car.homeAndDestinationCharging0to100Percent.chargetType}</th>
                                </tr>
                                    <tr>
                                        <td style={{margin:"auto", textAlign:"center"}}>
                                            <img
                                            style={{margin:"auto", textAlign:"center"}}
                                            src='/images/Type-2-Mennekes.jpeg'
                                            />
                                            {/* <img src="/img/informatie/Type-2-Mennekes-IEC-62196.jpg" srcset="/img/informatie/Type-2-Mennekes-IEC-62196@2x.jpg 2x" /> */}
                                        </td>
                                    </tr>
                                </tbody></table>
                            <table className={d.table +" " + d.chargingTableStandard} >
                                <tbody><tr>
                                    <th className={d.thLeft}>Şarj Noktası</th>
                                    <th className={d.thLeft}>Maks. <span className={d.mobileBreak}>Güç</span></th>
                                    <th className={d.thLeft}>Güç</th>
                                    <th className={d.thLeft}>Süre</th>
                                    <th className={d.thLeft}>Oran</th>
                                </tr>
                                    {Object.keys(car.homeAndDestinationCharging0to100Percent.chargingPoints).map((el)=>{
                                        var tr = car.homeAndDestinationCharging0to100Percent.chargingPoints[el];
                                        return (
                                            <tr key={el}>
                                                <td>{tr.chargingPoint}</td>
                                                <td>{tr.maxPower}</td>
                                                <td>{tr.power}</td>
                                                <td>{tr.time}</td>
                                                <td>{tr.rate}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody></table>
                        </div>
                        <p className={d.fDashTwelve}>† = Limited by on-board charger, vehicle cannot charge faster.</p>

                    </div>


                    <h2>Hızlı Şarj (10 -&gt; 80%)</h2>
                    <div className={d.infoBox}>
                        <p>Hızlı şarj, en kısa sürede mümkün olduğunca fazla menzil ekleyerek daha uzun yolculuklar sağlar. 
                            %80 şarj durumuna ulaşıldıktan sonra şarj gücü önemli ölçüde azalacaktır. Tipik bir hızlı şarj bu
                             nedenle nadiren %80 SoC'yi aşar. Bir EV'nin hızlı şarj oranı, kullanılan şarj cihazına ve EV'nin 
                             kaldırabileceği maksimum şarj gücüne bağlıdır.
                             Aşağıdaki tablo, {car.model}'ı hızlı şarj etmek için tüm ayrıntıları göstermektedir.</p>
                        <ul>
                            <li className={d.listItem}>Maks. Güç: şarj noktası tarafından sağlanan maksimum güç</li>
                            <li className={d.listItem}>Ort. Güç: %10'dan %80'e kadar bir seansta şarj noktası tarafından sağlanan ortalama güç</li>
                            <li className={d.listItem}>Süre: %10'dan %80'e şarj etmek için gereken süre</li>
                            <li className={d.listItem}>Oran: bir oturumda ortalama şarj hızı %10'dan %80'e</li>
                        </ul>
                        <h3>Avrupa</h3>

                        <div>
                            <table className={d.table}>
                                <tbody><tr>
                                    <th>{car.fastCharging.chargetType}</th>
                                </tr>
                                    <tr>
                                        <td>
                                        <img
                                            style={{margin:"auto", textAlign:"center"}}
                                            src='/images/Combined-Charging-System.jpeg'
                                            />
                                        </td>
                                    </tr>
                                </tbody></table>
                            <table className={d.table + " " + d.charhingTableFast}>
                                <tbody><tr> 
                                    <th>Şarj Noktası</th>
                                    <th>Max. <span className={d.mobileBreak}>Güç</span></th>
                                    <th>Ort. <span className={d.mobileBreak}>Güç</span></th>
                                    <th>Süre</th>
                                    <th>Oran</th>
                                </tr>
                                {Object.keys(car.fastCharging.chargingPoints).map((el)=>{
                                        var tr = car.fastCharging.chargingPoints[el];
                                        return (
                                            <tr key={el}>
                                                <td>{tr.chargingPoint}</td>
                                                <td>{tr.maxPower}</td>
                                                <td>{tr.power}</td>
                                                <td>{tr.time}</td>
                                                <td>{tr.rate}</td>
                                            </tr>
                                        )
                                    })}
                                
                                </tbody></table>
                            <p className={d.fDashTwelve}>† = Limited by charging capabilities of vehicle</p><p className={d.fDashTwelve}>Actual charging rates may differ from data shown due to factors like outside temperature, state of the battery and driving style.</p>
                        </div>
                    </div></section>
            </div>
            <style  jsx>{`
                tr:nth-child(odd){
                    background-color: #eee;
                  }
                td {
                    padding:5px;
                }
                  
            `}</style>
        </>
        )
    }
}




function handleIfEstimation(isEstimation) {
    return isEstimation ? "*" : "";
}
function getCarLink(model) {
    return "/arabalar/" + model.replace(/\s+/g, "-");
}