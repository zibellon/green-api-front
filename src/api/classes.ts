export type getSettingsResponse = {
  wid: string;
  countryInstance: string;
  typeAccount: string;
  webhookUrl: string;
  webhookUrlToken: string;
  delaySendMessagesMilliseconds: number;
  markIncomingMessagesReaded: string;
  markIncomingMessagesReadedOnReply: string;
  sharedSession: string;
  proxyInstance: string;
  outgoingWebhook: string;
  outgoingMessageWebhook: string;
  outgoingAPIMessageWebhook: string;
  incomingWebhook: string;
  deviceWebhook: string;
  statusInstanceWebhook: string;
  stateWebhook: string;
  enableMessagesHistory: string;
  keepOnlineStatus: string;
  pollMessageWebhook: string;
  incomingBlockWebhook: string;
  incomingCallWebhook: string;
};

export type getStateInstanceResponse = {
  stateInstance: string;
};

export type postMessageFormResponse = {
  idMessage: string;
};

export type MessageParams = {
    phone: string;
    message: string;
};

export type FileParams = {
  phone: string;
  fileUrl: string;
};
