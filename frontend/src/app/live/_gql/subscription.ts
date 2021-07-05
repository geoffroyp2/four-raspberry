import { gql } from "@apollo/client";
import { liveFieldsString } from "./fields";

export const liveSubscription = gql`
  subscription {
    live {
      ${liveFieldsString}
    }
  }
`;
