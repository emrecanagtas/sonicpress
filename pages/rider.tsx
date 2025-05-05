
import { useForm } from "react-hook-form";
import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RiderPDF from "../pdf/RiderPDF";

export default function RiderForm() {
  const { register, handleSubmit } = useForm();
  const [formData, setFormData] = useState(null);

  const onSubmit = (data: any) => {
    setFormData(data);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-4">📝 Create Your Tech Rider</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("artistName")} placeholder="Artist Name" className="p-2 w-full text-black" />
        <input {...register("venue")} placeholder="Venue" className="p-2 w-full text-black" />
        <input {...register("date")} placeholder="Performance Date" type="date" className="p-2 w-full text-black" />
        <input {...register("contactEmail")} placeholder="Contact Email" type="email" className="p-2 w-full text-black" />
        <button type="submit" className="bg-white text-black px-4 py-2 font-bold">Generate PDF</button>
      </form>

      {formData && (
        <div className="mt-6">
          <PDFDownloadLink
            document={<RiderPDF data={formData} />}
            fileName="tech-rider.pdf"
            className="underline text-blue-300"
          >
            Download Your Tech Rider PDF
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
}
