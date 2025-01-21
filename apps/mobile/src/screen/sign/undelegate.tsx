import React, {FunctionComponent} from 'react';
import {observer} from 'mobx-react-lite';
import {Staking} from '@titan-wallet/stores';
import {Bech32Address} from '@titan-wallet/cosmos';
import {MsgUndelegate} from '@titan-wallet/proto-types/cosmos/staking/v1beta1/tx';
import {Coin} from '@titan-wallet/types';
import {CoinPretty} from '@titan-wallet/unit';
import {FormattedMessage} from 'react-intl';
import {IMessageRenderer} from './types';
import * as ExpoImage from 'expo-image';
import {useStore} from '../../stores';
import {Text} from 'react-native';
import {useStyle} from '../../styles';

export const UndelegateMessage: IMessageRenderer = {
  process(chainId: string, msg) {
    const d = (() => {
      if ('type' in msg && msg.type === 'cosmos-sdk/MsgUndelegate') {
        return {
          validatorAddress: msg.value.validator_address,
          amount: msg.value.amount,
        };
      }

      if (
        'unpacked' in msg &&
        msg.typeUrl === '/cosmos.staking.v1beta1.MsgUndelegate'
      ) {
        return {
          validatorAddress: (msg.unpacked as MsgUndelegate).validatorAddress,
          amount: (msg.unpacked as MsgUndelegate).amount,
        };
      }
    })();

    if (d) {
      return {
        icon: (
          <ExpoImage.Image
            style={{width: 48, height: 48}}
            source={require('../../public/assets/img/sign/sign-delegate.png')}
          />
        ),
        title: (
          <FormattedMessage id="page.sign.components.messages.undelegate.title" />
        ),
        content: (
          <UndelegateMessagePretty
            chainId={chainId}
            validatorAddress={d.validatorAddress}
            amount={d.amount}
          />
        ),
      };
    }
  },
};

const UndelegateMessagePretty: FunctionComponent<{
  chainId: string;
  validatorAddress: string;
  amount: Coin;
}> = observer(({chainId, validatorAddress, amount}) => {
  const {chainStore, queriesStore} = useStore();
  const style = useStyle();

  const currency = chainStore.getChain(chainId).forceFindCurrency(amount.denom);
  const coinPretty = new CoinPretty(currency, amount.amount);

  const moniker = queriesStore
    .get(chainId)
    .cosmos.queryValidators.getQueryStatus(Staking.BondStatus.Bonded)
    .getValidator(validatorAddress)?.description.moniker;

  return (
    <Text style={style.flatten(['body3', 'color-text-middle'])}>
      <FormattedMessage
        id="page.sign.components.messages.undelegate.paragraph"
        values={{
          coin: coinPretty.trim(true).toString(),
          from: moniker || Bech32Address.shortenAddress(validatorAddress, 28),
          b: (...chunks: any) => (
            <Text style={{fontWeight: 'bold'}}>{chunks}</Text>
          ),
          br: '\n',
        }}
      />
    </Text>
  );
});
