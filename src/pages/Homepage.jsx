import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import logo from '../assets/images/dapp-logo.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Homepage = () => {
  const [certificateid, setCertificateid] = useState('');
  const navigate = useNavigate();

  const searchcertificate = (e) => {
    e.preventDefault();
    const id = certificateid.trim();
    if (!id) return;
    if (!/^[0-9]+$/.test(id)) {
      toast.error('ID invalide. Veuillez entrer un nombre.');
      return;
    }
    navigate(`/viewcertificate/${id}`);
  };

  return (
    <>
      

      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-r from-indigo-100 to-purple-100">
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mt-12 mb-6 sm:text-5xl">
          SkillChain
        </h1>

        <div className="mb-12">
          <img src={logo} alt="SkillChain Logo" className="w-32 h-32 sm:w-48 sm:h-48" />
        </div>

        <form
          className="flex flex-col items-center w-full max-w-lg px-8 py-10 space-y-6 bg-white rounded-lg shadow-xl border border-gray-300"
          onSubmit={searchcertificate}
        >
          <input
            type="text"
            name="text"
            placeholder="Entrer l'ID du certificat"
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            value={certificateid}
            onChange={(e) => setCertificateid(e.target.value)}
          />

          <button
            type="submit"
            className="w-full px-4 py-3 text-lg text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Rechercher
          </button>
        </form>
      </div>
    </>
  );
};

export default Homepage;
