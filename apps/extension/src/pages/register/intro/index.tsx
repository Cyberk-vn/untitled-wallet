import React, { FunctionComponent } from "react";
import { RegisterSceneBox } from "../components/register-scene-box";
import { Stack } from "../../../components/stack";
import { Button } from "../../../components/button";
import {
  useSceneEvents,
  useSceneTransition,
} from "../../../components/transition";
import { useRegisterHeader } from "../components/header";
import { YAxis } from "../../../components/axis";
import { Gutter } from "../../../components/gutter";
import { observer } from "mobx-react-lite";
import { FormattedMessage, useIntl } from "react-intl";
import { Body2 } from "../../../components/typography";
import { useTheme } from "styled-components";
import { ColorPalette } from "../../../styles";

export const RegisterIntroScene: FunctionComponent = observer(() => {
  const sceneTransition = useSceneTransition();
  const intl = useIntl();
  const theme = useTheme();

  const header = useRegisterHeader();
  useSceneEvents({
    onWillVisible: () => {
      header.setHeader({
        mode: "intro",
      });
    },
  });

  return (
    <RegisterSceneBox>
      <YAxis alignX="center">
        <video width="200" height="200" autoPlay={true} loop={true}>
          <source
            src={require("../../../public/assets/lottie/register/intro.webm")}
          />
        </video>
      </YAxis>
      <Gutter size="3.125rem" />
      <Stack gutter="0.5rem">
        <Button
          text={intl.formatMessage({
            id: "pages.register.intro.create-new-passphrase-button",
          })}
          onClick={() => {
            sceneTransition.push("new-user");
          }}
        />
        <Button
          text={intl.formatMessage({
            id: "pages.register.intro.more-options-button",
          })}
          onClick={() => {
            sceneTransition.push("existing-user");
          }}
        />
      </Stack>
      <Gutter size="1.125rem" />
      <Body2
        style={{ textAlign: "center" }}
        color={
          theme.mode === "light"
            ? ColorPalette["gray-200"]
            : ColorPalette["gray-200"]
        }
      >
        <FormattedMessage
          id="pages.register.intro.paragraph-privacy-tos"
          values={{
            tos: (...chunks: any) => (
              <a
                style={{
                  fontWeight: 500,
                }}
                href="https://google.com"
                target="_blank"
                rel="noreferrer"
              >
                {chunks}
              </a>
            ),
            privacy: (...chunks: any) => (
              <a
                style={{
                  fontWeight: 500,
                }}
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
              >
                {chunks}
              </a>
            ),
          }}
        />
      </Body2>
    </RegisterSceneBox>
  );
});
