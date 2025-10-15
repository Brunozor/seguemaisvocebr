
import React from 'react';
import FrontManager from '../components/FrontManager';

const FrontManagerPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Gerenciamento de Fronts
        </h1>
        <FrontManager />
      </div>
    </div>
  );
};

export default FrontManagerPage;
