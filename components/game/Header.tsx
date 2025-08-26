// import { useTimer } from '../../hooks/use-timer';

type HeaderProps = {
  count: number;
  time: number;
  progress?: string;
  round?: number;
};

export const Header = ({ count, time, progress, round }: HeaderProps) => {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="bg-gray-50 flex items-center justify-between">
        <div className="flex flex-col items-start">
          <p className="text-xl sm:text-2xl">{count}問目</p>
          {progress && (
            <p className="text-sm text-gray-600">進捗: {progress}</p>
          )}
        </div>
        <div className="flex flex-col items-end">
          <p className="text-2xl">残り{time}秒</p>
          {round && round > 1 && (
            <p className="text-sm text-gray-600 font-bold">{round}回目</p>
          )}
        </div>
      </div>
    </div>
  );
};
