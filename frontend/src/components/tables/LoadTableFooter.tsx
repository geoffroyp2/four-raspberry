import { FC, ReactNode } from "react";

type Props = {
  pagination: ReactNode;
  buttons?: ReactNode;
};

const LoadTableFooter: FC<Props> = ({ pagination, buttons }) => {
  if (buttons)
    return (
      <div className="flex gap-2 justify-end">
        <div className="flex w-full justify-center">{pagination}</div>
        <div className="flex min-w-min px-5 py-3 gap-2">{buttons}</div>
      </div>
    );

  return <div className="flex gap-2 justify-center">{pagination}</div>;
};

export default LoadTableFooter;
