import { FC, useState } from "react";

import { useMutation } from "@apollo/client";
import { sendCommandMutation, updateTargetIdMutation } from "./_gql/mutations";

import { useSelector } from "react-redux";
import { selectTargetLoadId } from "@editor/graphs/_state/targetDisplaySlice";

import TargetTableTitle from "@editor/graphs/elements/TargetTableTitle";
import TargetLoadTable from "@editor/graphs/targets/TargetLoadTable";
import BasicButton from "@components/buttons/BasicButton";
import LinkTableModal from "@components/modals/LinkTableModal";

const LiveButtons: FC = () => {
  const [ShowLinkModal, setShowLinkModal] = useState<boolean>(false);
  const targetId = useSelector(selectTargetLoadId);

  const [sendCommand] = useMutation<{ sendCommand: boolean }>(sendCommandMutation, {
    onCompleted: ({ sendCommand }) => {
      if (!sendCommand) console.log("Error whith sendCommand mutation");
    },
  });

  const [updateTargetId] = useMutation<{ updateLiveTargetId: boolean }>(updateTargetIdMutation, {
    onCompleted: ({ updateLiveTargetId }) => {
      if (!updateLiveTargetId) console.log("Error whith updateTargetId mutation");
    },
  });

  return (
    <>
      <div className="py-2 flex justify-between gap-2">
        <div className="flex gap-2">
          <BasicButton color="emerald" onClick={() => sendCommand({ variables: { name: "start" } })}>
            Start
          </BasicButton>
          <BasicButton color="red" onClick={() => sendCommand({ variables: { name: "stop" } })}>
            Stop
          </BasicButton>
          <BasicButton color="orange" onClick={() => sendCommand({ variables: { name: "pause" } })}>
            Pause
          </BasicButton>
        </div>
        <BasicButton color="teal" onClick={() => setShowLinkModal(true)}>
          Charger une courbe
        </BasicButton>
      </div>
      <LinkTableModal
        show={ShowLinkModal}
        title={<TargetTableTitle />}
        onHide={() => setShowLinkModal(false)}
        table={
          <TargetLoadTable
            buttons={
              <>
                <BasicButton color={"red"} onClick={() => setShowLinkModal(false)}>
                  Annuler
                </BasicButton>
                <BasicButton
                  color={"blue"}
                  onClick={() => {
                    setShowLinkModal(false);
                    updateTargetId({ variables: { targetId } });
                  }}
                >
                  Sélectionner
                </BasicButton>
              </>
            }
          />
        }
      />
    </>
  );
};

export default LiveButtons;
