export function Movie() {
  return (
    <div className="movie">
      <div className="rounded-md bg-white shadow-lg dark:bg-gray-800">
        <div className="max-w-4xl px-4 leading-none md:flex">
          <div className="flex-none">
            <img
              src="https://creativereview.imgix.net/content/uploads/2019/12/joker_full.jpg?auto=compress,format&q=60&w=1012&h=1500"
              alt="pic"
              className="h-72 w-56 -translate-y-2 transform rounded-md border-2 border-gray-700 shadow-lg dark:border-gray-200"
            />
          </div>

          <div className="flex-col text-gray-900 dark:text-gray-300">
            <p className="pt-4 text-2xl font-bold">Joker (2020)</p>
            <hr className="hr-text mt-2" data-content="" />
            <div className="text-md my-2 flex justify-between px-4">
              <span className="pt-2 text-sm font-bold">
                2h 2min | Crime, Drama, Thriller
              </span>
              <span className="font-bold"></span>
            </div>
            <p className="my-4 hidden px-4 text-left text-sm md:block">
              In Gotham City, mentally troubled comedian Arthur Fleck is
              disregarded and mistreated by society. He then embarks on a
              downward spiral of revolution and bloody crime. This path brings
              him face-to-face with his alter-ego: the Joker.
            </p>

            <p className="text-md my-2 flex px-4">
              Rating: 9.0/10
              <span className="px-2 font-bold">|</span>
              Mood: Dark
            </p>

            <div className="text-xs">
              <button
                type="button"
                className="ease focus:shadow-outline m-2 select-none rounded-md border border-gray-400 px-4 py-2 text-gray-400 transition duration-500 hover:bg-gray-900 focus:outline-none"
              >
                TRAILER
              </button>
              <button
                type="button"
                className="ease focus:shadow-outline m-2 select-none rounded-md border border-gray-400 px-4 py-2 text-gray-400 transition duration-500 hover:bg-gray-900 focus:outline-none"
              >
                IMDB
              </button>
              <button
                type="button"
                className="ease focus:shadow-outline m-2 select-none rounded-md border border-gray-400 px-4 py-2 text-gray-400 transition duration-500 hover:bg-gray-900 focus:outline-none"
              >
                AMAZON
              </button>
            </div>
          </div>
        </div>
        {/* <div className="mb-4 flex w-full items-center justify-between px-4">
          <div className="flex">
            <i className="material-icons mr-2 text-red-600">favorite_border</i>
            <i className="material-icons text-blue-600">remove_red_eye</i>
          </div>
          <div className="flex">
            <i className="material-icons ml-2 text-yellow-600">
              sentiment_very_satisfied
            </i>
            <i className="material-icons ml-2 text-yellow-600">
              sentiment_neutral
            </i>
            <i className="material-icons ml-2 text-yellow-600">
              sentiment_very_dissatisfied
            </i>
            <i className="material-icons ml-2 text-yellow-600">star_outline</i>
            <i className="material-icons ml-2 text-yellow-600">star_half</i>
            <i className="material-icons ml-2 text-yellow-600">star</i>
          </div>
        </div> */}
      </div>
    </div>
  );
}
