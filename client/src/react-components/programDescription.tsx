import React, { useCallback, useState } from "react";
import program from "../program-logic/program";

interface Props {
  description: string | undefined;
}

const ProgramDescription = ({ description }: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [pendingMode, setPendingMode] = useState<boolean>(false);
  const [descriptionText, setDescriptionText] = useState<string>(
    description || ""
  );

  const toggleEdit = useCallback(() => {
    setEditMode(!editMode);
  }, [editMode]);

  const editText = useCallback((e) => {
    setDescriptionText(e.target.value);
  }, []);

  const validateText = useCallback(() => {
    setPendingMode(true);
    program.graphEdit.editDescription(descriptionText, (newText) => {
      setPendingMode(false);
      setEditMode(false);
      setDescriptionText(newText);
    });
  }, [descriptionText]);

  return (
    <div>
      {!editMode && (
        <div>
          {descriptionText}
          <button onClick={toggleEdit}>Editer</button>
        </div>
      )}
      {editMode && (
        <div>
          <input
            type="text"
            onChange={editText}
            maxLength={500}
            value={descriptionText}
          />
          <button onClick={validateText}>Valider</button>
          {pendingMode && <div> en attente de validation...</div>}
        </div>
      )}
    </div>
  );
};

export default ProgramDescription;
