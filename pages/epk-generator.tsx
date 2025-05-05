import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import EpkPDF from '../pdf/EpkPDF';

export default function EpkGenerator() {
  const [form, setForm] = useState({ genre: '', influences: '', description: '' });
  const [aiMode, setAiMode] = useState<'mock' | 'real'>('mock');
  const [loading, setLoading] = useState(false);
  const [parsed, setParsed] = useState({ bio: '', blurb: '', tags: '' });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (aiMode === 'mock') {
      const mockText = `
1. SonicMorph is a sound artist exploring the borders of ambient techno and modular synthesis...
2. “A hypnotic journey through sonic textures and club rhythms.”
3. ambient techno, experimental electronic, modular, glitch
`;
      setParsed(parseOutput(mockText));
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/generate-bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setParsed(parseOutput(data.result));
    } catch (err) {
      console.error(err);
      alert('AI generation failed. Please try again or switch to mock mode.');
    } finally {
      setLoading(false);
    }
  };

  const parseOutput = (text: string | undefined) => {
    if (!text || typeof text !== 'string') return { bio: '', blurb: '', tags: '' };

    const bioMatch = text.match(/1\.\s*(.*?)\s*2\./s);
    const blurbMatch = text.match(/2\.\s*(.*?)\s*3\./s);
    const tagsMatch = text.match(/3\.\s*(.*)/s);

    return {
      bio: bioMatch?.[1]?.trim() || '',
      blurb: blurbMatch?.[1]?.trim() || '',
      tags: tagsMatch?.[1]?.trim() || '',
    };
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">🎤 Generate Your Artist EPK</h1>

        <div className="flex justify-center space-x-6 mb-6">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="real"
              checked={aiMode === 'real'}
              onChange={() => setAiMode('real')}
              className="accent-pink-500"
            />
            <span>Real (GPT)</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="mock"
              checked={aiMode === 'mock'}
              onChange={() => setAiMode('mock')}
              className="accent-pink-500"
            />
            <span>Mock (Test Mode)</span>
          </label>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 rounded-md text-black placeholder-gray-500"
            name="genre"
            placeholder="Genre"
            onChange={handleChange}
            required
          />
          <input
            className="w-full p-3 rounded-md text-black placeholder-gray-500"
            name="influences"
            placeholder="Influences"
            onChange={handleChange}
            required
          />
          <textarea
            className="w-full p-3 rounded-md text-black placeholder-gray-500"
            name="description"
            placeholder="Describe your sound..."
            rows={4}
            onChange={handleChange}
            required
          />
          <button type="submit" className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition">
            {loading ? 'Generating...' : 'Generate EPK'}
          </button>
        </form>

        {parsed.bio && (
          <div className="mt-10 bg-white text-black rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">📄 Your EPK</h2>
            <p className="mb-3"><strong>Bio:</strong> {parsed.bio}</p>
            <p className="mb-3"><strong>Blurb:</strong> {parsed.blurb}</p>
            <p className="mb-4"><strong>Tags:</strong> {parsed.tags}</p>
            <PDFDownloadLink
              document={<EpkPDF data={parsed} />}
              fileName="EPK.pdf"
              className="text-blue-600 underline"
            >
              {({ loading }) => loading ? 'Preparing PDF...' : '📥 Download PDF'}
            </PDFDownloadLink>
          </div>
        )}
      </div>
    </div>
  );
}
