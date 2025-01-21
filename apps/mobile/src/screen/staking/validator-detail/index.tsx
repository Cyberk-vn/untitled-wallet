import React, {FunctionComponent} from 'react';

import {observer} from 'mobx-react-lite';

import {useStyle} from '../../../styles';

import {PageWithScrollView} from '../../../components/page';
import {Stack} from '../../../components/stack';
import {GuideBox} from '../../../components/guide-box';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavProp, StakeNavigation} from '../../../navigation';
import {UnbondingCard} from './unbonding-card';
import {DelegatedCard} from './delegated-card';
import {useStore} from '../../../stores';
import {Staking} from '@titan-wallet/stores';
import {Box} from '../../../components/box';
import {Column, Columns} from '../../../components/column';
import {ValidatorImage} from '../components/validator-image';
import {StyleSheet, Text} from 'react-native';
import {CoinPretty, Dec, RatePretty} from '@titan-wallet/unit';
import {Button} from '../../../components/button';
import {FormattedMessage, useIntl} from 'react-intl';

export const ValidatorDetailScreen: FunctionComponent = observer(() => {
  const {queriesStore, chainStore, accountStore} = useStore();
  const route = useRoute<RouteProp<StakeNavigation, 'Stake.ValidateDetail'>>();

  const {validatorAddress, chainId, validatorSelector, fromDeepLink} =
    route.params;

  const navigation = useNavigation<StackNavProp>();
  const style = useStyle();
  const intl = useIntl();
  const account = accountStore.getAccount(chainId);

  const queries = queriesStore.get(chainId);
  const bondedValidators = queries.cosmos.queryValidators.getQueryStatus(
    Staking.BondStatus.Bonded,
  );
  const unbondedValidators = queries.cosmos.queryValidators.getQueryStatus(
    Staking.BondStatus.Unbonded,
  );
  const unbondingValidators = queries.cosmos.queryValidators.getQueryStatus(
    Staking.BondStatus.Unbonding,
  );

  const [validatorInfo, isJailed] = (() => {
    const bondedValidator = bondedValidators.validators
      .sort((a, b) => Number(b.tokens) - Number(a.tokens))
      .map((validator, i) => ({...validator, rank: i + 1}))
      .find(val => val.operator_address === validatorAddress);
    if (bondedValidator) {
      return [bondedValidator, false];
    }

    const validator = unbondingValidators.validators
      .concat(unbondedValidators.validators)
      .sort((a, b) => Number(b.tokens) - Number(a.tokens))
      .map((validator, i) => ({...validator, rank: i + 1}))
      .find(val => val.operator_address === validatorAddress);
    return [validator, validator?.jailed === true];
  })();

  const thumbnail =
    bondedValidators.getValidatorThumbnail(validatorAddress) ||
    unbondingValidators.getValidatorThumbnail(validatorAddress) ||
    unbondedValidators.getValidatorThumbnail(validatorAddress);

  const chainInfo = chainStore.getChain(chainId);
  const token = new CoinPretty(
    chainInfo.stakeCurrency || chainInfo.feeCurrencies[0],
    new Dec(validatorInfo?.delegator_shares || 0),
  );

  const isCommissionHigh =
    Number(validatorInfo?.commission.commission_rates.rate) >= 0.2;
  const isTop10Validator = validatorInfo?.rank
    ? validatorInfo.rank <= 10
    : false;

  const staked = queries.cosmos.queryDelegations
    .getQueryBech32Address(account.bech32Address)
    .getDelegationTo(validatorAddress);

  return (
    <PageWithScrollView
      backgroundMode="default"
      contentContainerStyle={style.flatten(['padding-top-12', 'padding-x-12'])}>
      <Stack gutter={12}>
        {isJailed ? (
          <GuideBox
            title={intl.formatMessage({
              id: 'page.stake.validator-detail.jailed-guide-box.title',
            })}
            paragraph={intl.formatMessage({
              id: 'page.stake.validator-detail.jailed-guide-box.paragraph',
            })}
            color="danger"
          />
        ) : (
          <React.Fragment>
            {isCommissionHigh ? (
              <GuideBox
                title={intl.formatMessage(
                  {
                    id: 'page.stake.validator-detail.commission-guide-box.title',
                  },
                  {
                    rate: new RatePretty(
                      validatorInfo?.commission.commission_rates.rate || 0,
                    )
                      .maxDecimals(2)
                      .toString(),
                  },
                )}
                paragraph={
                  <Text style={style.flatten(['body2', 'color-yellow-500'])}>
                    <FormattedMessage id="page.stake.validator-detail.commission-guide-box.paragraph-1" />
                    <Text style={style.flatten(['font-bold'])}>
                      <FormattedMessage id="page.stake.validator-detail.commission-guide-box.paragraph-2" />
                    </Text>
                    <FormattedMessage id="page.stake.validator-detail.commission-guide-box.paragraph-3" />
                  </Text>
                }
                color="warning"
              />
            ) : null}
            {isTop10Validator ? (
              <GuideBox
                title={intl.formatMessage({
                  id: 'page.stake.validator-detail.top-10-guide-box.title',
                })}
                paragraph={intl.formatMessage({
                  id: 'page.stake.validator-detail.top-10-guide-box.paragraph',
                })}
                color="default"
              />
            ) : null}
          </React.Fragment>
        )}

        {validatorInfo ? (
          <Box
            paddingX={16}
            paddingY={20}
            backgroundColor={style.get('color-card-default').color}
            borderRadius={6}>
            <Stack gutter={20}>
              <Columns sum={1} alignY="center" gutter={12}>
                <ValidatorImage
                  size={40}
                  imageUrl={thumbnail}
                  name={validatorInfo?.description.moniker}
                  isDelegation={staked && !staked.toDec().isZero()}
                />
                <Text
                  numberOfLines={1}
                  style={StyleSheet.flatten([
                    style.flatten(['subtitle2', 'color-text-high']),
                    {width: '80%'},
                  ])}>
                  {validatorInfo.description.moniker}
                </Text>
              </Columns>
              <Columns sum={1}>
                <Column weight={1}>
                  <Stack gutter={8}>
                    <Text
                      style={style.flatten([
                        'subtitle3',
                        'color-label-default',
                      ])}>
                      <FormattedMessage id="page.stake.validator-detail.validator-card.commission" />
                    </Text>
                    <Text style={style.flatten(['body3', 'color-text-middle'])}>
                      {new RatePretty(
                        validatorInfo.commission.commission_rates.rate,
                      )
                        .maxDecimals(2)
                        .toString()}
                    </Text>
                  </Stack>
                </Column>

                <Column weight={1}>
                  <Stack gutter={8}>
                    <Text
                      style={style.flatten([
                        'subtitle3',
                        'color-label-default',
                      ])}>
                      <FormattedMessage id="page.stake.validator-detail.validator-card.voting-power" />
                    </Text>
                    <Text style={style.flatten(['body3', 'color-text-middle'])}>
                      {token.maxDecimals(10).trim(true).shrink(true).toString()}
                    </Text>
                  </Stack>
                </Column>
              </Columns>
              <Stack gutter={8}>
                <Text
                  style={style.flatten(['subtitle3', 'color-label-default'])}>
                  <FormattedMessage id="page.stake.validator-detail.validator-card.description" />
                </Text>
                <Text style={style.flatten(['body3', 'color-text-middle'])}>
                  {validatorInfo.description.details}
                </Text>
              </Stack>
              {validatorSelector ? (
                <Button
                  size="large"
                  text={intl.formatMessage({
                    id: 'page.stake.validator-detail.switch-validator-button',
                  })}
                  onPress={() => {
                    validatorSelector(
                      validatorInfo.operator_address,
                      validatorInfo.description?.moniker ||
                        validatorInfo.operator_address,
                    );
                    navigation.pop(2);
                  }}
                />
              ) : (
                <Button
                  size="large"
                  text={
                    isJailed
                      ? intl.formatMessage({
                          id: 'page.stake.validator-detail.jailed-button',
                        })
                      : intl.formatMessage({
                          id: 'page.stake.validator-detail.stake-button',
                        })
                  }
                  disabled={isJailed}
                  onPress={() => {
                    navigation.navigate('Stake', {
                      screen: 'Stake.Delegate',
                      params: {
                        chainId,
                        validatorAddress: validatorInfo.operator_address,
                        fromDeepLink,
                      },
                    });
                  }}
                />
              )}
            </Stack>
          </Box>
        ) : null}

        <DelegatedCard
          chainId={chainId}
          validatorAddress={validatorAddress}
          isFromRedelegate={!!validatorSelector}
        />
        <UnbondingCard chainId={chainId} validatorAddress={validatorAddress} />
      </Stack>
    </PageWithScrollView>
  );
});
