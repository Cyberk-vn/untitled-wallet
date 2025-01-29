import React, { FunctionComponent } from "react";
import { Body2 } from "../../../components/typography";
import { Stack } from "../../../components/stack";
import { Button } from "../../../components/button";
import { Gutter } from "../../../components/gutter";
import { MoreOptionsButton } from "./components/more-options-button";
import { useSceneTransition } from "../../../components/transition";
import { FormattedMessage, useIntl } from "react-intl";
import {
  RegisterSceneBoxBody,
  RegisterSceneBoxFooter,
  RegisterSceneBoxWithHeight,
} from "../components/register-scene-box-with-height";

export const RegisterMoreOptionsScene: FunctionComponent = () => {
  const sceneTransition = useSceneTransition();
  const intl = useIntl();

  return (
    <RegisterSceneBoxWithHeight
      title={intl.formatMessage({ id: "pages.register.more-options.title" })}
    >
      <RegisterSceneBoxBody textAlign="center">
        <Stack gutter="0.75rem">
          <Body2 color="#FFFFFF99" style={{ textTransform: "uppercase" }}>
            <FormattedMessage id="pages.register.more-options.create-new" />
          </Body2>
          <MoreOptionsButton
            text={intl.formatMessage({
              id: "pages.register.more-options.create-new-passphrase-button",
            })}
            onClick={() => {
              sceneTransition.push("new-mnemonic");
            }}
          />
        </Stack>
        <Gutter size="2rem" />
        <Stack gutter="0.75rem">
          <Body2 color="#FFFFFF99" style={{ textTransform: "uppercase" }}>
            <FormattedMessage id="pages.register.more-options.import-existing-accounts" />
          </Body2>
          <MoreOptionsButton
            text={intl.formatMessage({
              id: "pages.register.more-options.import-passphrase-button",
            })}
            onClick={() => {
              sceneTransition.push("import-passphrase");
            }}
          />
          <MoreOptionsButton
            text={intl.formatMessage({
              id: "pages.register.more-options.import-private-key-button",
            })}
            onClick={() => {
              sceneTransition.push("import-private-key");
            }}
          />
        </Stack>
      </RegisterSceneBoxBody>
      <RegisterSceneBoxFooter>
        <Button
          mode="outline"
          text={intl.formatMessage({
            id: "pages.register.more-options.back-button",
          })}
          onClick={() => {
            sceneTransition.pop();
          }}
        />
      </RegisterSceneBoxFooter>
    </RegisterSceneBoxWithHeight>
  );
};
