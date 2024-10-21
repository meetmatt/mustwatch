interface MovieProps {
  title: string;
  description: string;
}

export function Movie({ title, description }: MovieProps) {
  return (
    <div className="movie">
      <div
        className="rounded-lg bg-white shadow-lg dark:bg-gray-800"
        style={{
          boxShadow:
            "0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)",
        }}
      >
        <div className="max-w-4xl px-4 leading-none md:flex">
          <div className="flex-none">
            <img
              src="https://creativereview.imgix.net/content/uploads/2019/12/joker_full.jpg?auto=compress,format&q=60&w=1012&h=1500"
              alt="pic"
              className="h-72 w-56 -translate-y-2 transform rounded-md border-2 border-gray-700 shadow-lg dark:border-gray-200"
            />
          </div>

          <div className="flex-col text-gray-900 dark:text-gray-300">
            <h2 className="pt-4 text-center text-2xl font-bold">{title}</h2>
            <hr className="hr-text mt-2" data-content="" />
            <div className="text-md my-2 flex justify-center px-4">
              <span className="pt-2 text-sm font-bold">
                2020 | 122 min | Crime • Drama • Thriller
              </span>
            </div>
            <p className="my-4 px-4 text-justify text-sm md:block">
              {description}
            </p>

            <p className="my-2 flex justify-end px-4 text-sm">
              Rating: 9.0/10
              <span className="px-2 font-bold">|</span>
              Mood: Dark
            </p>

            <div className="flex justify-end text-xs">
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
