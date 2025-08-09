import * as React from 'react';
import xicon from '../images/x-icon.svg'


export const ResultPage = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Resultページ
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            クイズアプリ
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            ゲームを開始
          </button>
        </div>
      </div>
    </div>
  );
};