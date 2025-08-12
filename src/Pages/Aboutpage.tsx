

export default function Aboutpage() {
  return (
    <>
      <div className="max-w-4xl mx-auto p-6  flex justify-center items-center flex-col  min-h-screen">
        <h1 className=" text-5xl  lg:text-6xl  xl:text-6xl font-bold mb-6 hover:bg-gradient-to-r from-indigo-500 via-blue-500 to-blue-500 hover:bg-clip-text hover:text-transparent text-black  dark:text-white pb-2">
          About us
        </h1>

        <p className="leading-relaxed text-gray-400 text-md xl:text-lg lg:text-lg space-y-4">
          Welcome to BookHive, your ultimate destination for discovering,
          exploring, and enjoying the world’s greatest collection of free books.
          At BookHive, we believe that knowledge should be accessible to
          everyone, <br className="hidden md:inline" /> everywhere. Our mission
          is to connect readers of all ages and interests with timeless
          classics, modern masterpieces, and hidden gems all available at your
          fingertips.
          <br className="hidden md:inline" />
          Whether you’re a casual reader, a student, or a lifelong book lover,
          BookHive offers a user friendly platform to browse, search, and
          download books in various formats. We carefully curate our collection
          to include books from public domain sources, ensuring a rich, diverse,
          and completely legal library.
          <br className="hidden md:inline" />
          Our passionate team is dedicated to creating an engaging reading
          experience enhanced by intuitive design, smart search capabilities,
          and personalized recommendations. BookHive isn’t just a library; it’s
          a community where stories come alive and knowledge thrives.
        </p>

        <section className="mt-12 text-md xl:text-lg lg:text-lg">
          <h2 className="text-4xl text-black  dark:text-white font-semibold mb-4  pb-1">
            Contact us
          </h2>

          <p className="mb-4 text-gray-400">
            We’d love to hear from you! Whether you have questions, suggestions,
            or just want to say hello, feel free to reach out:
          </p>

          <ul className="list-disc list-inside space-y-2 mb-4 text-gray-400">
            <li>Email: SheerazAli@gmail,</li>
            <li>Phone: 2309713951-2</li>
            <li>Address: SomeWhere in pakistan don't try to find me</li>
          </ul>

          <p className="text-gray-400">
            Or send us a message using the form below we’re here to help!
          </p>
        </section>
      </div>
    </>
  );
}
