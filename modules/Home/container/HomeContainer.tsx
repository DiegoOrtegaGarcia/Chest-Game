import Link from 'next/link'

export default function HomeContainer(){
    return (
        <main className="flex flex-col  items-center p-8  w-screen h-screen justify-around">
            <div className="p-5 shadow-2xl shadow-red-500 rounded-4xl border-red-800 border">
                <h1 className="text-red-800 text-2xl md:text-8xl text-center font-bold ">Chest Game</h1>
            </div>
            <div>
                <Link href="/ChestGame" className="bg-red-800 p-3 text-2xl rounded-3xl hover:text-red-600 hover:bg-red-950">Play a Game</Link>
            </div>
        </main>
    )
}