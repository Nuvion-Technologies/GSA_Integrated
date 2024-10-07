import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Banner from './Banner';
import { FaRegCheckCircle, FaDownload, FaSpinner } from 'react-icons/fa';

const PreviewFormPage: React.FC = () => {
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const admission_id = localStorage.getItem('admission_id');
  const pdfUrl = `http://gsa.nuviontech.com:8000/media/AdmissionPDF/filled_form_${admission_id}.pdf`;

  useEffect(() => {
    const fetchPdf = async () => {
      setLoading(true);
      try {
        const response = await axios.get(pdfUrl, {
          responseType: 'blob',
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);
        setPdfBlobUrl(blobUrl);
        setError(false);
      } catch (error) {
        console.error('Error fetching the PDF:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (admission_id) {
      fetchPdf();
    }
  }, [admission_id, pdfUrl]);

  return (
    <>
      <Banner />
      <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-16">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-10 space-y-8 border border-gray-200">
          
          {/* Rules Section */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4 text-primary">Form Submission Guidelines</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Ensure all fields are accurately filled.</li>
              <li>Double-check your details before submitting.</li>
              <li>Carefully read the terms and conditions before proceeding.</li>
            </ul>
          </div>

          {/* PDF Rendering Section */}
          <div className="relative flex flex-col items-center bg-white">
            {loading ? (
              <div className="flex flex-col items-center justify-center min-h-[300px]">
                <FaSpinner className="text-primary animate-spin text-4xl" />
                <p className="mt-4 text-gray-600">Loading PDF...</p>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center">
                <p>Failed to load the PDF. Please try again later.</p>
              </div>
            ) : (
              <iframe
                src={pdfBlobUrl || pdfUrl}
                style={{ width: '100%', height: '500px', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                title="PDF Preview"
              />
            )}
          </div>

          {/* Terms and Conditions Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-primary mb-4">Agreement</h2>
            <div className="space-y-4">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox text-primary h-5 w-5" />
                <span className="text-gray-700 text-lg">I agree to the Terms and Conditions</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox text-primary h-5 w-5" />
                <span className="text-gray-700 text-lg">I agree to the Privacy Policy</span>
              </label>
            </div>
          </div>

          {/* Payment Box Section */}
          <div className="bg-primary bg-opacity-5 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary mb-6">Payment Summary</h2>
            <div className="flex justify-between items-center text-gray-700 text-lg mb-6">
              <span>Total Amount:</span>
              <span className="font-bold text-2xl">₹ 3000</span>
            </div>
            <div className="flex gap-4">
              <button className="w-1/2 bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-all duration-300 flex items-center justify-center space-x-2">
                <FaRegCheckCircle className="text-xl" />
                <span>Proceed to Payment</span>
              </button>
              <a
                href={pdfBlobUrl || pdfUrl}
                download={`filled_form_${admission_id}.pdf`}
                className="w-1/2 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <FaDownload className="text-xl" />
                <span>Download Form</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewFormPage;