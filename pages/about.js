import Image from 'next/image'
import xss from 'xss'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/header'
import Footer from '../components/footer'
import { getPage, getPosts } from '../lib/posts'
import { BookOpenIcon, AnnotationIcon } from '@heroicons/react/solid'

export async function getServerSideProps(context) {
    const posts = await getPosts()
    const page = await getPage('about')
    if (!page) {
        return {
            notFound: true,
        }
    }
  
    return {
        props: { page, posts }
    }
}

export default function PostSingle(props) {
    return (
        <div>
            <Head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:site_name" content="Praveen Thirumurugan" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Praveen Thirumurugan - About" />
                <meta property="og:description" content="Praveen Thirumurugan - About" />
                <meta property="og:url" content={'https://www.praveent.com/posts/'} />
                <meta property="og:image" content="" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Praveen Thirumurugan - About" />
                <meta name="twitter:description" content="Praveen Thirumurugan - About" />
                <meta name="twitter:url" content="https://www.praveent.com/posts/" />
                <meta name="twitter:image" content="https://www.praveent.com/_next/image/?url=%2Fimages%2Fwebsite.png" />
                <meta name="twitter:site" content="@praveentcom" />
                <meta name="twitter:creator" content="@praveentcom" />
                <script async defer src="https://sa.praveent.com/latest.js"></script>
                <title>Praveen Thirumurugan - About</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Header data={props.posts.slice(0,3)} />
                <div className="container p-4 pt-6 mx-auto max-w-7xl md:px-6">
                    <nav class="flex text-gray-500 px-2" aria-label="Breadcrumb">
                        <ol class="inline-flex items-center space-x-1 md:space-x-3">
                            <li class="inline-flex items-center">
                                <Link href="/">
                                    <a href="#" class="text-gray-500 hover:text-gray-700 inline-flex items-center text-sm font-medium dark:text-gray-400 dark:hover:text-white">
                                        <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                        Home
                                    </a>
                                </Link>
                            </li>
                            <li aria-current="page">
                                <div class="flex items-center">
                                    <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <span class="text-gray-400 ml-1 md:ml-2 text-sm font-medium dark:text-gray-500">About me</span>
                                </div>
                            </li>
                        </ol>
                    </nav>
                    <div className="grid grid-cols-12 gap-6 mt-6">
                        <div className="col-span-12 p-6 overflow-y-scroll bg-white shadow-lg md:col-span-4 rounded-xl" style={{height: "min-content"}}>
                            <div className="flex items-center justify-center">
                                <img className="rounded" width="100%" src={props.page ? props.page.feature_image : '/images/avatar_light.png' } alt={props.page ? props.page.id : 'About page image failed to load'}/>
                            </div>
                            <div className="flex items-center">
                                <div>
                                    <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-600">{props.page.title}</h1>
                                    <p className="mt-4 text-gray-500 text-md">I am currently working on something I love personally. Until I share more about it soon, this is a good read to know more about me :)</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 overflow-hidden bg-white shadow-lg md:col-span-8 rounded-xl">
                            <div className="p-6 pb-0">
                                <div className="blog" dangerouslySetInnerHTML={{ __html: xss(props.page.html) }} />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </main>
        </div>
    )
}