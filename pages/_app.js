import '../styles/globals.css'
import { Noto_Sans_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
weight: ['400', '700'],
subsets: ['latin'],
variable: '--font-noto-sans-jp',
})

function MyApp({ Component, pageProps }) {
return (
<main className={notoSansJP.variable}>
<Component {...pageProps} />
</main>
)
}

export default MyApp
