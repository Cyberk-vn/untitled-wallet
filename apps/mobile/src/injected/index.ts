import {RNInjectedTitan} from './injected-provider';
import {injectTitanToWindow} from '@titan-wallet/provider';

// TODO: Set the Titan version properly
const titan = new RNInjectedTitan('0.10.10', 'mobile-web');
injectTitanToWindow(titan);

window.addEventListener(
  'message',
  (e: {data: {type: string; origin: string}}) => {
    if (e.data.type !== 'allow-temp-blocklist-url') {
      return;
    }

    // @ts-ignore
    if (window.ReactNativeWebView) {
      // @ts-ignore
      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          message: e.data.type,
          origin: e.data.origin,
        }),
      );
    }
  },
);
