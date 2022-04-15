import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { fetchSinglePost } from '../../lib/hashnode'
import { BookOpenIcon, ClockIcon, CodeIcon } from '@heroicons/react/outline'
import ReactMarkdown from 'react-markdown'

export async function getServerSideProps(context) {
    const post = await fetchSinglePost({ slug: context.params.slug })
    return {
        props: {
            post
        }
    }
}

export default function PostSingle({ post }) {
    const {
        title = 'Article',
        author = {
            name: 'Praveen Thirumurugan'
        },
        slug,
        brief,
        coverImage,
        tags = [],
        dateAdded,
        dateUpdated,
        contentMarkdown
    } = post;
    const BLOG_ARTICLE_SCHEMA = JSON.stringify(
        {
            "@context": "https://schema.org",
            "@type": "Article",
            "publisher": {
                "@type": "Organization",
                "name": author.name,
                "url": "https://www.praveent.com/",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.praveent.com/_next/image/?url=%2Fimages%2Favatar_light.png"
                }
            },
            "author": {
                "@type": "Person",
                "name": author.name,
                "image": {
                    "@type": "ImageObject",
                    "url": "https://www.praveent.com/_next/image/?url=%2Fimages%2Favatar_light.png",
                    "width": 1080,
                    "height": 1080
                },
                "url": "https://www.praveent.com/dev-posts/",
                "sameAs": [
                    "https://praveent.com",
                    "https://twitter.com/praveentcom"
                ]
            },
            "headline": title || 'Praveen Thirumurugan',
            "url": 'https://www.praveent.com/dev-post/' + slug + '/',
            "datePublished": dateAdded,
            "dateModified": dateUpdated,
            "image": {
                "@type": "ImageObject",
                "url": coverImage || 'https://www.praveent.com/_next/image/?url=%2Fimages%2Favatar_light.png',
                "width": 1920,
                "height": 1080
            },
            "keywords": tags.map(function(tag) {
                return tag['name'];
            }).toString(),
            "description": brief || 'Praveen Thirumurugan',
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://www.praveent.com/"
            }
        }
    );
    return (
        <div>
            <Head>
            <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:site_name" content="Praveen Thirumurugan" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={title || 'Praveen Thirumurugan'} />
                <meta property="og:description" content={brief || 'Praveen Thirumurugan'} />
                <meta property="og:url" content={'https://www.praveent.com/post/' + slug + '/'} />
                <meta property="og:image" content={coverImage || 'https://www.praveent.com/_next/image/?url=%2Fimages%2Favatar_light.png'} />
                <meta property="article:published_time" content={dateAdded} />
                <meta property="article:modified_time" content={dateUpdated} />
                <meta property="article:tag" content={tags[0].name} />
                <meta property="description" content={brief || 'Praveen Thirumurugan'} />
                <meta property="keywords" content={tags ? tags.map(function(tag) {
                    return tag['name'];
                }).toString() : 'Praveen Thirumurugan'} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title || 'Praveen Thirumurugan'} />
                <meta name="twitter:description" content={brief || 'Praveen Thirumurugan'} />
                <meta name="twitter:url" content={'https://www.praveent.com/' + slug + '/'} />
                <meta name="twitter:image" content={coverImage || 'https://www.praveent.com/_next/image/?url=%2Fimages%2Favatar_light.png'} />
                <meta name="twitter:label1" content="Written by" />
                <meta name="twitter:data1" content={author.name || "Praveen Thirumurugan"} />
                <meta name="twitter:label2" content="Filed under" />
                <meta name="twitter:data2" content={tags[0].name} />
                <meta name="twitter:site" content="@praveentcom" />
                <meta name="twitter:creator" content="@praveentcom" />
                <script type="application/ld+json" dangerouslySetInnerHTML={ { __html: BLOG_ARTICLE_SCHEMA} } />
                <link rel="alternate" type="application/rss+xml" title="Praveen Thirumurugan" href="https://blog.praveent.com/rss/" />
                <script async defer src="https://sa.praveent.com/latest.js"></script>
                <title>{title || 'Praveen Thirumurugan'}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Header />
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
                            <li>
                                <Link href="/dev-posts">
                                    <div class="flex items-center">
                                        <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                        <a href="#" class="text-gray-500 hover:text-gray-700 ml-1 md:ml-2 text-sm font-medium dark:text-gray-400 dark:hover:text-white">Hashnode posts</a>
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
                    <div className="grid grid-cols-12 gap-6 mt-6 mb-6">
                        <div className="col-span-12 p-6 overflow-y-scroll bg-white shadow-lg md:col-span-4 rounded-xl" style={{height: "min-content"}}>
                            <div className="flex items-center justify-center">
                                <img className="rounded" width="100%" src={coverImage || '/images/avatar_light.png' } alt={title || 'Blog image failed to load'}/>
                            </div>
                            <div className="flex items-center">
                                <div>
                                    <h4 className="mt-6 text-2xl font-medium text-gray-600 leading-1" style={{ marginBottom: '24px' }}>{title}</h4>
                                    <div className='grid grid-cols-2'>
                                        {tags.map(tag => (
                                            <div className='grid' style={{ border: '2px solid #EEE', background: '#F3F3F3', borderRadius: '8px', marginRight: '8px', marginBottom: '8px' }}>
                                                <div style={{ padding: '8px', display: 'flex', alignItems: 'center' }}>
                                                    {tag.logo
                                                        ? (<img width="24px" src={tag.logo || ''} alt={tag.name} style={{float: 'left', marginLeft: '4px', marginRight: '8px'}} />)
                                                        : (<CodeIcon className="w-5 h-5 mr-2 text-gray-400" aria-hidden="true" style={{float: 'left', marginLeft: '4px', marginRight: '8px'}} />)
                                                    }
                                                    <p>{tag.name}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="mt-4 text-gray-500 text-md">{brief}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 overflow-hidden bg-white shadow-lg md:col-span-8 rounded-xl">
                            <div className="px-6 pt-4 pb-2 border-b-2 border-gray-100">
                                <span className="inline-flex text-sm font-semibold text-gray-500">
                                    <ClockIcon className="w-5 h-5 mr-2 text-gray-400" aria-hidden="true" />
                                    { new Date(dateAdded).toDateString() }
                                </span>
                            </div>
                            <div className="p-6">
                                <div className="blog">
                                    <ReactMarkdown>
                                        { contentMarkdown }
                                    </ReactMarkdown>
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