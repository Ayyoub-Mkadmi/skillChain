import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../assets/images/dapp-logo.png';
import { BrowserProvider, Contract } from 'ethers';
import { abi } from '../scdata/Cert.json';
import { SkillChainCertificate } from '../scdata/deployed_addresses.json';
import { generateSelectiveDisclosureProof } from '../zk/proof';

const ViewCertificate = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [proof, setProof] = useState(null);
  const [error, setError] = useState('');
  const hasEthereum = typeof window !== 'undefined' && window.ethereum;

  useEffect(() => {
    async function getcert(searchId) {
      try {
        if (!/^[0-9]+$/.test(String(searchId))) {
          setError('ID du certificat invalide. Utilisez un nombre.');
          return;
        }

        if (!hasEthereum) {
          setError('Portefeuille Ethereum non détecté (MetaMask).');
          return;
        }

        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const instance = new Contract(SkillChainCertificate, abi, signer);
        const result = await instance.getCertificate(searchId);
        console.log(result);

        setCertificate({
          name: result[0],
          course: result[1],
          grade: result[2],
          date: result[3],
        });
      } catch (error) {
        console.error('Error fetching certificate:', error);
        const msg = (error && error.message) || 'Erreur inconnue';
        if (msg.toLowerCase().includes('does not exist') || msg.toLowerCase().includes('revert')) {
          setError('Certificat introuvable pour cet ID.');
        } else {
          setError('Une erreur est survenue lors du chargement du certificat.');
        }
      }
    }

    if (id) {
      getcert(id);
    }
  }, [id, hasEthereum]);

  const handleGenerateProof = async () => {
    if (!id || !certificate) return;
    const p = await generateSelectiveDisclosureProof({
      tokenId: id,
      fields: { hasCertificate: true, course: certificate.course },
    });
    setProof(p);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 p-8">
      <div className="relative w-full max-w-[297mm] h-[210mm] bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col justify-center items-center p-8">
        {/* Certificate Header */}
        <div className="text-center mb-8">
          <img src={logo} className="w-40 mx-auto mb-4" alt="KBA Logo" />
          <h3 className="text-6xl font-serif font-bold text-gray-800 mb-3">
            Kerala Blockchain Academy
          </h3>
          <p className="text-2xl text-gray-700 italic">
            Certificat de Réussite
          </p>
        </div>

        {/* Certificate Content */}
        {error ? (
          <p className="text-xl text-center text-red-600">{error}</p>
        ) : certificate ? (
          <div className="text-center text-xl text-gray-800 leading-relaxed mx-auto max-w-[80%]">
            <p className="mb-8">
              Ceci certifie que
              <span className="font-bold text-gray-900"> {certificate.name} </span>
              a réussi le
              <span className="font-bold text-gray-900"> {certificate.course} </span>
              avec la note
              <span className="font-bold text-gray-900"> {certificate.grade} </span>
              le
              <span className="font-bold text-gray-900"> {certificate.date} </span>.
            </p>
            <button
              onClick={handleGenerateProof}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Générer une preuve ZK
            </button>
            {proof && (
              <div className="mt-4 text-sm text-gray-600 break-words">
                <p className="font-semibold">Preuve (démo) :</p>
                <pre className="bg-gray-100 p-3 rounded-md overflow-auto max-h-40">{JSON.stringify(proof, null, 2)}</pre>
              </div>
            )}
          </div>
        ) : (
          <p className="text-xl text-center text-gray-500">Chargement des détails du certificat...</p>
        )}

        {/* Certificate ID */}
        <div className="absolute bottom-6 right-10 text-lg text-gray-800">
          <p>ID du certificat : <span className="font-bold text-gray-900">{id}</span></p>
        </div>

        {/* Decorative Borders */}
        <div className="absolute inset-0 border-[12px] border-double border-gray-400 rounded-[16px] pointer-events-none"></div>
        <div className="absolute inset-4 border-[6px] border-double border-gray-200 rounded-[12px] pointer-events-none"></div>
      </div>
    </div>
  );
};

export default ViewCertificate;
