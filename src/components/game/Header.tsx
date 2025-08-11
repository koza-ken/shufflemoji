// import { useTimer } from '../../hooks/use-timer';

type HeaderProps = {
  count: number;
  time: number;
};

export const Header = ({ count, time }: HeaderProps) => {
  return (
    <div className="max-w-2xl mx-auto px-4 my-6">
      <div className="bg-gray-50 flex items-center justify-between">
        <div>
          <p className="text-2xl">{count}問目</p>
        </div>
        <div>
          <p className="text-2xl">残り{time}秒</p>
        </div>
      </div>
    </div>
  );
};
