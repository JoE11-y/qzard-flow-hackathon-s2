import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`${inter.className}`}
    >
<div className="relative flex sm:min-h-screen min-h-full flex-col justify-center overflow-hidden bg-gray-50 sm:py-12">
  <img src="https://play.tailwindcss.com/img/beams.jpg" alt="bg app" className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width={1308} />
  <div className="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
  <div className="relative bg-white px-6 pt-5 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
    <div className="mx-auto max-w-full max-h-screen">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 mt-20">Qzard v0.1.0</h1>
        <h2 className="text-xl text-center text-gray-600 mb-8">1001+ quizzes to challenge you and your friends knowledge on all topics!</h2>
        <img src="https://pngimg.com/uploads/treasure_chest/treasure_chest_PNG21.png" alt="Quiz Image" className="max-w-xs w-md mb-4 sm:mb-8" />
        <Link href="/play" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded mt-4">
          Start Playing
        </Link>
      </div>
    </div>
  </div>
</div>

    </main>
  )
}
