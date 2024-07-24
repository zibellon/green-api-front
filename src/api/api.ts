import { API } from '.';
import {
  FileParams,
  getSettingsResponse,
  getStateInstanceResponse,
  MessageParams,
  postMessageFormResponse,
} from './classes';

const PATHS = {
  SETTINGS: '/green-api/settings',
  STATINSTANCE: '/green-api/instance-state',
  SENDMESSAGE: '/green-api/message-send',
  SENDFILE: '/green-api/file-send',
};

export const GreenAPI = {
  getSettings: async (instId: string, instToken: string) => {
    return await API.get<getSettingsResponse>({
      url: PATHS.SETTINGS,
      headers: {
        'x-instance-id': instId,
        'x-instance-api-token': instToken,
      },
    });
  },
  getStateInstance: async (instId: string, instToken: string) => {
    return await API.get<getStateInstanceResponse>({
      url: PATHS.STATINSTANCE,
      headers: {
        'x-instance-id': instId,
        'x-instance-api-token': instToken,
      },
    });
  },
  postMessageForm: async (instId: string, instToken: string, params: MessageParams) => {
    return await API.post<postMessageFormResponse>({
      url: PATHS.SENDMESSAGE,
      headers: {
        'x-instance-id': instId,
        'x-instance-api-token': instToken,
      },
      data: {
        ...params,
      },
    });
  },
  postFileForm: async (instId: string, instToken: string, params: FileParams) => {    
    return await API.post<postMessageFormResponse>({
      url: PATHS.SENDFILE,
      headers: {
        'x-instance-id': instId,
        'x-instance-api-token': instToken,
      },
      data: {
        ...params,
      },
    });
  },
};
