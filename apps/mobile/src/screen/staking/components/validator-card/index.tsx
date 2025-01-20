import React, {FunctionComponent} from 'react';
import {observer} from 'mobx-react-lite';
import {StyleSheet, Text} from 'react-native';
import {useStyle} from '../../../../styles';
import {useStore} from '../../../../stores';
import {Box} from '../../../../components/box';
import {Gutter} from '../../../../components/gutter';
import {Column, Columns} from '../../../../components/column';
import {ValidatorImage} from '../validator-image';
import {Staking} from '@titan-wallet/stores';
import {FormattedMessage} from 'react-intl';
import {ChainIdHelper} from '@titan-wallet/cosmos';
import {CoinPretty} from '@titan-wallet/unit';

export const ValidatorCard: FunctionComponent<{
  chainId: string;
  validatorAddress: string;
}> = observer(({validatorAddress, chainId}) => {
  const {queriesStore, accountStore} = useStore();

  const account = accountStore.getAccount(chainId);
  const queries = queriesStore.get(chainId);
  const bondedValidators = queries.cosmos.queryValidators.getQueryStatus(
    Staking.BondStatus.Bonded,
  );
  const unbondingValidators = queries.cosmos.queryValidators.getQueryStatus(
    Staking.BondStatus.Unbonding,
  );
  const unbondedValidators = queries.cosmos.queryValidators.getQueryStatus(
    Staking.BondStatus.Unbonded,
  );

  const validatorInfo = bondedValidators.validators
    .concat(unbondingValidators.validators)
    .concat(unbondedValidators.validators)
    .find(val => val.operator_address === validatorAddress);

  const thumbnail =
    bondedValidators.getValidatorThumbnail(validatorAddress) ||
    unbondingValidators.getValidatorThumbnail(validatorAddress) ||
    unbondedValidators.getValidatorThumbnail(validatorAddress);

  const style = useStyle();

  const staked = queries.cosmos.queryDelegations
    .getQueryBech32Address(account.bech32Address)
    .getDelegationTo(validatorAddress);

  const queryRewards = queries.cosmos.queryRewards.getQueryBech32Address(
    account.bech32Address,
  );

  const rewards = (() => {
    let reward: CoinPretty | undefined;
    const isDydx = ChainIdHelper.parse(chainId).identifier === 'dydx-mainnet';
    if (isDydx) {
      const denom =
        'ibc/8E27BA2D5493AF5636760E354E46004562C46AB7EC0CC4C1CA14E9E20E2545B5';
      reward = queryRewards
        .getRewardsOf(validatorAddress)
        .find(r => r.currency.coinMinimalDenom === denom);
    } else {
      reward = queryRewards.getStakableRewardOf(validatorAddress);
    }
    //NOTE reward가 stake currency가 아닐경우 reward가 없을때 undefined로 반환될 떄가 있음
    //현재 usdc가 유일한 경우라서 하드코딩된 문자열로 처리함
    return !reward && isDydx
      ? '0 USDC'
      : reward
          ?.trim(true)
          .shrink(true)
          .maxDecimals(6)
          .inequalitySymbol(true)
          .hideIBCMetadata(true)
          .toString();
  })();
  return staked && !staked.toDec().isZero() ? (
    <Box
      padding={20}
      borderRadius={6}
      backgroundColor={style.get('color-gray-600').color}>
      <Box
        style={style.flatten([
          'border-width-bottom-1',
          'border-color-gray-500',
        ])}>
        <Columns sum={1} gutter={16} alignY="center">
          <ValidatorImage
            size={40}
            imageUrl={thumbnail}
            name={validatorInfo?.description.moniker}
          />
          <Text
            numberOfLines={1}
            style={StyleSheet.flatten([
              style.flatten(['subtitle2', 'color-platinum-100']),
              {width: '80%'},
            ])}>
            {validatorInfo?.description.moniker}
          </Text>
        </Columns>
        <Gutter size={16} />
      </Box>
      <Gutter size={16} />

      <Columns sum={1} alignY="center">
        <Text style={style.flatten(['subtitle2', 'color-gray-100'])}>
          <FormattedMessage id="page.stake.redelegate.validator-card.staked" />
        </Text>
        <Column weight={1} />
        <Text style={style.flatten(['body1', 'color-text-middle'])}>
          {staked
            ?.trim(true)
            .shrink(true)
            .maxDecimals(6)
            .inequalitySymbol(true)
            .toString()}
        </Text>
      </Columns>

      <Gutter size={4} />

      <Columns sum={1} alignY="center">
        <Text style={style.flatten(['subtitle2', 'color-gray-100'])}>
          <FormattedMessage id="page.stake.redelegate.validator-card.rewards" />
        </Text>
        <Column weight={1} />
        <Text style={style.flatten(['body1', 'color-text-middle'])}>
          {rewards}
        </Text>
      </Columns>
    </Box>
  ) : null;
});
