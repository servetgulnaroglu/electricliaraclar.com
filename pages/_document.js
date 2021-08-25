import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="tr">
        <Head> 
            <link rel="icon" href="/favicon.ico" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
            <meta name="description" content="2021 ve 2022 için en yeni ve yakında çıkacak elektrikli araçlara genel bakış. Menzil, hızlı şarj, model ve fiyata göre sıralama yapın ve karşılaştırın."/>
            <meta name="keywords" content="elektrikli araçlar, elektrikli arabalar, son çıkan elektrikli arabalar,
            avrupada elektrikli araç fiyatları, son model elektrikli arabalar, elektrik, araba, araç, elektrikli araba karşılaştırma,
            elektrikli araba özellikleri"/>
        </Head>    
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument