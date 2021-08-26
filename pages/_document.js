import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="tr">
        <Head> 
            <link rel="icon" href="/favicon.ico" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
            <meta name="description" content="2021 ve 2022 için en yeni ve yakında çıkacak elektrikli araçlara genel bakış. Menzil, hızlı şarj, model ve fiyata göre sıralama yapın ve karşılaştırın. electricliaraclar.com"/>
            <meta name="keywords" content="elektrikli araçlar, elektrikli arabalar, son çıkan elektrikli arabalar,
            avrupada elektrikli araç fiyatları, son model elektrikli arabalar, elektrik, araba, araç, elektrikli araba karşılaştırma,
            elektrikli araba özellikleri"/>
            <meta name="HandhelFriendly" content="True"/>
            <meta name="twitter:card" content="summary"/>
            <meta name="twitter:site" content="@site_twitter_handle"/>
            <meta name="twitter:title" content="Post title"/>
            <meta name="twitter:description" content="Post description ..."/>
            <meta name="twitter:image" content="thumbnail-image.jpg"/>
            <meta name="twitter:image:alt" content="Image text description"/>
            <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <title>Elektrikli Araçlar</title>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
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