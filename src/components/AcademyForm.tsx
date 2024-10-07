import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import Banner from "./Banner";
import { FaCheckCircle } from "react-icons/fa";
import moment from 'moment'; // Add this line to import moment


interface Sport {
  id: number;
  name: string;
}

interface Branch {
  id: number;
  name: string;
}

interface Plan {
  id: number;
  name: string;
  price: string;
}

interface AdmissionData {
  schoolName: string;
  standard: string;
  photo: File | null;
}

const AcademyForm: React.FC = () => {
  const navigate = useNavigate();
  const admission_id = localStorage.getItem('admission_id');
  const currentDate = format(new Date(), "dd MMMM yyyy");
  const [isTraineeForm, setIsTraineeForm] = useState(true);
  const [sports, setSports] = useState<Sport[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [admissionData, setAdmissionData] = useState<AdmissionData>({
    schoolName: '',
    standard: '',
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      setLoading(true);
      axios.get('http://gsa.nuviontech.com:8000/api/sports/', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => setSports(response.data.sports))
        .catch(error => {
          console.error("Error fetching sports:", error);
          setErrorMessage("Failed to load sports. Please try again.");
        })
        .finally(() => setLoading(false));
    } else {
      setErrorMessage("No token found, please log in.");
    }
  }, [token]);

  useEffect(() => {
    if (selectedSport && token) {
      setLoading(true);
      axios.get(`http://gsa.nuviontech.com:8000/api/batches/${selectedSport}/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => setBranches(response.data.batches))
        .catch(error => {
          console.error("Error fetching branches:", error);
          setErrorMessage("Failed to load branches.");
        })
        .finally(() => setLoading(false));
    }
  }, [selectedSport, token]);

  useEffect(() => {
    if (selectedSport && selectedBranch && token) {
      setLoading(true);
      axios.get(`http://gsa.nuviontech.com:8000/api/plans/${selectedSport}/${selectedBranch}/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => setPlans(response.data.plans))
        .catch(error => {
          console.error("Error fetching plans:", error);
          setErrorMessage("Failed to load plans.");
        })
        .finally(() => setLoading(false));
    }
  }, [selectedSport, selectedBranch, token]);

  const handleAdmissionSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedSport || !selectedBranch || !selectedPlan) {
      setErrorMessage("Please select sport, branch, and plan.");
      return;
    }

    const formData = new FormData();
    formData.append('sport', selectedSport);
    formData.append('branch', selectedBranch);
    formData.append('plan', selectedPlan);
    formData.append('school_name', admissionData.schoolName);
    formData.append('standard', admissionData.standard);
    if (admissionData.photo) {
      formData.append('photo', admissionData.photo);
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'http://gsa.nuviontech.com:8000/api/webadmission/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        }
      );
 
      if (response.status === 201) {
 
        setIsTraineeForm(false);
        localStorage.setItem('admission_id', response.data.id);

        // Handle success (e.g., show a success message)
      }
    } catch (error) {
      console.error("Error submitting admission:", error);
      setErrorMessage("Failed to submit admission.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAdmissionData({
        ...admissionData,
        photo: e.target.files[0],
      });
    }
  };
  const handleFileChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
  
    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/heic"];
    if (file && !allowedTypes.includes(file.type)) {
      alert("Please upload an image file (JPEG, PNG, or HEIC).");
      e.target.value = ""; // Reset the input
      return; // Exit if the file is not valid
    }
  
    // If valid, update the admission data
    if (file) {
      setAdmissionData({
        ...admissionData,
        photo: file,
      });
    }
  };

  const validateFileType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/heic"];
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload an image file (JPEG, PNG, or HEIC).");
        e.target.value = "";
      }
    }
  };

  const PersonalInfoForm = () => {
    const [formData, setFormData] = useState({
      nameOfTrainee: '',
      mobileNo: '',
      dob: '',
      fatherName: '',
      fatherOccupation: '',
      address: '',
      city: '',
      pincode: '',
      traineeSignature: null, // for file uploads
      parentSignature: null,  // for file uploads
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, files } = e.target;
      setFormData({
        ...formData,
        [name]: files?.[0], // Single file
      });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      // setError(null);
      const apiUrl = 'http://gsa.nuviontech.com:8000/api/personal-info/';
      const data = new FormData();
      const formattedDOB = moment(formData.dob).format('DD/MM/YYYY');

      data.append('admission_id', admission_id || ''); 
      data.append('name', formData.nameOfTrainee);
      data.append('mobile', formData.mobileNo);
      data.append('dob', formattedDOB);
      data.append('father_name', formData.fatherName);
      data.append('father_occupation', formData.fatherOccupation);
      data.append('address', formData.address);
      data.append('city', formData.city);
      data.append('pincode', formData.pincode);
 
      if (formData.traineeSignature) {
        data.append('trainee_signature', formData.traineeSignature);
      }
      if (formData.parentSignature) {
        data.append('parent_signature', formData.parentSignature);
      }

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          body: data,
        });
 

        if (!response.ok) {
          const errorResponse = await response.json();
 
          // setError("Failed to submit the form");
          setIsSubmitting(false);
          return;
        }
        navigate('/preview');

        const result = await response.json();
 
        alert('Form submitted successfully!');
      } catch (err) {
        console.error('Error submitting the form:', err);
        // setError('Failed to submit the form');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <>
      <Banner />
      <div className="bg-white bg-opacity-90 rounded-lg p-6 md:p-10">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {/* Name Of Trainee */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">Name Of Trainee</label>
            <input
              type="text"
              name="nameOfTrainee"
              value={formData.nameOfTrainee}
              onChange={handleInputChange}
              placeholder="Enter Name Of Trainee"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Mobile No. */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">Mobile No.</label>
            <input
              type="text"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleInputChange}
              placeholder="Enter Your Mobile Number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Father's Name */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">Father's Name</label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleInputChange}
              placeholder="Enter Father's Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Father's Occupation */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">Father's Occupation</label>
            <input
              type="text"
              name="fatherOccupation"
              value={formData.fatherOccupation}
              onChange={handleInputChange}
              placeholder="Enter Father's Occupation"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter Address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Enter City"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              placeholder="Enter Pincode"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Trainee Signature */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">Trainee Signature</label>
            <input
              type="file"
              name="traineeSignature"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Parent Signature */}
          <div>
            <label className="block text-gray-800 font-semibold mb-2">Parent Signature</label>
            <input
              type="file"
              name="parentSignature"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-full">
            <button type="submit"  className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200" disabled={isSubmitting} >
              {isSubmitting ? 'Submitting...' : 'Submit Personal Info'}
            </button>
          </div>

          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
      </>
    );
  };

  return (
    <>
    <Banner />
    <section className="py-8 bg-gray-100 flex flex-col items-center">
    <div className="container w-full flex flex-col items-center">
          <p className="text-lg text-gray-800 mb-6 text-center md:w-3/5 w-4/5">
            Welcome to Gandhinagar Sports Academy, where we cultivate talent and inspire excellence in every athlete. 
            Our programs are designed to help you achieve your best in both cricket and football.
          </p>

          <div className="flex flex-col md:flex-row gap-8 mb-8 justify-center items-stretch">
            {/* Cricket Academy Card */}
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="flex flex-col justify-between h-full bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <img
                  src="/cricketcard.png"
                  alt="Cricket Academy"
                  className="w-full h-56 object-cover"
                />
                <div className="p-6 bg-white flex-grow">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Cricket Coaching</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    U14, U16, U19, and Senior Group wise coaching Experience<br />
                    Highly Professional Coaches who played IPL & Ranji Trophy Matches
                  </p>
                  <div className="flex items-center text-gray-800 mb-4">
                    <FaCheckCircle className="text-blue-500 mr-2" />
                    <p className="font-semibold">Batch: Morning & Evening</p>
                  </div>
                  <div className="flex items-center text-gray-800 mb-4">
                    <FaCheckCircle className="text-blue-500 mr-2" />
                    <p className="font-semibold">Pricing: ₹3000/- Monthly*</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Football Academy Card */}
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="flex flex-col justify-between h-full bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <img
                  src="/footballcard.png"
                  alt="Football Academy"
                  className="w-full h-56 object-cover"
                />
                <div className="p-6 bg-white flex-grow">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">Football Coaching</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    U14, U16, U19, and Senior Group wise coaching Experience<br />
                    Highly Professional Coaches with International Experience
                  </p>
                  <div className="flex items-center text-gray-800 mb-4">
                    <FaCheckCircle className="text-blue-500 mr-2" />
                    <p className="font-semibold">Batch: Morning & Evening</p>
                  </div>
                  <div className="flex items-center text-gray-800 mb-4">
                    <FaCheckCircle className="text-blue-500 mr-2" />
                    <p className="font-semibold">Pricing: ₹3000/- Monthly*</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="md:text-6xl text-center text-3xl font-bold text-gray-900 mb-4 mt-8">Let's Join Our Team</h1>
          <p className="text-gray-600 mb-6">{currentDate}</p>
</div>

    <div className="max-w-4xl mx-auto p-4">
      {loading && <p className="text-center">Loading...</p>}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
      <h1 className="text-2xl font-bold text-center mb-4">{isTraineeForm ? "Admission Form" : "Personal Information Form"}</h1>
      {isTraineeForm ? (
        <div className="bg-white bg-opacity-90 rounded-lg p-6 md:p-10">
          <form onSubmit={handleAdmissionSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {/* Sport Selection */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">Select Sport</label>
              <select
                value={selectedSport}
                onChange={e => setSelectedSport(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Sport</option>
                {sports.map(sport => (
                  <option key={sport.id} value={sport.id}>{sport.name}</option>
                ))}
              </select>
            </div>

            {/* Branch Selection */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">Select Branch</label>
              <select
                value={selectedBranch}
                onChange={e => setSelectedBranch(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Branch</option>
                {branches.map(branch => (
                  <option key={branch.id} value={branch.id}>{branch.name}</option>
                ))}
              </select>
            </div>

            {/* Plan Selection */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">Select Plan</label>
              <select
                value={selectedPlan}
                onChange={e => setSelectedPlan(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required
              >
                <option value="">Select Plan</option>
                {plans.map(plan => (
                  <option key={plan.id} value={plan.id}>{plan.name} - ₹{plan.price}</option>
                ))}
              </select>
            </div>

            {/* School Name */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">School Name</label>
              <input
                type="text"
                value={admissionData.schoolName}
                onChange={e => setAdmissionData({ ...admissionData, schoolName: e.target.value })}
                placeholder="Enter School Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Standard */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">Standard</label>
              <input
                type="text"
                value={admissionData.standard}
                onChange={e => setAdmissionData({ ...admissionData, standard: e.target.value })}
                placeholder="Enter Standard"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-gray-800 font-semibold mb-2">Upload Photo</label>
              <input
                type="file"
                onChange={handleFileChange1}
                accept="image/*"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                required

              />
            </div>

            {/* Submit Button */}
            <div className="col-span-full">
              <button type="submit" className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
                Submit Admission
              </button>
            </div>
          </form>
        </div>
      ) : (
        <PersonalInfoForm />
      )}
      <p className="text-center text-gray-600 mt-4">Date: {currentDate}</p>
    </div>
    </section>
    </>
  );
};

export default AcademyForm;

// import axios from "axios";
// import Banner from "./Banner";
// import { FaCheckCircle } from "react-icons/fa";
// import { format } from "date-fns";
// import React, { useState, useEffect } from "react";

// interface Sport {
//   id: number;
//   name: string;
// }

// interface Branch {
//   id: number;
//   name: string;
// }

// interface Plan {
//   id: number;
//   name: string;
//   price: string;
// }

// interface AdmissionData {
//   schoolName: string;
//   standard: string;
//   photo: File | null;
// }

// const AcademyForm: React.FC = () => {
//   const currentDate = format(new Date(), "dd MMMM yyyy");
//   const [isTraineeForm, setIsTraineeForm] = useState(true);
//   const [sports, setSports] = useState<Sport[]>([]);
//   const [branches, setBranches] = useState<Branch[]>([]);
//   const [plans, setPlans] = useState<Plan[]>([]);
//   const [selectedSport, setSelectedSport] = useState<string>('');
//   const [selectedBranch, setSelectedBranch] = useState<string>('');
//   const [selectedPlan, setSelectedPlan] = useState<string>('');
//   const [admissionData, setAdmissionData] = useState<AdmissionData>({
//     schoolName: '',
//     standard: '',
//     photo: null,
//   });
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (token) {
//       setLoading(true);
//       axios.get('http://gsa.nuviontech.com:8000/api/sports/', {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//         .then(response => setSports(response.data.sports))
//         .catch(error => {
//           console.error("Error fetching sports:", error);
//           setErrorMessage("Failed to load sports. Please try again.");
//         })
//         .finally(() => setLoading(false));
//     } else {
//       setErrorMessage("No token found, please log in.");
//     }
//   }, [token]);

//   useEffect(() => {
//     if (selectedSport && token) {
//       setLoading(true);
//       axios.get(`http://gsa.nuviontech.com:8000/api/batches/${selectedSport}/`, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//         .then(response => setBranches(response.data.batches))
//         .catch(error => {
//           console.error("Error fetching branches:", error);
//           setErrorMessage("Failed to load branches.");
//         })
//         .finally(() => setLoading(false));
//     }
//   }, [selectedSport, token]);

//   useEffect(() => {
//     if (selectedSport && selectedBranch && token) {
//       setLoading(true);
//       axios.get(`http://gsa.nuviontech.com:8000/api/plans/${selectedSport}/${selectedBranch}/`, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//         .then(response => setPlans(response.data.plans))
//         .catch(error => {
//           console.error("Error fetching plans:", error);
//           setErrorMessage("Failed to load plans.");
//         })
//         .finally(() => setLoading(false));
//     }
//   }, [selectedSport, selectedBranch, token]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!selectedSport || !selectedBranch || !selectedPlan) {
//       setErrorMessage("Please select sport, branch, and plan.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('sport', selectedSport);
//     formData.append('branch', selectedBranch);
//     formData.append('plan', selectedPlan);
//     formData.append('school_name', admissionData.schoolName);
//     formData.append('standard', admissionData.standard);
//     if (admissionData.photo) {
//       formData.append('photo', admissionData.photo);
//     }

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         'http://gsa.nuviontech.com:8000/api/webadmission/',
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data',
//           }
//         }
//       );
 
//       setIsTraineeForm(false);  // Move to the next form section
//     } catch (error) {
//       console.error("Error submitting admission:", error);
//       setErrorMessage("Failed to submit admission.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setAdmissionData({
//         ...admissionData,
//         photo: e.target.files[0],
//       });
//     }
//   };

//   const validateFileType = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/heic"];
//       if (!allowedTypes.includes(file.type)) {
//         alert("Please upload an image file (JPEG, PNG, or HEIC).");
//         e.target.value = "";
//       }
//     }
//   };

//   const PersonalInfoForm = () => {
//     const [formData, setFormData] = useState({
//       nameOfTrainee: '',
//       mobileNo: '',
//       dob: '',
//       fatherName: '',
//       fatherOccupation: '',
//       address: '',
//       city: '',
//       pincode: '',
//       traineeSignature: null, // for file uploads
//       parentSignature: null,  // for file uploads
//     });
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [error, setError] = useState(null);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const { name, value } = e.target;
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     };

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const { name, files } = e.target;
//       setFormData({
//         ...formData,
//         [name]: files?.[0], // Single file
//       });
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       setIsSubmitting(true);
//       setError(null);

//       const apiUrl = 'http://gsa.nuviontech.com:8000/api/personal-info/';
//       const data = new FormData();
//       data.append('nameOfTrainee', formData.nameOfTrainee);
//       data.append('mobileNo', formData.mobileNo);
//       data.append('dob', formData.dob);
//       data.append('fatherName', formData.fatherName);
//       data.append('fatherOccupation', formData.fatherOccupation);
//       data.append('address', formData.address);
//       data.append('city', formData.city);
//       data.append('pincode', formData.pincode);
//       if (formData.traineeSignature) {
//         data.append('trainee_signature', formData.traineeSignature);
//       }
//       if (formData.parentSignature) {
//         data.append('parent_signature', formData.parentSignature);
//       }

//       try {
//         const response = await fetch(apiUrl, {
//           method: 'POST',
//           body: data,
//         });

//         if (!response.ok) {
//           const errorResponse = await response.json();
 
//           setIsSubmitting(false);
//           return;
//         }

//         const result = await response.json();
 
//         alert('Form submitted successfully!');
//       } catch (err) {
//         console.error('Error submitting the form:', err);

//         // setError('Failed to submit the form');
//       } finally {
//         setIsSubmitting(false);
//       }
//     };

//   return (
//     <>
//       <Banner />
//       <section className="py-8 bg-gray-100 flex flex-col items-center">
//         <div className="container w-full flex flex-col items-center">
//           <p className="text-lg text-gray-800 mb-6 text-center md:w-3/5 w-4/5">
//             Welcome to Gandhinagar Sports Academy...
//           </p>

//           {/* Cards for Cricket & Football */}
//           <div className="flex flex-col md:flex-row gap-8 mb-8 justify-center items-stretch">
//             {/* Cricket Academy Card */}
//             <div className="w-full md:w-1/2 lg:w-1/3 p-4">
//               <div className="flex flex-col justify-between h-full bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
//                 <img
//                   src="/cricketcard.png"
//                   alt="Cricket Academy"
//                   className="w-full h-56 object-cover"
//                 />
//                 <div className="p-6 bg-white flex-grow">
//                   <h3 className="text-2xl font-bold mb-2 text-gray-900">Cricket Coaching</h3>
//                   <p className="text-sm text-gray-700 mb-4">
//                     U14, U16, U19, and Senior Group wise coaching Experience<br />
//                     Highly Professional Coaches who played IPL & Ranji Trophy Matches
//                   </p>
//                   <div className="flex items-center text-gray-800 mb-4">
//                     <FaCheckCircle className="text-blue-500 mr-2" />
//                     <p className="font-semibold">Batch: Morning & Evening</p>
//                   </div>
//                   <div className="flex items-center text-gray-800 mb-4">
//                     <FaCheckCircle className="text-blue-500 mr-2" />
//                     <p className="font-semibold">Pricing: ₹3000/- Monthly*</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* Football Academy Card */}
//             <div className="w-full md:w-1/2 lg:w-1/3 p-4">
//               <div className="flex flex-col justify-between h-full bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
//                 <img
//                   src="/footballcard.png"
//                   alt="Football Academy"
//                   className="w-full h-56 object-cover"
//                 />
//                 <div className="p-6 bg-white flex-grow">
//                   <h3 className="text-2xl font-bold mb-2 text-gray-900">Football Coaching</h3>
//                   <p className="text-sm text-gray-700 mb-4">
//                     U14, U16, U19, and Senior Group wise coaching Experience<br />
//                     Highly Professional Coaches with International Experience
//                   </p>
//                   <div className="flex items-center text-gray-800 mb-4">
//                     <FaCheckCircle className="text-blue-500 mr-2" />
//                     <p className="font-semibold">Batch: Morning & Evening</p>
//                   </div>
//                   <div className="flex items-center text-gray-800 mb-4">
//                     <FaCheckCircle className="text-blue-500 mr-2" />
//                     <p className="font-semibold">Pricing: ₹3000/- Monthly*</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <h1 className="md:text-6xl text-center text-3xl font-bold text-gray-900 mb-4 mt-8">
//           Let's Join Our Team
//         </h1>
//         <p className="text-gray-600 mb-6">{currentDate}</p>

//         {/* Trainee Form */}
//         <section
//           className={`${isTraineeForm ? "block" : "hidden"} relative max-w-5xl mx-auto p-6 md:p-12 shadow-lg`}
//         >
//           <h2 className="text-center font-bold text-black mb-10 text-3xl">Admission Info</h2>
//           <div className="bg-white bg-opacity-90 rounded-lg p-6 md:p-10">
//             <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
//               <div>
//                 <label className="block text-gray-800 font-semibold mb-2">Select Your Sport</label>
//                 <select
//                   value={selectedSport}
//                   onChange={(e) => setSelectedSport(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//                 >
//                   <option value="">Select Sport</option>
//                   {sports.map((sport) => (
//                     <option key={sport.id} value={sport.id}>
//                       {sport.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Select Batch */}
//               <div>
//                 <label className="block text-gray-800 font-semibold mb-2">Select Batch</label>
//                 <select
//                   value={selectedBranch}
//                   onChange={(e) => setSelectedBranch(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//                 >
//                   <option value="">Select Batch</option>
//                   {branches.map((branch) => (
//                     <option key={branch.id} value={branch.id}>
//                       {branch.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Select Plan */}
//               <div>
//                 <label className="block text-gray-800 font-semibold mb-2">Select Plan</label>
//                 <select
//                   value={selectedPlan}
//                   onChange={(e) => setSelectedPlan(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//                 >
//                   <option value="">Select Plan</option>
//                   {plans.map((plan) => (
//                     <option key={plan.id} value={plan.id}>
//                       {plan.name} - {plan.price}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* School Name */}
//               <div>
//                 <label className="block text-gray-800 font-semibold mb-2">Name Of School</label>
//                 <input
//                   type="text"
//                   value={admissionData.schoolName}
//                   onChange={(e) =>
//                     setAdmissionData({ ...admissionData, schoolName: e.target.value })
//                   }
//                   placeholder="Enter Name Of School"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//                 />
//               </div>

//               {/* Standard */}
//               <div>
//                 <label className="block text-gray-800 font-semibold mb-2">Standard</label>
//                 <input
//                   type="text"
//                   value={admissionData.standard}
//                   onChange={(e) =>
//                     setAdmissionData({ ...admissionData, standard: e.target.value })
//                   }
//                   placeholder="Enter Standard"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//                 />
//               </div>

//               {/* File Upload */}
//               <div>
//                 <label className="block text-gray-800 font-semibold mb-2">Upload a Passport Size Photo</label>
//                 <input
//                   type="file"
//                   onChange={handleFileChange}
//                   accept=".jpg,.jpeg,.png"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//                 />
//               </div>

//               {/* Submit Button */}
//               <div className="col-span-2">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit Admission Info"}
//                 </button>
//                 {error && <p className="text-red-600 mt-2">{error}</p>}
//               </div>
//             </form>
//           </div>
//         </section>

//         {/* Personal Info Form */}
//         <section
//           className={`${!isTraineeForm ? "block" : "hidden"} relative max-w-5xl mx-auto p-6 md:p-12 shadow-lg`}
//         >
//           <h2 className="text-center font-bold text-black mb-10 text-3xl">Personal Info</h2>
//           <div className="bg-white bg-opacity-90 rounded-lg p-6 md:p-10">
//             <form className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
//               <div>
//                 <label className="block text-gray-800 font-semibold mb-2">Name of Trainee</label>
//                 <input
//                   type="text"
//                   value={formData.nameOfTrainee}
//                   onChange={(e) => setFormData({ ...formData, nameOfTrainee: e.target.value })}
//                   placeholder="Enter Name"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-800 font-semibold mb-2">Mobile Number</label>
//                 <input
//                   type="text"
//                   value={formData.mobileNo}
//                   onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
//                   placeholder="Enter Mobile Number"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-800 font-semibold mb-2">Date of Birth</label>
//                 <input
//                   type="date"
//                   value={formData.dob}
//                   onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
//                   placeholder="Enter DOB"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-800 font-semibold mb-2">Father's Name</label>
//                 <input
//                   type="text"
//                   value={formData.fatherName}
//                   onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
//                   placeholder="Enter Father's Name"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-800 font-semibold mb-2">Father's Occupation</label>
//                 <input
//                   type="text"
//                   value={formData.fatherOccupation}
//                   onChange={(e) => setFormData({ ...formData, fatherOccupation: e.target.value })}
//                   placeholder="Enter Father's Occupation"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-800 font-semibold mb-2">Address</label>
//                 <input
//                   type="text"
//                   value={formData.address}
//                   onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                   placeholder="Enter Address"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-800 font-semibold mb-2">City</label>
//                 <input
//                   type="text"
//                   value={formData.city}
//                   onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//                   placeholder="Enter City"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-800 font-semibold mb-2">Pincode</label>
//                 <input
//                   type="text"
//                   value={formData.pincode}
//                   onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
//                   placeholder="Enter Pincode"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-800 font-semibold mb-2">Trainee Signature</label>
//                 <input
//                   type="file"
//                   name="traineeSignature"
//                   onChange={handleFileChange}
//                   accept=".jpg,.jpeg,.png"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-800 font-semibold mb-2">Parent Signature</label>
//                 <input
//                   type="file"
//                   name="parentSignature"
//                   onChange={handleFileChange}
//                   accept=".jpg,.jpeg,.png"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//                 />
//               </div>

//               {/* Other form fields continue */}
//               {/* Submit Button */}
//               <div className="col-span-2">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-300"
//                 >
//                   {isSubmitting ? "Submitting..." : "Submit Personal Info"}
//                 </button>
//                 {error && <p className="text-red-600 mt-2">{error}</p>}
//               </div>
//             </form>
//           </div>
//         </section>
//       </section>
//     </>
//   );
// }
// return (
//   <div className="text-center text-red-600 mt-8">{errorMessage}</div>
// );

// };

// export default AcademyForm;

