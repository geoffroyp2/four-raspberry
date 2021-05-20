import { FC } from "react";

type Props = {};

const PreviewCard: FC<Props> = () => {
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden bg-gray-700 border-gray-900">
        <div className="p-6">Preview</div>
      </div>
    </div>
  );
};

export default PreviewCard;
