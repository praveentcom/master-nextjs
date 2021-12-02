import Image from 'next/image'

export default function Header() {
    return (
        <div className="bg-white shadow-lg overflow-hidden rounded-lg">
            <div className="px-6 py-6">
                <div className="grid grid-cols-8 gap-6">
                    <div className="flex items-center justify-center col-span-2 md:col-span-1">
                        <Image className="rounded-full" src="/images/avatar_light.png" height={64} width={64} alt="Praveen's avatar"/>
                    </div>
                    <div className="flex items-center col-span-6 md:col-span-7">
                        <div>
                            <h3 className="text-2xl leading-6 font-medium text-gray-900">I'm Praveen Thirumurugan ✍🏼</h3>
                            <p className="mt-2 max-w-2xl text-md text-gray-600">I am a Software Evangelist</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}