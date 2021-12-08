import Image from 'next/image'
import xss from 'xss'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../header'
import Footer from '../footer'
import { getPost, getPosts } from '../../lib/posts'
import { BookOpenIcon, AnnotationIcon } from '@heroicons/react/solid'

export async function getServerSideProps(context) {
    const post = await getPost(context.params.slug)
    if (!post) {
        return {
            notFound: true,
        }
    }
  
    return {
        props: { post }
    }
}

export default function PostSingle(props) {
    return (
        <div>
            <Head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:site_name" content="Praveen Thirumurugan" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={props.post ? props.post.title : 'Praveen Thirumurugan'} />
                <meta property="og:description" content={props.post ? props.post.excerpt : 'Praveen Thirumurugan'} />
                <meta property="og:url" content={'https://www.praveent.com/' + props.post.slug + '/'} />
                <meta property="og:image" content={props.post ? props.post.featured_image : 'https://www.praveent.com/_next/image/?url=%2Fimages%2Favatar_light.png'} />
                <meta property="article:published_time" content={props.post.published_at} />
                <meta property="article:modified_time" content={props.post.updated_at} />
                <meta property="article:tag" content={props.post.tags[0].name} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={props.post ? props.post.title : 'Praveen Thirumurugan'} />
                <meta name="twitter:description" content={props.post ? props.post.excerpt : 'Praveen Thirumurugan'} />
                <meta name="twitter:url" content={'https://www.praveent.com/' + props.post.slug + '/'} />
                <meta name="twitter:image" content={props.post ? props.post.featured_image : 'https://www.praveent.com/_next/image/?url=%2Fimages%2Favatar_light.png'} />
                <meta name="twitter:label1" content="Written by" />
                <meta name="twitter:data1" content="Praveen Thirumurugan" />
                <meta name="twitter:label2" content="Filed under" />
                <meta name="twitter:data2" content={props.post.tags[0].name} />
                <meta name="twitter:site" content="@praveentcom" />
                <meta name="twitter:creator" content="@praveentcom" />
                <script type="application/ld+json">
                    {
                        {
                            "@context": "https://schema.org",
                            "@type": "Article",
                            "publisher": {
                                "@type": "Organization",
                                "name": "Praveen Thirumurugan",
                                "url": "https://www.praveent.com/",
                                "logo": {
                                    "@type": "ImageObject",
                                    "url": "https://www.praveent.com/_next/image/?url=%2Fimages%2Favatar_light.png"
                                }
                            },
                            "author": {
                                "@type": "Person",
                                "name": "Praveen Thirumurugan",
                                "image": {
                                    "@type": "ImageObject",
                                    "url": "https://www.praveent.com/_next/image/?url=%2Fimages%2Favatar_light.png",
                                    "width": 1080,
                                    "height": 1080
                                },
                                "url": "https://www.praveent.com/posts/",
                                "sameAs": [
                                    "https://praveent.com",
                                    "https://twitter.com/praveentcom"
                                ]
                            },
                            "headline": props.post ? props.post.title : 'Praveen Thirumurugan',
                            "url": 'https://www.praveent.com/' + props.post.slug + '/',
                            "datePublished": props.post.published_at,
                            "dateModified": props.post.updated_at,
                            "image": {
                                "@type": "ImageObject",
                                "url": props.post ? props.post.featured_image : 'https://www.praveent.com/_next/image/?url=%2Fimages%2Favatar_light.png',
                                "width": 1920,
                                "height": 1080
                            },
                            "keywords": props.post.tags[0].name,
                            "description": props.post ? props.post.excerpt : 'Praveen Thirumurugan',
                            "mainEntityOfPage": {
                                "@type": "WebPage",
                                "@id": "https://www.praveent.com/"
                            }
                        }
                    }
                </script>
                <link rel="alternate" type="application/rss+xml" title="Praveen Thirumurugan" href="https://blog.praveent.com/rss/" />
                <script async defer src="https://sa.praveent.com/latest.js"></script>
                <title>{props.post ? props.post.title : 'Praveen Thirumurugan'}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
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
                        <li>
                            <Link href="/posts">
                                <div class="flex items-center">
                                    <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <a href="#" class="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium dark:text-gray-400 dark:hover:text-white">Blog posts</a>
                                </div>
                            </Link>
                        </li>
                        <li aria-current="page">
                            <div class="flex items-center">
                                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                <span class="text-gray-400 ml-1 md:ml-2 text-sm font-medium dark:text-gray-500">👋🏼</span>
                            </div>
                        </li>
                    </ol>
                </nav>
                <div className="col-span-12 md:col-span-6 bg-white shadow-lg overflow-hidden rounded-xl mt-6 p-6">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="flex items-center justify-center col-span-12 md:col-span-5">
                            <img className="rounded" width="100%" src={props.post ? props.post.feature_image : '/images/avatar_light.png' } alt={props.post ? props.post.id : 'Blog image failed to load'}/>
                        </div>
                        <div className="flex items-center col-span-12 md:col-span-7">
                            <div>
                                <h4 className="text-3xl leading-1 font-medium text-gray-800">{props.post.title}</h4>
                                <p className="mt-4 max-w-2xl text-md text-gray-600">{props.post.excerpt.substring(0, 150) }{ props.post.excerpt.length >= 150 && `...` }</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex col-span-12">
                        <div className="blog mt-6" dangerouslySetInnerHTML={{ __html: xss(props.post.html) }} />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}