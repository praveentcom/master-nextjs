import Image from 'next/image'
import Header from './header'
import Footer from './footer'
import { getPosts } from '../lib/posts';

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
        <div className="container mx-auto p-8 md:pt-12">
            <Header />
            <div className="bg-white shadow-lg overflow-hidden rounded-lg">
                <div className="px-6 py-6">
                    <div className="grid grid-cols-8 gap-6">
                        <ul>
                            {props.posts.map(post => (
                                <li key={post.id}>{post.title}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}