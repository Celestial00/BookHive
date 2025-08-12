

export default function Hero() {
  return (
    <div className="relative flex flex-col justify-center  items-center   h-[50rem]">
      <div className="space-y-3 z-10    rounded-lg ">
        <h1 className="xl:text-5xl sm:text-4xl text-2xl font-pop dark:text-white text-center ">
          BookHive! – Your Digital Library Companion
        </h1>

        <div className="text-center">
          <p className="text-sm md:text-lg xl:text-lg text-gray-500 text-center">
            BookHive! is a sleek web app that lets you discover, track, and
            manage your favorite reads.
            <br className="hidden md:block" />
            Browse genres, find new books, and keep your library in your pocket.
          </p>
        </div>
      </div>

      <div className=" mx-3 lg:mx-0 xl:mx-0 relative mt-6 flex flex-col xl:flex-row gap-x-3 gap-y-2 xl:gap-y-0 ">
        <div className=" rounded-2xl xl:w-90 w-full flex flex-col justify-start items-start gap-4 shadow-lg backdrop-blur-md border p-6 bg-white/20 border-white/30 dark:bg-gray-800/20 dark:border-gray-200/20">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            📚 100+ Books
          </h1>

          <p className="text-gray-700 dark:text-gray-300 text-sm ">
            Our collection covers a wide range of interests, ensuring there’s
            something for every reader:
          </p>

          <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 text-sm">
            <li>
              <span className="font-semibold">Fictional Stories:</span> Immerse
              yourself in imaginative worlds filled with unforgettable
              characters, gripping plots, and emotional journeys.
            </li>
            <li>
              <span className="font-semibold">Reality-Based Books:</span>{" "}
              Explore well-researched works on history, culture, science, and
              everyday life to expand your knowledge.
            </li>
          </ul>
        </div>
        <div className="z-10 space-y-2">
          <div className="rounded-2xl w-full xl:w-60 flex flex-col  xl:h-45  lg:h-45 md:h-45    shadow-lg backdrop-blur-md border p-5 bg-white/20 border-white/30 dark:bg-gray-800/20 dark:border-gray-200/20">
            <h1 className="text-xl font-semibold text-gray-900 mb-1 dark:text-white">
              Adventures
            </h1>
            <p className="text-gray-500 text-sm dark:text-gray-300">
              From thrilling fiction to powerful memoirs explore a world of
              stories.
            </p>
          </div>

          <div className="rounded-2xl w-full xl:w-60 flex flex-col xl:h-45  lg:h-45 md:h-45   shadow-lg backdrop-blur-md border p-5  border-white/30 dark:from-indigo-400/10 dark:to-blue-400/10">
            <h1 className="text-xl font-semibold text-gray-900 mb-1 dark:text-white">
              Discover New Reads
            </h1>
            <p className="text-gray-500 text-sm dark:text-gray-300">
              Find your next favorite book with curated lists and trending
              titles.
            </p>
          </div>
        </div>

        <div className="absolute w-30 h-30 top-10 rounded-full filter blur-2xl  bg-yellow-500/40 "></div>
        <div className="absolute w-70 h-70 top-1/2 left-1/2 transform -translate-1/2 rounded-full filter blur-2xl  bg-blue-500/40 "></div>
        <div className="absolute xl:w-30 w-20   h-30 bottom-10 -right-1  rounded-full filter blur-2xl  bg-pink-500/40 "></div>
      </div>
    </div>
  );
}
