import Link from "next/link";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Play() {
    return (
      <main
        className={`${inter.className}`}
      >
<div className="relative flex sm:min-h-screen min-h-full flex-col justify-center overflow-hidden bg-gray-50 sm:py-12">
  <img src="/img/beams.jpg" alt="" className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
  <div className="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
  <div className="relative bg-white px-3 pt-5 pb-4 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
    <div className="mx-auto max-w-full">
    <div className="flex flex-col items-center justify-center p-6">

      
      <div className="flex flex-col items-left mb-8 w-full mt-20">
        <h1 className="text-sm">Welcome Back, [Username]</h1>
        <h2 className="text-3xl font-bold">Let&apos;s Play!</h2>
      </div>

      <div className="rounded-lg bg-gray-200 p-4 flex items-center justify-between mb-8 w-full">
        <h3 className="text-base font-bold mr-4">3 Days strike</h3>
        <img src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/60815/golden-dollar-coin-clipart-md.png" alt="Coin" className="w-6 h-6" />
      </div>

      <div className="mb-8 w-full">
        <h2 className="text-xl pb-3">Quiz of the Week</h2>
        <div className="rounded-lg bg-gray-200 p-4">
          <p>What is Flow blockchain?</p>
          <Link href="/quiz">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
            Play Now
          </button>
          </Link>
        </div>
      </div>

      <h2 className="text-xl pb-3">Quiz Categories</h2>
      <div className="grid grid-cols-3 gap-4">
        <button className="flex flex-col items-center justify-center bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold text-xs py-3 px-4 rounded">
          <img src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/60815/golden-dollar-coin-clipart-md.png" alt="Coin" className="w-6 h-6 mb-3" />
          Category 1
        </button>
        <button className="flex flex-col items-center justify-center bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold text-xs py-3 px-4 rounded">
                 <img src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/60815/golden-dollar-coin-clipart-md.png" alt="Coin" className="w-6 h-6 mb-3" />
          Category 2
        </button>
        <button className="flex flex-col items-center justify-center bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold text-xs py-3 px-4 rounded">
                 <img src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/60815/golden-dollar-coin-clipart-md.png" alt="Coin" className="w-6 h-6 mb-3" />
          Category 3
        </button>
        <button className="flex flex-col items-center justify-center bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold text-xs py-3 px-4 rounded">
                 <img src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/60815/golden-dollar-coin-clipart-md.png" alt="Coin" className="w-6 h-6 mb-3" />
          Category 4
        </button>
        <button className="flex flex-col items-center justify-center bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold text-xs py-3 px-4 rounded">
                 <img src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/60815/golden-dollar-coin-clipart-md.png" alt="Coin" className="w-6 h-6 mb-3" />
          Category 5
        </button>
        <button className="flex flex-col items-center justify-center bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold text-xs py-3 px-4 rounded">
                 <img src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/60815/golden-dollar-coin-clipart-md.png" alt="Coin" className="w-6 h-6 mb-3" />
          Category 6
        </button>
      </div>
    </div>
    </div>
  </div>
</div>
  
      </main>
    )
  }