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

    """
    Flag qui marque si l'engine est en mode live-monitoring
    """
    monitoring: Boolean!

    """
    Flag qui demande au frontend de rafraichir le graph de la cuisson en cours
    """
    refresh: Boolean!
  }

  """
  Les commandes envoyées à l'engine
  """
  type Command {
    """
    Le nom de la commande
    """
    name: String!

    """
    Argument optionnel pour certaines commandes, booleans représentés par 0 / 1
    """
    option: Int
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
    updateStatus(status: String, targetId: Int, recordId: Int, monitoring: Boolean, refresh: Boolean): Boolean!

    """
    Change la courbe de référence
    """
    updateLiveTargetId(targetId: Int!): Boolean!

    """
    Envoie une commande directe à l'engine
    """
    sendCommand(name: String!, option: Int): Boolean!
  }
`;
