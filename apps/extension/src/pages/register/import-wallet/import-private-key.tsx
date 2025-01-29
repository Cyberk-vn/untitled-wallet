import React, { FunctionComponent } from "react";
import {
  RegisterSceneBoxBody,
  RegisterSceneBoxFooter,
  RegisterSceneBoxWithHeight,
} from "../components/register-scene-box-with-height";
import { Button } from "../../../components/button";
import { Column, Columns } from "../../../components/column";
import { H4, Subtitle3 } from "../../../components/typography";
import { Gutter } from "../../../components/gutter";
import { TextInput } from "../../../components/input";
import { useSceneTransition } from "../../../components/transition";

export const RegisterImportPrivateKeyScene: FunctionComponent = () => {
  const sceneTransition = useSceneTransition();

  return (
    <form>
      <RegisterSceneBoxWithHeight title="Import from private key">
        <RegisterSceneBoxBody>
          <H4>Enter private key</H4>
          <Gutter size="1.5rem" />
          <Subtitle3
            style={{
              textAlign: "start",
            }}
          >
            Private Key
          </Subtitle3>
          <Gutter size="0.375rem" />
          <TextInput
            placeholder="Enter private key"
            style={{
              borderRadius: "1rem",
            }}
          />
        </RegisterSceneBoxBody>
        <RegisterSceneBoxFooter>
          <Columns sum={2} gutter="0.75rem">
            <Column weight={1}>
              <Button
                mode="outline"
                text="Back"
                onClick={() => {
                  sceneTransition.pop();
                }}
              />
            </Column>
            <Column weight={1}>
              <Button text="Next" disabled type="submit" />
            </Column>
          </Columns>
        </RegisterSceneBoxFooter>
      </RegisterSceneBoxWithHeight>
    </form>
  );
};
