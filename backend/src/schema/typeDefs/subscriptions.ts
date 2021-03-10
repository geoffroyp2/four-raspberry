import { gql } from "apollo-server-express";

export default gql`
  """
  Les valeurs des différents capteurs
  """
  type SensorValues {
    oxygen: Float!
    temperature: Float!
  }

  """
  Les valeurs de la cuisson en direct
  """
  type LiveValues {
    """
    "start", "stop" ou "pause"
    """
    status: String!

    """
    Les valeurs des capteurs
    """
    sensors: SensorValues!

    """
    Le temps de cuisson en secondes par rapport au début
    """
    programTime: Int!

    """
    L'id de la courbe de référence
    """
    currentTargetId: Int!

    """
    L'id de la courbe de cuisson en direct. Null si la cuisson n'est pas en cours
    """
    currentRecordId: Int
  }

  """
  Les commandes envoyées à l'engine
  """
  type Command {
    """
    Pour changer de courbe de référence
    """
    targetId: Int!

    """
    Pour changer de status ("start", "stop" ou "pause")
    """
    status: String!
  }

  type Subscription {
    """
    Abonnement pour le frontend
    """
    live: LiveValues!

    """
    Abonnement pour l'engine
    """
    command: Command!
  }

  extend type Mutation {
    """
    Met à jour les valeurs en direct des capteurs
    """
    updateSensors(oxygen: Float!, temperature: Float!, time: Int!): Boolean!

    """
    Met à jour le statut de la cuisson
    """
    updateStatus(status: String!): Boolean!

    """
    Change la courbe de référence
    """
    updateLiveTargetId(targetId: Int!): Boolean!

    """
    Envoie une commande directe à l'engine
    """
    sendCommand(command: String!): Boolean!
  }
`;
