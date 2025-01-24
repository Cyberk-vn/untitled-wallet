import React, { FunctionComponent } from "react";
import { Box } from "../../../components/box";
import { Separator } from "../../../components/separator";
import { Body2, Subtitle2 } from "../../../components/typography";
import { Stack } from "../../../components/stack";
import { Button } from "../../../components/button";
import { Gutter } from "../../../components/gutter";
import { MoreOptionsButton } from "./components/more-options-button";
import { useSceneTransition } from "../../../components/transition";
import { useIntl } from "react-intl";

export const RegisterMoreOptionsScene: FunctionComponent = () => {
  const sceneTransition = useSceneTransition();
  const intl = useIntl();

  return (
    <Box minHeight="35rem">
      <Box alignX="center" paddingY="1rem">
        <Subtitle2>
          {intl.formatMessage({ id: "pages.register.more-options.title" })}
        </Subtitle2>
      </Box>
      <Separator />
      <Box
        style={{ flex: 1, alignItems: "stretch", textAlign: "center" }}
        padding="1.5rem"
        alignX="center"
      >
        <Stack gutter="0.75rem">
          <Body2 color="#FFFFFF99">
            {intl
              .formatMessage({
                id: "pages.register.more-options.create-new",
              })
              .toUpperCase()}
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
          <Body2 color="#FFFFFF99">
            {intl
              .formatMessage({
                id: "pages.register.more-options.import-existing-accounts",
              })
              .toUpperCase()}
          </Body2>
          <MoreOptionsButton
            text={intl.formatMessage({
              id: "pages.register.more-options.import-passphrase-button",
            })}
            onClick={() => {}}
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
      </Box>
      <Box padding="1.5rem">
        <Button
          mode="outline"
          text={intl.formatMessage({
            id: "pages.register.more-options.back-button",
          })}
          onClick={() => {
            sceneTransition.pop();
          }}
        />
      </Box>
    </Box>
  );
};
