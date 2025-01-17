import {InjectedTitan} from '@titan-wallet/provider';
import {TitanMode} from '@titan-wallet/types';

export class RNInjectedTitan extends InjectedTitan {
  static parseWebviewMessage(message: any): any {
    if (message && typeof message === 'string') {
      try {
        return JSON.parse(message);
      } catch {
        // noop
      }
    }

    return message;
  }

  constructor(version: string, mode: TitanMode) {
    super(
      version,
      mode,
      {
        addMessageListener: (fn: (e: any) => void) =>
          window.addEventListener('message', fn),
        removeMessageListener: (fn: (e: any) => void) =>
          window.removeEventListener('message', fn),
        postMessage: message => {
          // @ts-ignore
          window.ReactNativeWebView.postMessage(JSON.stringify(message));
        },
      },
      RNInjectedTitan.parseWebviewMessage,
    );
  }
}
