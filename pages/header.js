import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
    return (
        <Link href="/">
            <div className="bg-white shadow-lg overflow-hidden rounded-lg mb-8">
                <div className="px-6 py-6">
                    <div className="grid grid-cols-10 gap-6">
                        <div className="flex items-center justify-center col-span-2 md:col-span-1">
                            <Image className="rounded-full" src="/images/avatar_light.png" height={64} width={64} alt="Praveen's avatar"/>
                        </div>
                        <div className="flex items-center col-span-8 md:col-span-9">
                            <div>
                                <h3 className="text-2xl leading-6 pt-1 font-semibold text-gray-800">Hello, I'm Praveen ✍🏼</h3>
                                <p className="mt-2 max-w-2xl text-lg text-gray-600">I write code, travel and focus on wellbeing.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}