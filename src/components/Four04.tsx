
import Link from 'next/link'
import four04 from '../assets/404.png'

const Four04 = () => {
  return (
    <div className='relative'>
      <img src={four04.src} alt="404" className="w-full h-screen object-contain" />
      <Link href="/" className='absolute bottom-16 left-[35%] transform border-blue-300 border rounded-full text-blue-400 cursor-pointer font-semibold px-4 py-2'>Back to Home</Link>
    </div>
  )
}

export default Four04