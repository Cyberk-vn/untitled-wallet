import React, { FunctionComponent } from "react";
import { RegisterSceneBoxBody } from "../components/register-scene-box-with-height";
import { Button } from "../../../components/button";
import { RegisterSceneBoxFooter } from "../components/register-scene-box-with-height";
import { RegisterSceneBoxWithHeight } from "../components/register-scene-box-with-height";
import { Column, Columns } from "../../../components/column";
import { H1 } from "../../../components/typography";

export const RegisterImportPassphraseScene: FunctionComponent = () => {
  return (
    <RegisterSceneBoxWithHeight title="Import from passphrase">
      <RegisterSceneBoxBody>
        <H1>Import from passphrase - Body</H1>
      </RegisterSceneBoxBody>
      <RegisterSceneBoxFooter>
        <Columns sum={2} gutter="0.75rem">
          <Column weight={1}>
            <Button mode="outline" text="Back" />
          </Column>
          <Column weight={1}>
            <Button text="Next" disabled />
          </Column>
        </Columns>
      </RegisterSceneBoxFooter>
    </RegisterSceneBoxWithHeight>
  );
};
