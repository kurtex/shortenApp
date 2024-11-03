import Link from 'next/link'

export default function NotFound () {
    return (
        <div className='flex flex-col gap-y-10'>
            <h1 className='flex flex-row h1-title opacity-90'><span className='gradient-underline'>Not</span>&nbsp;Found</h1>
            <p className='font-semibold opacity-85'>Could not find requested resource</p>
            <Link className='flex justify-center gradient-button'
                href="/">Return Home</Link>
        </div>
    )
}