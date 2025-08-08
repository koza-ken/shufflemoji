import * as React from 'react';
import xicon from '../images/x-icon.svg'


export const ResultPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="min-w-lg max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-16">
            結果
          </h1>
          <p className="text-2xl text-gray-600 mb-6">
            あなたの成績
          </p>
          <p className="text-4xl font-bold text-gray-800 mb-20">
            10問正解
          </p>
          <button className="bg-black hover:bg-black/70 text-white font-bold py-3 px-6 rounded flex items-center justify-center gap-2 mx-auto mb-4">
            <img src={xicon} className="w-5 h-5 bg-white rounded" alt="xアイコン" />
            <span>投稿する</span>
          </button>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded flex items-center justify-center gap-2 mx-auto">
            <span>TOPにもどる</span>
          </button>
        </div>
      </div>
    </div>
  );
};