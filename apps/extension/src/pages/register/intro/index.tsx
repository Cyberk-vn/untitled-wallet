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
import { useIntl } from "react-intl";

export const RegisterIntroScene: FunctionComponent = observer(() => {
  const sceneTransition = useSceneTransition();
  const intl = useIntl();

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
      <Stack gutter="1.25rem">
        <Button
          text={intl.formatMessage({
            id: "pages.register.intro.create-new-passphrase-button",
          })}
          size="large"
          onClick={() => {
            sceneTransition.push("new-user");
          }}
        />
        <Button
          text={intl.formatMessage({
            id: "pages.register.intro.more-options-button",
          })}
          size="large"
          onClick={() => {
            sceneTransition.push("existing-user");
          }}
        />
      </Stack>
    </RegisterSceneBox>
  );
});
