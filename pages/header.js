import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { BookOpenIcon, DesktopComputerIcon, MenuIcon, PhoneIcon,
    CodeIcon, XIcon, BriefcaseIcon, SparklesIcon, MailIcon } from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'

const socialLinks = [
  {
    name: 'GitHub',
    description: 'Find inspiration from contributions made in GitHub',
    href: 'https://github.com/praveentcom',
    icon: CodeIcon,
  },
  {
    name: 'LinkedIn',
    description: 'For all the professional conversations and relationships.',
    href: 'https://linkedin.com/in/praveentcom',
    icon: BriefcaseIcon,
  },
  {
    name: 'Twitter',
    description: "Isn't twitter fun? Let's catch up and get to know each other.",
    href: 'https://twitter.com/praveentcom',
    icon: SparklesIcon,
  },
]

const callsToAction = [
  { name: 'Mail me', href: 'mailto:mail@praveent.com', icon: MailIcon },
  { name: 'Call me', href: 'tel:918838118348', icon: PhoneIcon },
]

const blogResources = [
    {
        name: 'Personal Blog',
        description: 'Read all the latest articles I muse on travel and passion.',
        href: '/posts',
        target: '_self',
        icon: BookOpenIcon,
    },
    {
        name: 'Tech Blog',
        description: 'I write on hashnode to keep the knack of tech thoughts separate',
        href: 'https://binary.praveent.com',
        target: '_blank',
        icon: DesktopComputerIcon,
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header({data}) {
    return (
        <div>
            <Popover className="relative bg-white border-b-2 border-gray-100">
                <div className="px-6 mx-auto max-w-7xl">
                    <div className="flex items-center justify-between py-4 md:justify-start md:space-x-10">
                        <div className="flex justify-start md:w-0 md:flex-1 md:px-2">
                            <Link href="/">
                                <a href="/">
                                    <span className="sr-only">Praveen Thirumurugan</span>
                                    <Image className="rounded-full" src="/images/avatar_light.png" width={48} height={48} alt="Praveen's avatar"/>
                                </a>
                            </Link>
                        </div>
                        <div className="-my-2 -mr-2 md:hidden">
                            <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500">
                            <span className="sr-only">Open menu</span>
                            <MenuIcon className="w-6 h-6" aria-hidden="true" />
                            </Popover.Button>
                        </div>
                        <Popover.Group as="nav" className="hidden space-x-10 md:flex">
                            <Link href="/about">
                                <a href="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                    About
                                </a>
                            </Link>
                            <Popover className="relative">
                                {({ open }) => (
                                    <>
                                    <Popover.Button className={classNames(open ? 'text-gray-900' : 'text-gray-500', 'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500')}>
                                        <span>Blogs</span>
                                        <ChevronDownIcon className={classNames(open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500')} aria-hidden="true" />
                                    </Popover.Button>
                                    <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
                                        <Popover.Panel className="absolute z-10 w-screen max-w-md px-2 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
                                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                                <div className="relative grid gap-6 px-5 py-6 bg-white sm:gap-8 sm:p-8">
                                                    {blogResources.map((item) => (
                                                        <Link href={item.href}>
                                                            <a key={item.name} href={item.href} target={item.target} className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50">
                                                                <item.icon className="flex-shrink-0 w-6 h-6 text-slate-600" aria-hidden="true" />
                                                                <div className="ml-4">
                                                                    <p className="text-base font-medium text-gray-900">{item.name}</p>
                                                                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                                                </div>
                                                            </a>
                                                        </Link>
                                                    ))}
                                                </div>
                                                <div className="px-5 py-5 bg-gray-50 sm:px-8 sm:py-8">
                                                    <div>
                                                        <h3 className="text-sm font-medium tracking-wide text-gray-500 uppercase">Recent Articles</h3>
                                                        <ul role="list" className="mt-4 space-y-4">
                                                        {data.map(post => (
                                                            <li href={`/post/${post.slug}`} className="text-base truncate">
                                                                <a href={`/post/${post.slug}`} className="font-medium text-gray-900 hover:text-gray-700">
                                                                    {post.title}
                                                                </a>
                                                            </li>
                                                        ))}
                                                        </ul>
                                                    </div>
                                                    <div className="mt-5 text-sm">
                                                        <Link href="/posts">
                                                            <a href="/posts" className="font-medium text-slate-600 hover:text-slate-500">
                                                                View all articles <span aria-hidden="true">&rarr;</span>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                    </>
                                )}
                            </Popover>
                            <Popover className="relative">
                                {({ open }) => (
                                    <>
                                    <Popover.Button className={classNames(open ? 'text-gray-900' : 'text-gray-500', 'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500')}>
                                        <span>Connect</span>
                                        <ChevronDownIcon className={classNames(open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500')} aria-hidden="true" />
                                    </Popover.Button>
                                    <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
                                        <Popover.Panel className="absolute z-10 w-screen max-w-md px-2 mt-3 -ml-4 transform sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                            <div className="relative grid gap-6 px-5 py-6 bg-white sm:gap-8 sm:p-8">
                                                {socialLinks.map((item) => (
                                                    <a key={item.name} href={item.href} className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50">
                                                        <item.icon className="flex-shrink-0 w-6 h-6 text-slate-600" aria-hidden="true" />
                                                        <div className="ml-4">
                                                            <p className="text-base font-medium text-gray-900">{item.name}</p>
                                                            <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                            <div className="px-5 py-5 space-y-6 bg-gray-50 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                                                {callsToAction.map((item) => (
                                                    <div key={item.name} className="flow-root">
                                                        <a href={item.href} className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 rounded-md hover:bg-gray-100">
                                                            <item.icon className="flex-shrink-0 w-6 h-6 text-gray-400" aria-hidden="true" />
                                                            <span className="ml-3">{item.name}</span>
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        </Popover.Panel>
                                    </Transition>
                                    </>
                                )}
                            </Popover>
                        </Popover.Group>
                        <div className="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
                            <a href="https://cal.praveent.com/schedule" target="_blank" className="text-base font-medium text-gray-500 whitespace-nowrap hover:text-gray-900">
                                Schedule call
                            </a>
                            <Link href="/newsletter">
                                <a href="/newsletter" className="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-slate-600 whitespace-nowrap hover:bg-slate-700">
                                    Subscribe to newsletter
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <Transition as={Fragment} enter="duration-200 ease-out" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                    <Popover.Panel focus className="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden">
                        <div className="bg-white divide-y-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-gray-50">
                            <div className="px-5 pt-5 pb-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <Image className="rounded-full" src="/images/avatar_light.png" width={48} height={48} alt="Praveen's avatar"/>
                                    </div>
                                    <div className="-mr-2">
                                    <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500">
                                        <span className="sr-only">Close menu</span>
                                        <XIcon className="w-6 h-6" aria-hidden="true" />
                                    </Popover.Button>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <nav className="grid gap-y-8">
                                        {socialLinks.map((item) => (
                                            <a key={item.name} href={item.href} className="flex items-center p-3 -m-3 rounded-md hover:bg-gray-50">
                                                <item.icon className="flex-shrink-0 w-6 h-6 text-slate-600" aria-hidden="true" />
                                                <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                            <div className="px-5 py-6 space-y-6">
                                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                    <Link href="/about">
                                        <a href="/about" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                            About me
                                        </a>
                                    </Link>
                                    {blogResources.map((item) => (
                                        <Link href={item.href}>
                                            <a key={item.name} href={item.href} className="text-base font-medium text-gray-900 hover:text-gray-700">
                                                {item.name}
                                            </a>
                                        </Link>
                                    ))}
                                </div>
                                <div>
                                    <Link href="/newsletter">
                                        <a href="/newsletter" className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-slate-600 hover:bg-slate-700">
                                            Subscribe to newsletter
                                        </a>
                                    </Link>
                                    <p className="mt-6 text-base font-medium text-center text-gray-500">
                                        Have something to talk?{' '}
                                        <a href="https://cal.praveent.com/schedule" target="_blank" className="text-slate-600 hover:text-slate-500">
                                            Schedule call
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
        </div>
    )
}