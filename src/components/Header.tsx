import { useTimer } from '../hooks/use-timer';

type HeaderProps = {
  count: number;
}

export const Header = ({count}: HeaderProps) => {
  const { time } = useTimer();
  return (
    <div className="px-4 md:px-8 lg:px-16 my-6">
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
