import Head from 'next/head'
import Link from 'next/link'
import Header from './header'
import Footer from './footer'
import { RWebShare } from 'react-web-share'
import { getLatestPost, getPosts } from '../lib/posts'
import { BookOpenIcon, AnnotationIcon, ArrowRightIcon } from '@heroicons/react/solid'

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
                <title>Praveen Thirumurugan</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div className="container mx-auto p-4 pt-8 md:pt-12">
                    <Header />
                    <div className="grid grid-cols-12 gap-6 mb-6">
                        <div className="flex items-center justify-center col-span-12 md:col-span-6">
                            <div className="shadow-lg overflow-hidden rounded-xl" style={{backgroundImage: 'url("/images/gdg_bg.png")', backgroundSize: 'cover'}}>
                                <div className="px-6 py-6">
                                    <div className="flex items-center justify-center m-2">
                                        <img style={{height: 24}} src="/images/gdg_logo.svg" alt="Plum logo" />
                                    </div>
                                    <div className="flex items-center justify-center m-2">
                                        <p className="mt-4 text-center text-md text-gray-800">
                                            I lead the GDG community in <a style={{textDecorationLine: 'underline'}} href="https://gdg.community.dev/GDG-Cloud-Coimbatore?utm_medium=organizer&utm_source=praveent.com&utm_campaign=website" target="_blank">Coimbatore</a> along with few folks and have impacted more than a several thousand lives so far.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-center col-span-12 md:col-span-6">
                            <div className="shadow-lg overflow-hidden rounded-xl" style={{backgroundImage: 'url("/images/plum_bg.png")', backgroundSize: 'cover'}}>
                                <div className="px-6 py-6">
                                    <div className="flex items-center justify-center m-2">
                                        <img style={{height: 24}} src="/images/plum_logo_white.png" alt="Plum logo" />
                                    </div>
                                    <div className="flex items-center justify-center m-2">
                                        <p className="mt-4 text-center text-md text-white">
                                            I am currently working with <a style={{textDecorationLine: 'underline'}} href="https://plumhq.com?utm_medium=employee&utm_source=praveent.com&utm_campaign=website" target="_blank">Plum</a> to build India's best health insurance cover for modern companies. <a style={{textDecorationLine: 'underline'}} href="https://plumhq.com/careers?utm_medium=employee&utm_source=praveent.com&utm_campaign=website" target="_blank">Join us</a>.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {props.latestPost.map(post => (
                    <div className="bg-white shadow-lg overflow-hidden rounded-xl mb-6">
                        <div className="px-6 py-6">
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
                                                <h4 className="text-xl leading-6 font-medium text-gray-800">{post.title}</h4>
                                                <p className="mt-2 max-w-2xl text-md text-gray-600">{post.excerpt.substring(0, 150) }{ post.excerpt.length >= 150 && `...` }</p>
                                            </div>
                                        </Link>
                                        <div className="mt-2">
                                            <Link href={`/post/${post.slug}`}>
                                                <button type="button" className="mr-4 mt-4 inline-flex items-center px-4 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                    <BookOpenIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    Read ({post.reading_time + ' min'})
                                                </button>
                                            </Link>
                                            <RWebShare data={{ text: post.excerpt, url: 'https://praveent.com/post/' + post.slug, title: post.title, }}>
                                                <button type="button" className="mr-4 mt-4 inline-flex items-center px-4 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                    <AnnotationIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                    Share
                                                </button>
                                            </RWebShare>
                                            <Link href="/posts">
                                                <button type="button" className="mr-4 mt-4 inline-flex items-center px-4 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                    <ArrowRightIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
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
                    <Footer />
                </div>
            </main>

        </div>
    )
}