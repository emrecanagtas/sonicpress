export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center text-center p-8">
      <h1 className="text-5xl font-bold mb-4">🎧 SonicPress</h1>
      <p className="text-xl max-w-2xl mb-8 text-gray-400">
        Your smart stage partner — AI-powered EPK, rider, and submission tool for musicians.
      </p>
      <a
        href="/epk-generator"
        className="bg-white text-black font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition"
      >
        Generate Your EPK
      </a>
    </div>
  );
}
