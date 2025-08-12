// import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import xicon from '../images/x-icon.svg'
import { QuestionList } from '../components/game/QuestionList';


export const ResultPage = () => {
  const location = useLocation();
  const q_count = location.state?.questionCount || 0;
  const q_list = location.state?.questionList;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-10">
            ゲーム結果
          </h1>
          <p className="text-2xl text-gray-600 mb-4">
            あなたの成績
          </p>
          <p className="text-3xl font-bold text-gray-800 mb-8">
            {q_count}問正解
          </p>
          <button className="w-40 bg-black hover:bg-black/70 text-white font-bold py-3 px-6 rounded flex items-center justify-center gap-2 mx-auto mb-16">
            <img src={xicon} className="w-5 h-5 bg-white rounded" alt="xアイコン" />
            <span>投稿する</span>
          </button>
          <div className="flex justify-center gap-4">
            <Link
              to='/game'
              className="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded flex items-center justify-center gap-2"
            >
              <span>リトライ</span>
            </Link>
            <Link
              to='/'
              className="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded flex items-center justify-center gap-2"
            >
              <span>TOPにもどる</span>
            </Link>
          </div>
        </div>
      </div>
      <QuestionList questions={q_list} />
    </div>
  );
};
