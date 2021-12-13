import Head from 'next/head'
import Header from './header'
import Footer from './footer'
import { MailIcon } from '@heroicons/react/solid'
import { getLatestPost, getPosts } from '../lib/posts'

import { useForm } from 'react-hook-form';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { yupResolver } = require('@hookform/resolvers/yup')
import * as Yup from 'yup';

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

export default function Newsletter(props) {
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(data) {
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
        return false;
    }

    return (
        <div>
            <Head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:site_name" content="Praveen Thirumurugan" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Praveen Thirumurugan - Subscribe to newsletter" />
                <meta property="og:description" content="Praveen Thirumurugan - Subscribe to newsletter" />
                <meta property="og:url" content={'https://www.praveent.com/'} />
                <meta property="og:image" content="" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Praveen Thirumurugan - Subscribe to newsletter" />
                <meta name="twitter:description" content="Praveen Thirumurugan - Subscribe to newsletter" />
                <meta name="twitter:url" content="https://www.praveent.com/" />
                <meta name="twitter:image" content="https://www.praveent.com/_next/image/?url=%2Fimages%2Fwebsite.png" />
                <meta name="twitter:site" content="@praveentcom" />
                <meta name="twitter:creator" content="@praveentcom" />
                <script async defer src="https://sa.praveent.com/latest.js"></script>
                <title>Praveen Thirumurugan - Subscribe to newsletter</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Header data={props.posts.slice(0,3)} />
                <div className="container p-4 pt-6 mx-auto max-w-7xl md:px-6">
                    <div className="grid grid-cols-12 gap-6 mb-6">
                        <div className="col-span-12 md:col-span-8">
                            <div className="mb-6 overflow-hidden md:bg-white md:shadow-lg md:rounded-xl">
                                <div className="m-2 md:m-0 md:p-6">
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-600">Subscribe to newsletter 📬</h1>
                                    <p className="pb-6 mt-4 text-gray-500 border-b-2 border-gray-100">
                                        Hey there, once you sign up to the newsletter with your email, you will receive the articles I post directly to your inbox. In case you wish to opt out in future, you can click the unsubscribe link in one of the emails you received from me.
                                    </p>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="pt-6">
                                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                                Email address
                                            </label>
                                            <div className="flex mt-1 rounded-md shadow-sm">
                                                <input {...register('email')} type="text" name="email" id="email" autoComplete="email" placeholder="mail@praveent.com" className="block w-full border-gray-300 rounded-md md:w-2/5 focus:ring-slate-500 focus:border-slate-500"/>
                                            </div>
                                            <button type="submit" disabled={errors.email ? true : false } className="inline-flex justify-center w-full px-4 py-2 my-4 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-slate-600 disabled:bg-gray-200 disabled:text-white md:w-2/5 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                                                Subscribe this email
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 col-span-12 md:col-span-4" style={{alignItems: "flex-start", height: "min-content"}}>
                            <div className="col-span-12 mb-6 overflow-hidden bg-white shadow-lg rounded-xl">
                                <div className="px-6 pt-4 pb-2 border-b-2 border-gray-100">
                                    <span className="inline-flex text-sm font-semibold text-gray-500">
                                        <MailIcon className="w-5 h-5 mr-2 text-gray-400" aria-hidden="true" />
                                        EMAIL PRIVACY
                                    </span>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-center m-2">
                                        <p className="text-center text-gray-500 text-md">
                                            Please be 100% assured, your email will never be shared with anyone or be used for any other purposes apart from sending emails about the articles I write.
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