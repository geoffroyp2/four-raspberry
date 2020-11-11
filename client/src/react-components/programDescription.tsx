import React from "react";

interface Props {
  description: string | undefined;
}

const ProgramDescription = ({ description }: Props) => {
  return <span>{description && description}</span>;
};

export default ProgramDescription;
