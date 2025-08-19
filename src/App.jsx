import { useEffect, useState, useRef } from "react";

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
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const handleTranslate = async () => {
        if (sourceText.trim() === "") {
          setTranslatedText("");
          return;
        }

        setIsLoading(true);
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_MYMEMORY}?q=${encodeURIComponent(sourceText)}&langpair=${sourceLang}|${targetLang}`
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

      handleTranslate();
    }, 500);

    return () => clearTimeout(timeoutRef.current);
  }, [sourceText, sourceLang, targetLang]);

  const swapTranslate = () => {
    
    const oldSourceLang = sourceLang;
    const oldTargetLang = targetLang;
    const oldSourceText = sourceText;
    const oldTranslatedText = translatedText;

    setSourceLang(oldTargetLang);
    setTargetLang(oldSourceLang);
    setSourceText(oldTranslatedText);
    setTranslatedText(oldSourceText);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="text-center text-3xl font-extrabold text-indigo-600 py-8">
        Tradutor de Idiomas 🌐
      </header>

      <main className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
        <div className="flex items-center justify-center md:flex-col gap-4 md:gap-6 md:w-32">
          <select
            aria-label="Idioma de origem"
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer transition"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>

          <button
            aria-label="Trocar idiomas"
            onClick={swapTranslate}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full transition shadow-md"
          >
            <svg
              className="w-6 h-6"
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
            aria-label="Idioma de destino"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer transition"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        
        <textarea
          aria-label="Texto de origem"
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          placeholder="Digite pelo menos duas ou mais palavras..."
          className="flex-1 border border-gray-300 rounded-md p-3 resize-none shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-400 h-40"
        />

        <div className="flex-1 bg-gray-50 p-4 rounded-md min-h-[160px] text-lg text-gray-800 relative">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-indigo-600"></div>
            </div>
          ) : (
            <p>
              {translatedText || (
                <span className="text-gray-400">A tradução aparecerá aqui:</span>
              )}
            </p>
          )}
        </div>
      </main>

      <footer className="text-center text-gray-500 py-6 mt-auto select-none">
        &copy; {new Date().getFullYear()} Tradutor
      </footer>
    </div>
  );
}

export default App;
