
import Head from 'next/head'
import Link from 'next/link'
import Layout from './layout'

export default function Home() {
    return (
        <div>
            <Head>
                <title>Praveen Thirumurugan</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div className="container mx-auto p-8 md:pt-12">
                    <Layout />
                </div>
            </main>

            <footer></footer>
        </div>
    )
}