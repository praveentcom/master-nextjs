import Head from 'next/head'
import Link from 'next/link'
import Header from './header'
import Footer from './footer'
import { RWebShare } from 'react-web-share'
import { getLatestPost, getPosts } from '../lib/posts'
import { BookOpenIcon, AnnotationIcon, ArrowRightIcon, BriefcaseIcon, HeartIcon } from '@heroicons/react/solid'

export async function getStaticProps(context) {
    const latestPost = await getLatestPost()
    const posts = await getPosts()
    if (!latestPost) {
        return {
            notFound: true,
        }
    }
  
    return {
        props: { latestPost, posts }
    }
}

export default function Home(props) {
    return (
        <div>
            <Head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:site_name" content="Praveen Thirumurugan" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Praveen Thirumurugan" />
                <meta property="og:description" content="Praveen Thirumurugan" />
                <meta property="og:url" content={'https://www.praveent.com/'} />
                <meta property="og:image" content="" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Praveen Thirumurugan" />
                <meta name="twitter:description" content="Praveen Thirumurugan" />
                <meta name="twitter:url" content="https://www.praveent.com/" />
                <meta name="twitter:image" content="https://www.praveent.com/_next/image/?url=%2Fimages%2Fwebsite.png" />
                <meta name="twitter:site" content="@praveentcom" />
                <meta name="twitter:creator" content="@praveentcom" />
                <script async defer src="https://sa.praveent.com/latest.js"></script>
                <title>Praveen Thirumurugan</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Header data={props.posts.slice(0,3)} />
                <div className="container p-4 pt-6 mx-auto max-w-7xl md:px-6">
                    <div className="grid grid-cols-12 gap-6 mb-6">
                        <div className="col-span-12 md:col-span-8">
                            <div className="mb-6 overflow-hidden md:bg-white md:shadow-lg md:rounded-xl">
                                <div className="m-2 md:m-0 md:p-6">
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-600">Hey there, I'm Praveen! 👋🏼</h1>
                                    <p className="pb-2 mt-4 text-gray-500 md:pb-0">
                                        Welcome home. One central location where you'll find everything I love.
                                        For starters, I write articles, craft code, design random art, travel often and the list goes on.
                                        I designed this website to help my followers with a taste of what I cherish the most in my life.
                                    </p>
                                </div>
                            </div>
                            {props.latestPost.map(post => (
                                <div className="overflow-hidden bg-white shadow-lg rounded-xl">
                                    <div className="px-6 pt-4 pb-2 border-b-2 border-gray-100">
                                        <span className="inline-flex text-sm font-semibold text-gray-500">
                                            <BookOpenIcon className="w-5 h-5 mr-2 text-gray-400" aria-hidden="true" />
                                            LATEST ARTICLE
                                        </span>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-12 gap-6">
                                            <Link href={`/post/${post.slug}`}>
                                                <div className="flex items-center justify-center col-span-12 md:col-span-5" style={{cursor: 'pointer'}}>
                                                    <img className="rounded" width="100%" src={post ? post.feature_image : '/images/avatar_light.png' } alt={post ? post.id : 'Blog image failed to load'}/>
                                                </div>
                                            </Link>
                                            <div className="flex items-center col-span-12 md:col-span-7">
                                                <div>
                                                    <Link href={`/post/${post.slug}`}>
                                                        <div style={{cursor: 'pointer'}}>
                                                            <h4 className="text-xl font-medium leading-6 text-gray-600">{post.title}</h4>
                                                            <p className="max-w-2xl mt-2 text-gray-500 text-md">{post.excerpt.substring(0, 150) }{ post.excerpt.length >= 150 && `...` }</p>
                                                        </div>
                                                    </Link>
                                                    <div className="mt-2">
                                                        <Link href={`/post/${post.slug}`}>
                                                            <button type="button" className="inline-flex items-center px-4 py-1 mt-4 mr-4 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                                                                <BookOpenIcon className="w-5 h-5 mr-2 -ml-1 text-gray-400" aria-hidden="true" />
                                                                Read ({post.reading_time + ' min'})
                                                            </button>
                                                        </Link>
                                                        <RWebShare data={{ text: post.excerpt, url: 'https://praveent.com/post/' + post.slug, title: post.title, }}>
                                                            <button type="button" className="inline-flex items-center px-4 py-1 mt-4 mr-4 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                                                                <AnnotationIcon className="w-5 h-5 mr-2 -ml-1 text-gray-400" aria-hidden="true" />
                                                                Share
                                                            </button>
                                                        </RWebShare>
                                                        <Link href="/posts">
                                                            <button type="button" className="inline-flex items-center px-4 py-1 mt-4 mr-4 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                                                                <ArrowRightIcon className="w-5 h-5 mr-2 -ml-1 text-gray-400" aria-hidden="true" />
                                                                All articles
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-12 col-span-12 md:col-span-4" style={{alignItems: "flex-start", height: "min-content"}}>
                            <div className="col-span-12 mb-6 overflow-hidden bg-white shadow-lg rounded-xl">
                                <div className="px-6 pt-4 pb-2 border-b-2 border-gray-100">
                                    <span className="inline-flex text-sm font-semibold text-gray-500">
                                        <BriefcaseIcon className="w-5 h-5 mr-2 text-gray-400" aria-hidden="true" />
                                        WHERE I HUSTLE
                                    </span>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-center m-2">
                                        <img style={{height: 24}} src="/images/plum_logo_original.png" alt="Plum logo" />
                                    </div>
                                    <div className="flex items-center justify-center m-2">
                                        <p className="mt-4 text-center text-gray-500 text-md">
                                            I am currently working with <a style={{textDecorationLine: 'underline'}} href="https://plumhq.com?utm_medium=employee&utm_source=praveent.com&utm_campaign=website" target="_blank">Plum</a> to build India's best health insurance cover for modern companies. <a style={{textDecorationLine: 'underline'}} href="https://plumhq.com/careers?utm_medium=employee&utm_source=praveent.com&utm_campaign=website" target="_blank">Join us</a>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 overflow-hidden bg-white shadow-lg rounded-xl">
                                <div className="px-6 pt-4 pb-2 border-b-2 border-gray-100">
                                    <span className="inline-flex text-sm font-semibold text-gray-500">
                                        <HeartIcon className="w-5 h-5 mr-2 text-gray-400" aria-hidden="true" />
                                        COMMUNITY DOES MATTER
                                    </span>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-center m-2">
                                        <img style={{height: 24}} src="/images/gdg_logo.svg" alt="Plum logo" />
                                    </div>
                                    <div className="flex items-center justify-center m-2">
                                        <p className="mt-4 text-center text-gray-500 text-md">
                                            I lead the GDG community in <a style={{textDecorationLine: 'underline'}} href="https://gdg.community.dev/GDG-Cloud-Coimbatore?utm_medium=organizer&utm_source=praveent.com&utm_campaign=website" target="_blank">Coimbatore</a> along with a few folks. We have made an impact in several thousand lives so far.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </main>
        </div>
    )
}