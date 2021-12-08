import Link from 'next/link'
import Header from './header'
import Footer from './footer'
import { getPosts } from '../lib/posts'
import { RWebShare } from 'react-web-share'
import { BookOpenIcon, AnnotationIcon } from '@heroicons/react/solid'

export async function getStaticProps(context) {
    const posts = await getPosts()
    if (!posts) {
        return {
            notFound: true,
        }
    }
  
    return {
        props: { posts }
    }
}

export default function Posts(props) {
    return (
        <div className="container mx-auto p-4 pt-8 md:pt-12">
            <Header />
            <nav class="flex bg-white shadow-lg text-gray-700 py-3 px-5 rounded-lg" aria-label="Breadcrumb">
                <ol class="inline-flex items-center space-x-1 md:space-x-3">
                    <li class="inline-flex items-center">
                    <Link href="/">
                        <a href="#" class="text-gray-700 hover:text-gray-900 inline-flex items-center text-sm font-medium dark:text-gray-400 dark:hover:text-white">
                            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                            Home
                        </a>
                    </Link>
                    </li>
                    <li aria-current="page">
                    <div class="flex items-center">
                        <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                        <span class="text-gray-400 ml-1 md:ml-2 text-sm font-medium dark:text-gray-500">Blog posts</span>
                    </div>
                    </li>
                </ol>
            </nav>
            <div className="grid grid-cols-12 gap-6 mt-6">
            {props.posts.map(post => (
                <div className="col-span-12 md:col-span-6 bg-white shadow-lg overflow-hidden rounded-xl">
                    <div className="px-6 py-6">
                        <div className="grid grid-cols-12 gap-6">
                            <Link href={`/post/${post.slug}`}>
                                <div className="flex items-center justify-center col-span-12" style={{cursor: 'pointer'}}>
                                    <img className="rounded" width="100%" src={post ? post.feature_image : '/images/avatar_light.png' } alt={post ? post.id : 'Blog image failed to load'}/>
                                </div>
                            </Link>
                            <div className="flex items-center col-span-12">
                                <div>
                                    <Link href={`/post/${post.slug}`}>
                                        <div style={{cursor: 'pointer'}}>
                                            <h4 className="text-xl leading-6 font-medium text-gray-800">{post.title}</h4>
                                            <p className="mt-2 max-w-2xl text-md text-gray-600">{post.excerpt.substring(0, 80) }{ post.excerpt.length >= 80 && `...` }</p>
                                        </div>
                                    </Link>
                                    <div className="mt-6">
                                        <Link href={`/post/${post.slug}`}>
                                            <button type="button" className="inline-flex items-center px-4 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                <BookOpenIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                Read ({post.reading_time + ' min'})
                                            </button>
                                        </Link>
                                        <RWebShare data={{ text: post.excerpt, url: 'https://praveent.com/post/' + post.slug, title: post.title, }}>
                                            <button type="button" className="ml-4 inline-flex items-center px-4 py-1 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                <AnnotationIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                Share
                                            </button>
                                        </RWebShare>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
            <Footer />
        </div>
    )
}