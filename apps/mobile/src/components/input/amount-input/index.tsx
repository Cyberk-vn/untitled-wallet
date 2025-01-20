import React, {FunctionComponent, useEffect, useState} from 'react';
import {
  EmptyAmountError,
  IAmountConfig,
  ZeroAmountError,
} from '@titan-wallet/hooks';
import {observer} from 'mobx-react-lite';
import {TextInput} from '../text-input/text-input';
import {FormattedMessage, useIntl} from 'react-intl';
import {useStore} from '../../../stores';
import {CoinPretty, Dec, DecUtils} from '@titan-wallet/unit';
import {Text} from 'react-native';
import {useStyle} from '../../../styles';
import {Box} from '../../box';
import {Path, Svg} from 'react-native-svg';
import {Columns} from '../../column';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export const AmountInput: FunctionComponent<{
  amountConfig: IAmountConfig;
}> = observer(({amountConfig}) => {
  if (amountConfig.amount.length !== 1) {
    throw new Error(
      `Amount input component only handles single amount: ${amountConfig.amount
        .map(a => a.toString())
        .join(',')}`,
    );
  }

  const {chainStore, priceStore} = useStore();
  const intl = useIntl();

  const price = (() => {
    return priceStore.calculatePrice(amountConfig.amount[0]);
  })();
  const [priceValue, setPriceValue] = useState('');
  const [isPriceBased, setIsPriceBased] = useState(false);

  // Price symbol의 collapsed transition을 기다리기 위해서 사용됨.
  const [renderPriceSymbol, setRenderPriceSymbol] = useState(isPriceBased);
  useEffect(() => {
    if (isPriceBased) {
      setRenderPriceSymbol(true);
    }
  }, [isPriceBased]);

  return (
    <TextInput
      label={intl.formatMessage({
        id: 'components.input.amount-input.amount-label',
      })}
      keyboardType="numeric"
      value={(() => {
        if (isPriceBased) {
          if (amountConfig.fraction != 0) {
            return price?.toDec().toString(price?.options.maxDecimals);
          }
          return priceValue;
        } else {
          return amountConfig.value;
        }
      })()}
      onChangeText={text => {
        if (isPriceBased) {
          if (price) {
            let value = text;
            if (value.startsWith('.')) {
              value = '0' + value;
            }
            if (value.trim().length === 0) {
              amountConfig.setValue('');
              setPriceValue(value);
              return;
            }
            if (/^\d+(\.\d+)*$/.test(value)) {
              let dec: Dec;
              try {
                dec = new Dec(value);
              } catch (e) {
                console.log(e);
                return;
              }
              if (dec.lte(new Dec(0))) {
                setPriceValue(value);
                return;
              }

              const onePrice = priceStore.calculatePrice(
                new CoinPretty(
                  amountConfig.amount[0].currency,
                  DecUtils.getTenExponentN(
                    amountConfig.amount[0].currency.coinDecimals,
                  ),
                ),
              );

              if (!onePrice) {
                // Can't be happen
                return;
              }
              const onePriceDec = onePrice.toDec();
              const expectedAmount = dec.quo(onePriceDec);

              setPriceValue(value);
              amountConfig.setValue(
                expectedAmount.toString(
                  amountConfig.amount[0].currency.coinDecimals,
                ),
              );
            }
          }
        } else {
          amountConfig.setValue(text);
        }
      }}
      left={renderPriceSymbol ? <PriceSymbol show={isPriceBased} /> : null}
      right={(() => {
        if (
          // In the case of terra classic, tax is applied in proportion to the amount.
          // However, in this case, the tax itself changes the fee,
          // so if you use the max function, it will fall into infinite repetition.
          // We currently disable if chain is terra classic because we can't handle it properly.
          chainStore.hasChain(amountConfig.chainId) &&
          chainStore
            .getChain(amountConfig.chainId)
            .hasFeature('terra-classic-fee')
        ) {
          return undefined;
        }

        return <MaxButton amountConfig={amountConfig} />;
      })()}
      bottom={
        price ? (
          <BottomPriceButton
            text={(() => {
              if (isPriceBased) {
                return amountConfig.amount[0]
                  .trim(true)
                  .maxDecimals(6)
                  .inequalitySymbol(true)
                  .shrink(true)
                  .toString();
              } else {
                return price.toString();
              }
            })()}
            onClick={() => {
              if (!isPriceBased) {
                if (price.toDec().lte(new Dec(0))) {
                  setPriceValue('');
                } else {
                  setPriceValue(
                    price
                      .toDec()
                      .toString(price.options.maxDecimals)
                      .toString(),
                  );
                }
              }
              setIsPriceBased(!isPriceBased);
            }}
          />
        ) : null
      }
      error={(() => {
        const uiProperties = amountConfig.uiProperties;

        const err = uiProperties.error || uiProperties.warning;

        if (err instanceof EmptyAmountError) {
          return;
        }

        if (err instanceof ZeroAmountError) {
          return;
        }

        if (err) {
          return err.message || err.toString();
        }
      })()}
    />
  );
});

const PriceSymbol: FunctionComponent<{
  show: boolean;
}> = observer(({show}) => {
  const {priceStore} = useStore();

  const style = useStyle();

  const fiatCurrency = priceStore.getFiatCurrency(priceStore.defaultVsCurrency);

  if (!fiatCurrency) {
    return null;
  }

  return (
    <React.Fragment>
      {show ? (
        <Box alignY="center">
          <Text style={style.flatten(['body2', 'color-gray-50'])}>
            {fiatCurrency.symbol}
          </Text>
        </Box>
      ) : null}
    </React.Fragment>
  );
});

const BottomPriceButton: FunctionComponent<{
  text: string;
  onClick: () => void;
}> = ({text, onClick}) => {
  const style = useStyle();

  const [isPressed, setIsPressed] = useState(false);

  return (
    <Box alignX="left" marginTop={8} marginLeft={8}>
      <TouchableWithoutFeedback
        onPress={onClick}
        onPressIn={() => {
          setIsPressed(true);
        }}
        onPressOut={() => setIsPressed(false)}>
        <Box>
          <Columns sum={1} alignY="center">
            <Svg width={20} height={20} fill="none" viewBox="0 0 20 20">
              <Path
                fill={
                  isPressed
                    ? style.get('color-gray-300').color
                    : style.get('color-gray-200').color
                }
                fillRule="evenodd"
                d="M13.2 2.24a.75.75 0 00.04 1.06l2.1 1.95H6.75a.75.75 0 000 1.5h8.59l-2.1 1.95a.75.75 0 101.02 1.1l3.5-3.25a.75.75 0 000-1.1l-3.5-3.25a.75.75 0 00-1.06.04zm-6.4 8a.75.75 0 00-1.06-.04l-3.5 3.25a.75.75 0 000 1.1l3.5 3.25a.75.75 0 101.02-1.1l-2.1-1.95h8.59a.75.75 0 000-1.5H4.66l2.1-1.95a.75.75 0 00.04-1.06z"
                clipRule="evenodd"
              />
            </Svg>

            <Text
              style={style.flatten([
                isPressed ? 'color-gray-300' : 'color-gray-200',
                'margin-left-4',
              ])}>
              {text}
            </Text>
          </Columns>
        </Box>
      </TouchableWithoutFeedback>
    </Box>
  );
};

const MaxButton: FunctionComponent<{
  amountConfig: IAmountConfig;
}> = observer(({amountConfig}) => {
  const isMax = amountConfig.fraction === 1;
  const style = useStyle();

  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableWithoutFeedback
      onPressIn={() => {
        setIsPressed(true);
      }}
      onPressOut={() => setIsPressed(false)}
      onPress={() => {
        if (amountConfig.fraction > 0) {
          amountConfig.setFraction(0);
        } else {
          amountConfig.setFraction(1);
        }
      }}>
      <Box
        alignX="center"
        alignY="center"
        paddingX={10}
        paddingY={6}
        backgroundColor={
          isMax
            ? style.get('color-gray-500').color
            : isPressed
            ? style.get('color-gray-550').color
            : style.get('color-gray-500').color
        }
        borderRadius={4}
        borderWidth={1}
        borderColor={
          isMax
            ? isPressed
              ? style.get('color-gray-400').color
              : style.get('color-gray-300').color
            : undefined
        }>
        <Text
          style={style.flatten([
            'text-button2',
            isMax ? 'color-gray-300' : 'color-white',
          ])}>
          <FormattedMessage id="components.input.amount-input.max-button" />
        </Text>
      </Box>
    </TouchableWithoutFeedback>
  );
});
