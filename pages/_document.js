import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  setGoogleTags () {
    return {
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-PX3Z1LNXPH');
      `
    }
  }
  render () {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='UTF-8' />
          <meta name='theme-color' content='#EB5D5D' />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* {
            process.env.NODE_ENV === 'production' && (
              <>
                <script
                  async
                  src='https://www.googletagmanager.com/gtag/js?id=G-PX3Z1LNXPH'
                />
                <script dangerouslySetInnerHTML={this.setGoogleTags()} />
              </>
            )
          } */}
        </body>
      </Html>
    )
  }
}
