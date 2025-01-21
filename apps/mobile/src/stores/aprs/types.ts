import {IntPretty} from '@titan-wallet/unit';

export interface AprItem {
  chainId: string;
  apr?: IntPretty;
}

export interface AprItemInner {
  apr?: number;
}
