
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Header from './header'
import Footer from './footer'
import Moment from 'moment';
import { useRouter } from 'next/router'
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
                <div className="container mx-auto p-8 md:pt-12">
                    <Header />
                    {props.posts.map(post => (
                    <div className="bg-white shadow-lg overflow-hidden rounded-lg mb-8">
                        <div className="px-6 py-6">
                            <div className="grid grid-cols-12 gap-6">
                                <div className="flex items-center justify-center col-span-12 md:col-span-5">
                                    <img className="rounded" width="100%" src={post ? post.feature_image : '/images/avatar_light.png' } alt={post ? post.id : 'Blog image failed to load'}/>
                                </div>
                                <div className="flex items-center col-span-12 md:col-span-7">
                                    <div>
                                        <h4 className="text-xl leading-6 font-medium text-gray-900">{post.title}</h4>
                                        <p className="mt-2 max-w-2xl text-md text-gray-600">{post.excerpt.substring(0, 150) } { post.excerpt.length >= 150 && `...` }</p>
                                        <div className="mt-4">
                                            <button type="button" className="inline-flex items-center px-4 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                <AnnotationIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                Share
                                            </button>
                                            <button type="button" className="ml-4 inline-flex items-center px-4 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                <BookOpenIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                Read ({post.reading_time + ' min'})
                                            </button>
                                            <button type="button" className="ml-4 inline-flex items-center px-4 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                <ArrowRightIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                All articles
                                            </button>
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