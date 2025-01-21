import React, {FunctionComponent, useEffect, useMemo} from 'react';
import {observer} from 'mobx-react-lite';
import {TextInput} from '../../../components/input';
import {Controller, useForm} from 'react-hook-form';
import {useStore} from '../../../stores';
import {InteractionWaitingData} from '@titan-wallet/background';
import {useIntl} from 'react-intl';
import {Box} from '../../../components/box';
import {useStyle} from '../../../styles';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../../navigation';
import {ScrollViewRegisterContainer} from '../../register/components/scroll-view-register-container';
import {InteractionManager, View} from 'react-native';

interface FormData {
  name: string;
}

export const WalletChangeNameScreen: FunctionComponent = observer(() => {
  const {keyRingStore, interactionStore} = useStore();
  const navigate = useNavigation();
  const route =
    useRoute<RouteProp<RootStackParamList, 'SelectWallet.ChangeName'>>();
  const intl = useIntl();
  const style = useStyle();
  const vaultId = route.params.id;

  const walletName = useMemo(() => {
    return keyRingStore.keyInfos.find(info => info.id === vaultId);
  }, [keyRingStore.keyInfos, vaultId]);

  const {
    handleSubmit,
    setFocus,
    control,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues: {
      name: '',
    },
  });

  //TODO 아래 로직 구현해야함
  // 이 페이지는 외부에서 changeKeyRingName api로 접근할 수도 있으므로
  // 인터렉션이 필요한 경우 따로 처리를 해줘야한다.
  // 이하 주석처리를 한 코드들은 해당 사항을 구현할떄 참고해서 같이 구현해야함
  // const interactionInfo = useInteractionInfo(() => {
  //   interactionStore.rejectAll('change-keyring-name');
  // });

  const interactionData: InteractionWaitingData | undefined =
    interactionStore.getAllData('change-keyring-name')[0];

  // useEffect(() => {
  //   if (interactionData?.data) {
  //     const defaultName = (interactionData.data as any).defaultName;
  //     if (defaultName) {
  //       setValue('name', defaultName);
  //     }
  //   }
  // }, [interactionData?.data, setValue]);

  // const notEditable =
  //   interactionData?.data != null &&
  //   (interactionData.data as any).editable === false;

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setFocus('name');
    });
  }, [setFocus]);
  const submit = handleSubmit(async data => {
    try {
      if (vaultId) {
        //TODO useInteractionInfo 구현할때 같이 해야함
        // if (
        //   interactionInfo.interaction &&
        //   !interactionInfo.interactionInternal
        // ) {
        //   await interactionStore.approveWithProceedNextV2(
        //     interactionStore
        //       .getAllData('change-keyring-name')
        //       .map(data => data.id),
        //     data.name,
        //     proceedNext => {
        //       if (!proceedNext) {
        //         window.close();
        //       }
        //     },
        //   );
        // } else {
        await keyRingStore.changeKeyRingName(vaultId, data.name);
        navigate.goBack();
        // }
      }
    } catch (e) {
      console.log(e);
    }
  });

  return (
    <ScrollViewRegisterContainer
      bottomButtonStyle={{left: 12, right: 12}}
      contentContainerStyle={style.flatten(['flex-grow-1'])}
      bottomButton={{
        text: intl.formatMessage({id: 'button.confirm'}),
        color: 'primary',
        size: 'large',
        loading: (() => {
          // if (!interactionInfo.interaction) {
          //   return false;
          // }
          return interactionStore.isObsoleteInteraction(interactionData?.id);
        })(),
        onPress: submit,
      }}>
      {/* 뒤로가기 버튼을 아래 상황일때 안보여줘야함
       <HeaderLayout
        left={
          <BackButton
            hidden={
              interactionInfo.interaction &&
              !interactionInfo.interactionInternal
            }
          />
        }
 > */}
      <Box padding={12} style={style.flatten(['flex-1'])}>
        <Box style={style.flatten(['gap-12'])}>
          <TextInput
            label={intl.formatMessage({
              id: 'page.wallet.change-name.previous-name-input-label',
            })}
            disabled
            value={walletName?.name}
          />
          <Controller
            control={control}
            rules={{required: ''}}
            name="name"
            defaultValue=""
            render={({field: {value, onChange, onBlur, ref}}) => {
              return (
                <TextInput
                  label={intl.formatMessage({
                    id: 'page.wallet.change-name.new-name-input-label',
                  })}
                  placeholder={intl.formatMessage({
                    id: 'page.wallet.change-name.new-name-input-placeholder',
                  })}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  ref={ref}
                  error={errors.name && errors.name.message}
                  onSubmitEditing={() => {
                    if (value) {
                      submit();
                      return;
                    }
                    setFocus('name');
                  }}
                  returnKeyType="done"
                />
              );
            }}
          />
        </Box>
        <View style={style.flatten(['flex-1'])} />
      </Box>
    </ScrollViewRegisterContainer>
  );
});
