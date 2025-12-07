import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  const message = (error && (error.statusText || error.message)) || 'Une erreur est survenue.';
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-purple-50 p-8">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Erreur d'application</h1>
        <p className="text-gray-700 mb-4">{message}</p>
        <a href="/" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Retour à l'accueil</a>
      </div>
    </div>
  );
};

export default ErrorPage;
