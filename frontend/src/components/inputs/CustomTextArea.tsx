import { FC, useRef, useState } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const CustomTextArea: FC<Props> = ({ value, onChange }) => {
  const textRef = useRef<(Element & HTMLTextAreaElement) | null>(null);
  const [Height, setHeight] = useState<string>("auto");

  return (
    <textarea
      ref={textRef}
      autoFocus
      onFocus={({ currentTarget }) => currentTarget.select()}
      className="text-gray-900 w-full px-3 py-1 rounded-md focus:shadow-outline leading-tight"
      value={value}
      onInput={() => setHeight((textRef.current?.scrollHeight ?? 20) + "px")}
      onChange={({ target }) => onChange(target.value)}
      style={{
        height: Height,
        maxHeight: "148px",
      }}
    />
  );
};

export default CustomTextArea;
