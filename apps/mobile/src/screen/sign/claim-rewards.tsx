import {IMessageRenderer} from './types';
import {MsgWithdrawDelegatorReward} from '@titan-wallet/proto-types/cosmos/distribution/v1beta1/tx';
import React, {FunctionComponent} from 'react';
import * as ExpoImage from 'expo-image';
import {FormattedMessage} from 'react-intl';
import {observer} from 'mobx-react-lite';
import {useStore} from '../../stores';
import {Staking} from '@titan-wallet/stores';
import {Bech32Address} from '@titan-wallet/cosmos';
import {Text} from 'react-native';
import {useStyle} from '../../styles';

export const ClaimRewardsMessage: IMessageRenderer = {
  process(chainId: string, msg) {
    const d = (() => {
      if (
        'type' in msg &&
        msg.type === 'cosmos-sdk/MsgWithdrawDelegationReward'
      ) {
        return {
          validatorAddress: msg.value.validator_address,
        };
      }

      if (
        'unpacked' in msg &&
        msg.typeUrl ===
          '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward'
      ) {
        return {
          validatorAddress: (msg.unpacked as MsgWithdrawDelegatorReward)
            .validatorAddress,
        };
      }
    })();

    if (d) {
      return {
        icon: (
          <ExpoImage.Image
            style={{width: 48, height: 48}}
            source={require('../../public/assets/img/sign/sign-claim.png')}
          />
        ),
        title: (
          <FormattedMessage id="page.sign.components.messages.claim-rewards.title" />
        ),
        content: (
          <ClaimRewardsMessagePretty
            chainId={chainId}
            validatorAddress={d.validatorAddress}
          />
        ),
      };
    }
  },
};

const ClaimRewardsMessagePretty: FunctionComponent<{
  chainId: string;
  validatorAddress: string;
}> = observer(({chainId, validatorAddress}) => {
  const {queriesStore} = useStore();
  const style = useStyle();

  const moniker = queriesStore
    .get(chainId)
    .cosmos.queryValidators.getQueryStatus(Staking.BondStatus.Bonded)
    .getValidator(validatorAddress)?.description.moniker;

  return (
    <Text style={style.flatten(['body3', 'color-text-middle'])}>
      <FormattedMessage
        id="page.sign.components.messages.claim-rewards.paragraph"
        values={{
          validator:
            moniker || Bech32Address.shortenAddress(validatorAddress, 28),
          b: (...chunks: any) => (
            <Text style={{fontWeight: 'bold'}}>{chunks}</Text>
          ),
        }}
      />
    </Text>
  );
});
