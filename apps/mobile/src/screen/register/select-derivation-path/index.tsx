import React, {FunctionComponent, useLayoutEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {FormattedMessage, useIntl} from 'react-intl';
import {Box} from '../../../components/box';
import {StyleSheet, Text} from 'react-native';
import {useStyle} from '../../../styles';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList, StackNavProp} from '../../../navigation';
import {useStore} from '../../../stores';
import {Gutter} from '../../../components/gutter';
import {XAxis, YAxis} from '../../../components/axis';
import * as ExpoImage from 'expo-image';
import {AppCurrency} from '@titan-wallet/types';
import {WalletIcon} from '../../../components/icon';
import {Bech32Address} from '@titan-wallet/cosmos';
import {CoinPretty} from '@titan-wallet/unit';
import {ScrollViewRegisterContainer} from '../components/scroll-view-register-container';
import {useEffectOnce} from '../../../hooks';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export const SelectDerivationPathScreen: FunctionComponent = observer(() => {
  const intl = useIntl();
  const style = useStyle();
  const navigation = useNavigation<StackNavProp>();
  const route =
    useRoute<RouteProp<RootStackParamList, 'Register.SelectDerivationPath'>>();
  const {vaultId, chainIds, totalCount, skipWelcome, password} = route.params;

  const {chainStore, keyRingStore} = useStore();

  const [index, setIndex] = useState(0);
  const chainId = chainIds[index];
  const chainInfo = chainStore.getChain(chainId);
  const [selectedCoinType, setSelectedCoinType] = useState(-1);
  const [candidates, setCandidates] = useState<
    {
      coinType: number;
      bech32Address: string;
    }[]
  >([]);
  const [buttonIsLoading, setButtonIsLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setParams({
      hideBackButton: true,
    });
  }, [navigation]);

  useEffectOnce(() => {
    keyRingStore.computeNotFinalizedKeyAddresses(vaultId, chainId).then(res => {
      setCandidates(res);

      if (res.length > 0) {
        setSelectedCoinType(res[0].coinType);
      }
    });
  });

  const currency = chainInfo.stakeCurrency || chainInfo.currencies[0];

  return (
    <ScrollViewRegisterContainer
      padding={20}
      bottomButton={{
        text: intl.formatMessage({
          id: 'pages.register.select-derivation-path.import-button',
        }),
        size: 'large',
        disabled:
          !keyRingStore.needKeyCoinTypeFinalize(vaultId, chainInfo) ||
          selectedCoinType < 0,
        loading: buttonIsLoading,
        onPress: async () => {
          if (selectedCoinType > 0) {
            await keyRingStore.finalizeKeyCoinType(
              vaultId,
              chainId,
              selectedCoinType,
            );

            await chainStore.enableChainInfoInUIWithVaultId(vaultId, chainId);

            if (chainIds.length - index > 1) {
              setButtonIsLoading(true);
              keyRingStore
                .computeNotFinalizedKeyAddresses(vaultId, chainIds[index + 1])
                .then(res => {
                  setCandidates(res);

                  if (res.length > 0) {
                    setSelectedCoinType(res[0].coinType);
                  }

                  setIndex(index + 1);

                  setButtonIsLoading(false);
                });
            } else {
              if (skipWelcome) {
                navigation.reset({routes: [{name: 'Home'}]});
              } else {
                navigation.reset({
                  routes: [{name: 'Register.Welcome', params: {password}}],
                });
              }
            }
          }
        },
      }}>
      <Text
        style={StyleSheet.flatten([
          style.flatten(['color-text-low', 'body1']),
          {textAlign: 'center'},
        ])}>
        <FormattedMessage id="pages.register.select-derivation-path.paragraph" />
      </Text>

      <Gutter size={28} />

      <Box
        alignX="center"
        padding={20}
        borderRadius={25}
        backgroundColor={style.get('color-gray-600').color}>
        <Text style={style.flatten(['subtitle3', 'color-text-middle'])}>
          <FormattedMessage
            id="pages.register.select-derivation-path.chain-step"
            values={{
              currentStep: index + 1,
              totalStep: totalCount,
            }}
          />
        </Text>

        <Gutter size={12} />

        <Box
          padding={12}
          borderRadius={50}
          backgroundColor="rgba(46, 46, 50, 0.50)">
          <XAxis alignY="center">
            <ExpoImage.Image
              style={style.flatten([
                'width-44',
                'height-44',
                'border-radius-64',
              ])}
              source={
                chainInfo.chainSymbolImageUrl
                  ? chainInfo.chainSymbolImageUrl
                  : require('../../../public/assets/img/chain-icon-alt.png')
              }
              contentFit="contain"
            />

            <Gutter size={8} />

            <YAxis>
              <Text style={style.flatten(['h4', 'color-text-high'])}>
                {chainInfo.chainName}
              </Text>
              <Text style={style.flatten(['body2', 'color-text-middle'])}>
                {currency.coinDenom}
              </Text>
            </YAxis>
          </XAxis>
        </Box>

        <Gutter size={20} />

        <Box width="100%" style={{gap: 20}}>
          {candidates.map(candidate => (
            <PathItem
              key={candidate.coinType}
              chainId={chainId}
              coinType={candidate.coinType}
              bech32Address={candidate.bech32Address}
              currency={currency}
              isSelected={selectedCoinType === candidate.coinType}
              onClick={() => {
                setSelectedCoinType(candidate.coinType);
              }}
            />
          ))}
        </Box>
      </Box>

      <Gutter size={20} />
    </ScrollViewRegisterContainer>
  );
});

const PathItem: FunctionComponent<{
  chainId: string;

  isSelected: boolean;
  coinType: number;
  bech32Address: string;
  currency: AppCurrency;

  onClick: () => void;
}> = observer(
  ({chainId, isSelected, coinType, bech32Address, currency, onClick}) => {
    const style = useStyle();

    const {queriesStore} = useStore();

    const queries = queriesStore.get(chainId);

    return (
      <TouchableWithoutFeedback onPress={onClick}>
        <Box
          padding={20}
          borderRadius={10}
          backgroundColor={style.get('color-gray-500').color}
          style={{opacity: isSelected ? 1 : 0.5}}>
          <XAxis alignY="center">
            <Box padding={8}>
              <WalletIcon size={20} color={style.get('color-gray-10').color} />
            </Box>

            <Gutter size={16} />

            <YAxis>
              <Text style={style.flatten(['h5', 'color-text-high'])}>
                m/44’/{coinType}’
              </Text>
              <Text style={style.flatten(['body2', 'color-text-middle'])}>
                {Bech32Address.shortenAddress(bech32Address, 24)}
              </Text>
            </YAxis>
          </XAxis>

          <Gutter size={16} />

          <Box height={1} backgroundColor={style.get('color-gray-400').color} />

          <Gutter size={16} />

          <XAxis alignY="center">
            <Text
              style={style.flatten(['subtitle3', 'color-text-high', 'flex-1'])}>
              <FormattedMessage id="pages.register.select-derivation-path.path-item.balance" />
            </Text>

            <Text style={style.flatten(['subtitle3', 'color-text-high'])}>
              {(() => {
                const queryBal = queries.queryBalances
                  .getQueryBech32Address(bech32Address)
                  .getBalance(currency);

                if (queryBal) {
                  return queryBal.balance;
                }
                return new CoinPretty(currency, '0');
              })()
                .trim(true)
                .maxDecimals(6)
                .inequalitySymbol(true)
                .shrink(true)
                .toString()}
            </Text>
          </XAxis>

          <Gutter size={4} />

          <XAxis alignY="center">
            <Text
              style={style.flatten(['subtitle3', 'color-text-high', 'flex-1'])}>
              <FormattedMessage id="pages.register.select-derivation-path.path-item.previous-txs" />
            </Text>

            <Text style={style.flatten(['subtitle3', 'color-text-high'])}>
              {
                queries.cosmos.queryAccount.getQueryBech32Address(bech32Address)
                  .sequence
              }
            </Text>
          </XAxis>
        </Box>
      </TouchableWithoutFeedback>
    );
  },
);
