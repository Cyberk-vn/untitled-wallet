import {MsgSend} from '@titan-wallet/proto-types/cosmos/bank/v1beta1/tx';
import React, {FunctionComponent} from 'react';
import {Coin} from '@titan-wallet/types';
import {observer} from 'mobx-react-lite';
import {CoinPretty} from '@titan-wallet/unit';
import {Bech32Address} from '@titan-wallet/cosmos';
import {IMessageRenderer} from './types';
import * as ExpoImage from 'expo-image';
import {FormattedMessage} from 'react-intl';
import {useStore} from '../../stores';
import {Text} from 'react-native';
import {useStyle} from '../../styles';

export const SendMessage: IMessageRenderer = {
  process(chainId: string, msg) {
    const d = (() => {
      if ('type' in msg && msg.type === 'cosmos-sdk/MsgSend') {
        return {
          amount: msg.value.amount,
          fromAddress: msg.value.from_address,
          toAddress: msg.value.to_address,
        };
      }

      if ('unpacked' in msg && msg.typeUrl === '/cosmos.bank.v1beta1.MsgSend') {
        return {
          amount: (msg.unpacked as MsgSend).amount,
          fromAddress: (msg.unpacked as MsgSend).fromAddress,
          toAddress: (msg.unpacked as MsgSend).toAddress,
        };
      }
    })();

    if (d) {
      return {
        icon: (
          <ExpoImage.Image
            style={{width: 48, height: 48}}
            source={require('../../public/assets/img/sign/sign-send.png')}
          />
        ),
        title: (
          <FormattedMessage id="page.sign.components.messages.send.title" />
        ),
        content: (
          <SendMessagePretty
            chainId={chainId}
            amount={d.amount}
            toAddress={d.toAddress}
          />
        ),
      };
    }
  },
};

const SendMessagePretty: FunctionComponent<{
  chainId: string;
  amount: Coin[];
  toAddress: string;
}> = observer(({chainId, amount, toAddress}) => {
  const {chainStore} = useStore();
  const style = useStyle();
  const coins = amount.map(coin => {
    const currency = chainStore.getChain(chainId).forceFindCurrency(coin.denom);

    return new CoinPretty(currency, coin.amount);
  });

  return (
    <Text style={style.flatten(['body3', 'color-text-middle'])}>
      <FormattedMessage
        id="page.sign.components.messages.send.paragraph"
        values={{
          address: Bech32Address.shortenAddress(toAddress, 20),
          amount: coins
            .map(coinPretty => {
              return coinPretty.trim(true).toString();
            })
            .join(', '),
          b: (...chunks: any) => (
            <Text style={{fontWeight: 'bold'}}>{chunks}</Text>
          ),
          br: '\n',
        }}
      />
    </Text>
  );
});
