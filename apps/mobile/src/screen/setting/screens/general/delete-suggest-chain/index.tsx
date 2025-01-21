import {observer} from 'mobx-react-lite';
import React, {FunctionComponent} from 'react';

import {ChainInfo} from '@titan-wallet/types';

import {useIntl} from 'react-intl';
import {Text} from 'react-native';
import {useStyle} from '../../../../../styles';
import {useStore} from '../../../../../stores';
import {Box} from '../../../../../components/box';
import {EmptyView, EmptyViewText} from '../../../../../components/empty-view';
import {Gutter} from '../../../../../components/gutter';
import {Column, Columns} from '../../../../../components/column';
import {ChainImageFallback} from '../../../../../components/image';
import {Stack} from '../../../../../components/stack';
import {CloseIcon} from '../../../../../components/icon';
import {GuideBox} from '../../../../../components/guide-box';
import {FlatList} from '../../../../../components/flat-list';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export const SettingGeneralDeleteSuggestChainScreen: FunctionComponent =
  observer(() => {
    const {chainStore} = useStore();
    const suggestedChains = chainStore.chainInfos.filter(
      chainInfo => !chainInfo.embedded.embedded,
    );
    const style = useStyle();
    const intl = useIntl();

    return (
      <Box paddingX={12} paddingY={8} style={style.flatten(['flex-grow-1'])}>
        <FlatList
          data={suggestedChains}
          ListHeaderComponent={() => {
            return suggestedChains.length ? (
              <React.Fragment>
                <GuideBox
                  title={intl.formatMessage({
                    id: 'page.setting.general.guide-box.title',
                  })}
                />
                <Gutter size={16} />
              </React.Fragment>
            ) : null;
          }}
          renderItem={({item: chainInfo}) => {
            return (
              <ChainItem
                key={chainInfo.chainIdentifier}
                chainInfo={chainInfo}
                onClickClose={() => {
                  chainStore.removeChainInfo(chainInfo.chainIdentifier);
                }}
              />
            );
          }}
          ItemSeparatorComponent={() => <Gutter size={8} />}
          ListEmptyComponent={() => {
            return (
              <React.Fragment>
                <Gutter size={148} direction="vertical" />
                <EmptyView>
                  <EmptyViewText
                    text={intl.formatMessage({
                      id: 'page.setting.general.delete-suggest-chain.empty-text',
                    })}
                  />
                </EmptyView>
              </React.Fragment>
            );
          }}
        />
      </Box>
    );
  });

const ChainItem: FunctionComponent<{
  chainInfo: ChainInfo;
  onClickClose?: () => void;
}> = ({chainInfo, onClickClose}) => {
  const style = useStyle();

  return (
    <Box
      backgroundColor={style.get('color-card-default').color}
      borderRadius={6}
      paddingX={16}
      paddingY={20}>
      <Columns sum={1} alignY="center" gutter={6}>
        <Box borderRadius={36}>
          <ChainImageFallback
            style={{width: 48, height: 48}}
            alt={`${chainInfo.chainId}-${chainInfo.chainName}-image`}
            src={chainInfo.chainSymbolImageUrl}
          />
        </Box>
        <Stack gutter={6}>
          <Columns sum={1} alignY="center" gutter={4}>
            <Text style={style.flatten(['body1', 'color-text-high'])}>
              {chainInfo.chainName}
            </Text>
          </Columns>
          <Text style={style.flatten(['body2', 'color-text-low'])}>
            {chainInfo.currencies[0].coinDenom}
          </Text>
        </Stack>

        <Column weight={1} />

        <TouchableWithoutFeedback onPress={onClickClose}>
          <Box>
            <CloseIcon size={24} color={style.get('color-text-low').color} />
          </Box>
        </TouchableWithoutFeedback>
      </Columns>
    </Box>
  );
};
