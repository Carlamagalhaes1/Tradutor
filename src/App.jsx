
function App() {

  const lenguages = [
    { code: "en", name: "ingles" },
    { code: "es", name: "espanhol" },
    { code: "fr", name: "francês" },
    { code: "de", name: "alemão" },
    { code: "it", name: "italiano" },
    { code: "pt", name: "português" },
  ]


  return (
    <>
      <div className="min-h-screen bg-backgroud flex flex-col ">

        <header className="bg-white shadow-sm">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center">
            <h1 className="text-headerColor text-2xl font-bold">Tradutor</h1>
          </div>
        </header>

        <main className="flex-grow flex items-start justify-center px-4 py-8">
          <div className="w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden-">
            <div
              className="flex items-center justify-between p-4 border-b border-gray-200">
              <select className=" text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer">
                {lenguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}

              </select>
              <button className="p-2 rounded-full hover:bg-gray-100 outline-none ">
                <svg

                  className="w-5 h-5 text-headerColor"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>

              </button>

              
            </div>
          </div>


        </main>



      </div>

    </>
  )
}

export default App
