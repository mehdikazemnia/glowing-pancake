import Pusher from 'pusher';
import mainConfig from './main.config';

const pusher = new Pusher({
  appId: mainConfig.socket.appId,
  key: mainConfig.socket.key,
  secret: mainConfig.socket.secret,
  host: mainConfig.socket.host,
  port: mainConfig.socket.port,
  encryptionMasterKeyBase64: mainConfig.socket.masterKey,
});

export const push = async (event, message) => {
  await pusher.trigger('notify-channel', event, {
    message,
  });
  return true;
};
