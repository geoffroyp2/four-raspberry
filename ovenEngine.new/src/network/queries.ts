export const liveSubscriptionQuery = `
  subscription {
    live {
      status
      currentTargetId
      sensors {
        oxygen
        temperature
      }
    }
  }
`;

export const commandSubscriptionQuery = `
  subscription {
    command
  }
`;
