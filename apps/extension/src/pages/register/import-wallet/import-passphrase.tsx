import React, { FunctionComponent } from "react";
import { RegisterSimpleHeaderWithSeparator } from "../components/simple-header-with-separator";
import { RegisterSceneBoxBody } from "../components/register-scene-box-with-height";
import { Button } from "../../../components/button";
import { RegisterSceneBoxFooter } from "../components/register-scene-box-with-height";
import { RegisterSceneBoxWithHeight } from "../components/register-scene-box-with-height";

export const RegisterImportPassphraseScene: FunctionComponent = () => {
  return (
    <RegisterSceneBoxWithHeight title="Import from passphrase">
      <RegisterSceneBoxBody>
        <RegisterSimpleHeaderWithSeparator title="Import from passphrase" />
      </RegisterSceneBoxBody>
      <RegisterSceneBoxFooter>
        <Button mode="outline" text="Back" />
        <Button text="Next" />
      </RegisterSceneBoxFooter>
    </RegisterSceneBoxWithHeight>
  );
};
