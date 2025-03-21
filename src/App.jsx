import { useEffect, useState } from "react";

const languages = [
  { code: "en", name: "Inglês" },
  { code: "es", name: "Espanhol" },
  { code: "fr", name: "Francês" },
  { code: "de", name: "Alemão" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
];

function App() {
  const [sourceLang, setSourceLang] = useState("pt");
  const [targetLang, setTargetLang] = useState("en");
  const [sourceText, setSourceText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [timeoutId, setTimeoutId] = useState(null); 
  useEffect(() => {

    if (timeoutId) {
      clearTimeout(timeoutId); 
    }

    const newTimeoutId = setTimeout(() => {
      handleTranslate();
    }, 500); 

    setTimeoutId(newTimeoutId); 

    return () => clearTimeout(newTimeoutId);

  }, [sourceText, sourceLang, targetLang]);

  const handleTranslate = async () => {
    if (sourceText.trim() === "") {
      setTranslatedText("");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${sourceText}&langpair=${sourceLang}|${targetLang}`
      );

      if (!response.ok) {
        throw new Error(`HTTP ERROR: ${response.status}`);
      }

      const data = await response.json();
      setTranslatedText(data.responseData.translatedText);
    } catch {
     
      setTranslatedText("Erro ao traduzir, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const swapTranslate = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setSourceText(translatedText)
    setTranslatedText(sourceText)
  }

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
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <select
                value={sourceLang}
                onChange={(event) => setSourceLang(event.target.value)}
                className="text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
              <button className="p-2 rounded-full hover:bg-gray-100 outline-none " onClick={(swapTranslate)}>
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

              <select
                value={targetLang}
                onChange={(event) => setTargetLang(event.target.value)}
                className="text-sm text-textColor bg-transparent border-none focus:outline-none cursor-pointer"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-4">
                <textarea
                  value={sourceText}
                  onChange={(event) => setSourceText(event.target.value)}
                  className="w-full h-40 text-textColor bg-transparent resize-none border-none outline-none"
                  placeholder="Digite seu texto..."
                ></textarea>
              </div>
              <div className="p-4 relative bg-secondaryBackgroud border-l-gray-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 to-blue-500"></div>
                  ) : (
                    <p className="text-lg text-textColor">{translatedText}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-white border-t border-gray-200 mt-auto ">
          <div className="max-w-5xl mx-auto px-4 py-3 text-sm text-headerColor">
            &copy; {new Date().getFullYear()} Tradutorrttt
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
