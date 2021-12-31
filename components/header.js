import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon, ArrowNarrowRightIcon } from '@heroicons/react/outline'

export default function Header() {
    return (
        <div>
            <Popover className="relative bg-white border-b-2 border-gray-100">
                <div className="px-6 mx-auto max-w-7xl">
                    <div className="flex items-center justify-between py-4 md:justify-start md:space-x-10">
                        <div className="flex justify-start md:w-0 md:flex-1 md:px-2">
                            <Link href="/">
                                <a href="/" style={{height: 48}}>
                                    <span className="sr-only">Praveen Thirumurugan</span>
                                    <Image className="rounded-full" src="/images/avatar_light.png" width={48} height={48} alt="Praveen's avatar"/>
                                </a>
                            </Link>
                        </div>
                        <div className="items-center justify-end md:flex md:flex-1 lg:w-0">
                            <Link href="https://twitter.com/praveentcom">
                                <a href="https://twitter.com/praveentcom" target="_blank" className="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-sky-600 whitespace-nowrap hover:bg-sky-700">
                                    Let's connect on Twitter
                                    <ArrowNarrowRightIcon className="w-5 h-5 ml-2 text-white" aria-hidden="true" />
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </Popover>
        </div>
    )
}