import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/header'
import Footer from '../components/footer'
import { BriefcaseIcon, HeartIcon, BookOpenIcon, AnnotationIcon, ArrowRightIcon, CodeIcon } from '@heroicons/react/solid'
import { RWebShare } from 'react-web-share'
import Link from 'next/link'
import groq from 'groq'
import imageUrlBuilder from '@sanity/image-url'
import sanityClient from '../lib/sanity'
import { fetchPosts } from '../lib/hashnode'

function urlFor (source) {
    return imageUrlBuilder(sanityClient).image(source)
}

export async function getStaticProps() {
    const latestPost = await sanityClient.fetch(groq`
        *[_type == "post" && publishedAt < now()] | order(publishedAt desc) [0]{
            title,
            "categories": categories[]->title,
            mainImage,
            slug,
            excerpt,
            readingTime
        }
    `);
    const latestHashnodePost = await fetchPosts({ onlyLatestPost: true });
    return {
        props: {
            latestPost,
            latestHashnodePost
        }
    }
}

export default function Home({ latestPost, latestHashnodePost }) {
    return (
        <div>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:site_name" content="Praveen Thirumurugan" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Praveen Thirumurugan" />
                <meta property="og:description" content="Praveen Thirumurugan" />
                <meta property="og:url" content={'https://www.praveent.com/'} />
                <meta property="og:image" content="https://www.praveent.com/images/website.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Praveen Thirumurugan" />
                <meta name="twitter:description" content="Praveen Thirumurugan" />
                <meta name="twitter:url" content="https://www.praveent.com/" />
                <meta name="twitter:image" content="https://www.praveent.com/images/website.png" />
                <meta name="twitter:site" content="@praveentcom" />
                <meta name="twitter:creator" content="@praveentcom" />
                <title>Praveen Thirumurugan</title>
                <link rel="icon" href="/favicon.ico" />
                <script src="https://unpkg.com/embeddable-nfts/dist/nft-card.min.js"></script>
                <script async defer src="https://sa.praveent.com/latest.js"></script>
            </Head>
            <main>
                <Header />
                <div className="container p-4 pt-6 mx-auto max-w-7xl md:px-6">
                    <div className="grid grid-cols-12 gap-6 mb-6">
                        <div className="col-span-12 md:col-span-8">
                            <div className="mb-6 overflow-hidden md:bg-white md:shadow-lg md:rounded-xl">
                                <div className="m-2 md:m-0 md:p-6">
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-600">Hey there, I'm Praveen! ????????</h1>
                                    <p className="pb-2 mt-4 text-gray-500 md:pb-0">
                                        Welcome home. One central location where you'll find everything I love.
                                        Myself, a lad who loves building products and creating engineering masterpieces with code.
                                        Choose humility over arrogance :)
                                    </p>
                                </div>
                            </div>
                            {
                                <div className="mt-4 mb-6 overflow-hidden bg-white shadow-lg rounded-xl">
                                    <div className="px-6 pt-4 pb-2 border-b-2 border-gray-100">
                                        <span className="inline-flex text-sm font-semibold text-gray-500">
                                            <BookOpenIcon className="w-5 h-5 mr-2 text-gray-400" aria-hidden="true" />
                                            LATEST BLOG ARTICLE
                                        </span>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-12 gap-6">
                                            <Link href={`/post/${latestPost.slug.current}`}>
                                                <div className="flex items-center justify-center col-span-12 md:col-span-5" style={{cursor: 'pointer'}}>
                                                    <img className="rounded" width="100%" src={latestPost ? urlFor(latestPost.mainImage).width(1920).url() : '/images/avatar_light.png' } alt={latestPost ? latestPost.title : 'Blog image failed to load'}/>
                                                </div>
                                            </Link>
                                            <div className="flex items-center col-span-12 md:col-span-7">
                                                <div>
                                                    <Link href={`/post/${latestPost.slug.current}`}>
                                                        <div style={{cursor: 'pointer'}}>
                                                            <h4 className="text-xl font-medium leading-6 text-gray-600">{latestPost.title}</h4>
                                                            <p className="max-w-2xl mt-2 text-gray-500 text-md">{latestPost.excerpt.substring(0, 150) }{ latestPost.excerpt.length >= 150 && `...` }</p>
                                                        </div>
                                                    </Link>
                                                    <div className="mt-2">
                                                        <Link href={`/post/${latestPost.slug.current}`}>
                                                            <button type="button" className="inline-flex items-center px-4 py-1 mt-4 mr-4 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                                                                <BookOpenIcon className="w-5 h-5 mr-2 -ml-1 text-gray-400" aria-hidden="true" />
                                                                Read ({latestPost.readingTime + ' min'})
                                                            </button>
                                                        </Link>
                                                        <RWebShare data={{ text: latestPost.title, url: 'https://praveent.com/post/' + latestPost.slug.current, title: latestPost.title, }}>
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
                            }
                            {
                                <div className="mt-4 mb-6 overflow-hidden bg-white shadow-lg rounded-xl">
                                    <div className="px-6 pt-4 pb-2 border-b-2 border-gray-100">
                                        <span className="inline-flex text-sm font-semibold text-gray-500">
                                            <CodeIcon className="w-5 h-5 mr-2 text-gray-400" aria-hidden="true" />
                                            LATEST HASHNODE ARTICLE
                                        </span>
                                    </div>
                                    <div className="p-6">
                                        <div className="grid grid-cols-12 gap-6">
                                            <Link href={`/dev-post/${latestHashnodePost.slug}`}>
                                                <div className="flex items-center justify-center col-span-12 md:col-span-5" style={{cursor: 'pointer'}}>
                                                    <img className="rounded" width="100%" src={latestHashnodePost ? latestHashnodePost.coverImage : '/images/avatar_light.png' } alt={latestHashnodePost ? latestHashnodePost.title : 'Blog image failed to load'}/>
                                                </div>
                                            </Link>
                                            <div className="flex items-center col-span-12 md:col-span-7">
                                                <div>
                                                    <Link href={`/dev-post/${latestHashnodePost.slug}`}>
                                                        <div style={{cursor: 'pointer'}}>
                                                            <h4 className="text-xl font-medium leading-6 text-gray-600">{latestHashnodePost.title}</h4>
                                                            <p className="max-w-2xl mt-2 text-gray-500 text-md">{latestHashnodePost.brief.substring(0, 150) }{ latestHashnodePost.brief.length >= 150 && `...` }</p>
                                                        </div>
                                                    </Link>
                                                    <div className="mt-2">
                                                        <Link href={`/dev-post/${latestHashnodePost.slug}`}>
                                                            <button type="button" className="inline-flex items-center px-4 py-1 mt-4 mr-4 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                                                                <BookOpenIcon className="w-5 h-5 mr-2 -ml-1 text-gray-400" aria-hidden="true" />
                                                                Read
                                                            </button>
                                                        </Link>
                                                        <RWebShare data={{ text: latestHashnodePost.slug, url: 'https://www.praveent.com/dev-post/' + latestHashnodePost.slug, title: latestHashnodePost.title }}>
                                                            <button type="button" className="inline-flex items-center px-4 py-1 mt-4 mr-4 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                                                                <AnnotationIcon className="w-5 h-5 mr-2 -ml-1 text-gray-400" aria-hidden="true" />
                                                                Share
                                                            </button>
                                                        </RWebShare>
                                                        <Link href="/dev-posts">
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
                            }
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
                                    <div className='flex items-center justify-center m-2 mt-5'>
                                        <a href="https://www.producthunt.com/posts/plum-lite?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-plum-lite" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=326559&theme=light" alt="Plum Lite - Health benefits for teams as small as 2 in India.  | Product Hunt" style={{width: 200, height: 42}} width="200" height="42" /></a>
                                    </div>
                                    <div className='flex items-center justify-center m-2'>
                                        <a href="https://www.producthunt.com/posts/plum-lite?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-plum-lite" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=326559&theme=light&period=daily" alt="Plum Lite - Health benefits for teams as small as 2 in India | Product Hunt" style={{width: 200, height: 42}} width="200" height="42" /></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 mb-6 overflow-hidden bg-white shadow-lg rounded-xl">
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
                            <div className="col-span-12 mb-6 overflow-hidden bg-white shadow-lg rounded-xl">
                                <div className="px-6 pt-4 pb-2 border-b-2 border-gray-100">
                                    <span className="inline-flex text-sm font-semibold text-gray-500">
                                        <BookOpenIcon className="w-5 h-5 mr-2 text-gray-400" aria-hidden="true" />
                                        NFT COLLECTION
                                    </span>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-12">
                                        <div className="col-span-2">
                                            <a target="_blank" href="https://opensea.io/assets/0x495f947276749ce646f68ac8c248420045cb7b5e/57352731342957177417825350713159256617185546397448637473855859195609324978177"> 
                                                <img className="rounded-md" src="https://lh3.googleusercontent.com/hL1Pjb7u2F69KLJQ4sn3g4Zda0zVik_A_y_l-rCn85yLHesMMrglUlxnlEHcADY37yM-xy7FGVdR5D-_tkU3fOZdbjwWIauVuk_u=w128" />
                                            </a>
                                        </div>
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