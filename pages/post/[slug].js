import Image from 'next/image'
import Link from 'next/link'
import Header from '../header'
import Footer from '../footer'
import xss from 'xss'
import { getPost, getPosts } from '../../lib/posts'
import { BookOpenIcon, AnnotationIcon } from '@heroicons/react/solid'

export async function getStaticProps(context) {
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

export async function getStaticPaths() {
    const posts = await getPosts()
  
    const paths = posts.map((post) => ({
      params: { slug: post.slug },
    }))
  
    return { paths, fallback: false }
}

export default function PostSingle(props) {
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
    )
}