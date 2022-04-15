import { RWebShare } from 'react-web-share'
import { BookOpenIcon, AnnotationIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/header'
import Footer from '../components/footer'
import { fetchPosts } from '../lib/hashnode'

export async function getStaticProps() {
    const posts = await fetchPosts({ onlyLatestPost: false });
    return {
        props: {
            posts
        }
    }
}

export default function Posts({posts}) {
    return (
        <div>
            <Head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:site_name" content="Praveen Thirumurugan" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Praveen Thirumurugan - Hashnode articles" />
                <meta property="og:description" content="Praveen Thirumurugan - Hashnode articles" />
                <meta property="og:url" content={'https://www.praveent.com/dev-posts/'} />
                <meta property="og:image" content="" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Praveen Thirumurugan - Hashnode articles" />
                <meta name="twitter:description" content="Praveen Thirumurugan - Hashnode articles" />
                <meta name="twitter:url" content="https://www.praveent.com/dev-posts/" />
                <meta name="twitter:image" content="https://www.praveent.com/_next/image/?url=%2Fimages%2Fwebsite.png" />
                <meta name="twitter:site" content="@praveentcom" />
                <meta name="twitter:creator" content="@praveentcom" />
                <script async defer src="https://sa.praveent.com/latest.js"></script>
                <title>Praveen Thirumurugan - Hashnode articles</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Header />
                <div className="container p-4 pt-6 mx-auto max-w-7xl md:px-6">
                    <nav class="flex text-gray-500 px-2" aria-label="Breadcrumb">
                        <ol class="inline-flex items-center space-x-1 md:space-x-3">
                            <li class="inline-flex items-center">
                            <Link href="/">
                                <a href="#" class="text-gray-500 hover:text-gray-600 inline-flex items-center text-sm font-medium dark:text-gray-400 dark:hover:text-white">
                                    <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                    Home
                                </a>
                            </Link>
                            </li>
                            <li aria-current="page">
                            <div class="flex items-center">
                                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                <span class="text-gray-400 ml-1 md:ml-2 text-sm font-medium dark:text-gray-500">Hashnode posts</span>
                            </div>
                            </li>
                        </ol>
                    </nav>
                    <div className="grid grid-cols-12 gap-6 mt-6 mb-6">
                    {posts.map(post => (
                        <div className="col-span-12 overflow-hidden bg-white shadow-lg md:col-span-4 rounded-xl">
                            <div className="px-6 py-6">
                                <div className="grid grid-cols-12 gap-6">
                                    <Link href={`/dev-post/${post.slug}`}>
                                        <div className="flex items-center justify-center col-span-12" style={{cursor: 'pointer'}}>
                                            <img className="rounded" width="100%" src={post ? post.coverImage : '/images/avatar_light.png' } alt={post ? post.title : 'Blog image failed to load'}/>
                                        </div>
                                    </Link>
                                    <div className="flex items-center col-span-12">
                                        <div>
                                            <Link href={`/dev-post/${post.slug}`}>
                                                <div style={{cursor: 'pointer'}}>
                                                    <h4 className="text-xl font-medium leading-6 text-gray-600">{post.title}</h4>
                                                    <p className="max-w-2xl mt-2 text-gray-500 text-md">{post.brief.substring(0, 150) }{ post.brief.length >= 150 && `...` }</p>
                                                </div>
                                            </Link>
                                            <div className="mt-6">
                                                <Link href={`/dev-post/${post.slug}`}>
                                                    <button type="button" className="inline-flex items-center px-4 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                                                        <BookOpenIcon className="w-5 h-5 mr-2 -ml-1 text-gray-400" aria-hidden="true" />
                                                        Read
                                                    </button>
                                                </Link>
                                                <RWebShare data={{ text: post.title, url: 'https://praveent.com/dev-post/' + post.slug, title: post.title, }}>
                                                    <button type="button" className="inline-flex items-center px-4 py-1 ml-4 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                                                        <AnnotationIcon className="w-5 h-5 mr-2 -ml-1 text-gray-400" aria-hidden="true" />
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
            </main>
        </div>
    )
}