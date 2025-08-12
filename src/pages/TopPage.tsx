import { Link } from 'react-router-dom';
import { GuideModal } from '../components/game/GuideModal';
import { useModal } from '../hooks/useModal';

export const TopPage = () => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            シャッフルもじ
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            単語の並び替えをするゲームです
          </p>
          
          <div className="space-y-4">
            <button
              onClick={openModal}
              className="w-40 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded block mx-auto"
            >
              遊び方
            </button>
            
            <Link
              to="/game"
              className="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mx-auto"
            >
              ゲームを開始
            </Link>
          </div>
        </div>
      </div>
      <GuideModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};