
function App() {

  const lenguages = [
    { code : "en", name: "ingles"},
    { code : "es", name: "espanhol"},
    { code : "fr", name: "francês"},
    { code : "de", name: "alemão"},
    { code : "it", name: "italiano"},
    { code : "pt", name: "português"},
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
              <select  className=" text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer">
               {lenguages.map((lang) =>  (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
               ))}
             
              </select>
            </div>
          </div>
         

        </main>

        
        
      </div>
       
    </>
  )
}

export default App
