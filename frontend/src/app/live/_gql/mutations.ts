import gql from "graphql-tag";

export const sendCommandMutation = gql`
  mutation sendCommand($name: String!, $option: Int) {
    sendCommand(name: $name, option: $option)
  }
`;

export const updateTargetIdMutation = gql`
  mutation updateLiveTargetId($targetId: Int!) {
    updateLiveTargetId(targetId: $targetId)
  }
`;
