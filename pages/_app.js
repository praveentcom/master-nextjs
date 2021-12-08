import '../styles/global.scss'
import NextNProgress from 'nextjs-progressbar';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#CCC" />
      <Component {...pageProps} />
    </>  
  )
}