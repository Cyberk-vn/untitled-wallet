import React, { FunctionComponent } from "react";
import { RegisterSceneBox } from "../components/register-scene-box";
import { Stack } from "../../../components/stack";
import { Button } from "../../../components/button";
import { useSceneTransition } from "../../../components/transition";
import { Gutter } from "../../../components/gutter";
import { observer } from "mobx-react-lite";
import { FormattedMessage, useIntl } from "react-intl";
import { Body2, Subtitle2 } from "../../../components/typography";
import { useTheme } from "styled-components";
import { ColorPalette } from "../../../styles";
import { Box } from "../../../components/box";
import { IntroCarousel } from "./components/intro-carousel";

export const RegisterIntroScene: FunctionComponent = observer(() => {
  const sceneTransition = useSceneTransition();
  const intl = useIntl();
  const theme = useTheme();

  return (
    <RegisterSceneBox>
      <Gutter size="7rem" />
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Subtitle2>
          <FormattedMessage id="pages.register.intro.name-the-app-title" />:{" "}
        </Subtitle2>
        <input
          type="text"
          style={{
            border: "none",
            background: "transparent",
            outline: "none",
            fontWeight: 500,
            fontSize: "1rem",
            color: ColorPalette["gray-300"],
          }}
          placeholder="Untitled App"
        />
      </Box>
      <Gutter size="3.75rem" />
      <IntroCarousel />
      <Gutter size="1.125rem" />
      <Stack gutter="0.5rem">
        <Button
          text={intl.formatMessage({
            id: "pages.register.intro.create-new-passphrase-button",
          })}
          onClick={() => {
            sceneTransition.push("new-mnemonic");
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
                  color:
                    theme.mode === "light"
                      ? ColorPalette["white"]
                      : ColorPalette["white"],
                  textDecoration: "none",
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
                  color:
                    theme.mode === "light"
                      ? ColorPalette["white"]
                      : ColorPalette["white"],
                  textDecoration: "none",
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
