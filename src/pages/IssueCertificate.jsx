import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserProvider, Contract } from 'ethers';
import { abi } from '../scdata/Cert.json';
import { SkillChainCertificate } from '../scdata/deployed_addresses.json';

const IssueCertificate = () => {
  const provider = new BrowserProvider(window.ethereum);

  const [recipient, setRecipient] = useState('');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('Certified Blockchain Associate');
  const [grade, setGrade] = useState('S');
  const [date, setDate] = useState('');

  const navigate = useNavigate();

  async function issuecert(e) {
    e.preventDefault();
    try {
      const signer = await provider.getSigner();
      const instance = new Contract(SkillChainCertificate, abi, signer);
      const txl = await instance.mintCertificate(recipient, name, course, grade, date);
      console.log(txl);
      navigate('/');
    } catch (error) {
      console.error('Error issuing certificate:', error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 flex flex-col items-center py-8 px-4">
      <h3 className="text-4xl font-extrabold text-indigo-900 mb-8">SkillChain</h3>

      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">Émettre un nouveau certificat (NFT)</h3>

        <form onSubmit={issuecert} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Adresse du portefeuille destinataire *</label>
            <input
              type="text"
              name="recipient"
              required
              className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sélectionner le cours *</label>
            <select
              name="course"
              className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
            >
              <option value="Certified Blockchain Associate">Certified Blockchain Associate</option>
              <option value="Developer Essential for Blockchain">Developer Essential for Blockchain</option>
              <option value="Blockchain Foundation Program">Blockchain Foundation Program</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nom du candidat *</label>
            <input
              type="text"
              name="name"
              required
              className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sélectionner la note *</label>
            <select
              name="grade"
              required
              className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            >
              <option value="S">S</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date d'émission *</label>
            <input
              type="date"
              name="issuedate"
              required
              className="w-full h-12 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="flex justify-center">
            <input
              type="submit"
              value="Émettre le certificat"
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 cursor-pointer transition duration-200 ease-in-out"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueCertificate;
