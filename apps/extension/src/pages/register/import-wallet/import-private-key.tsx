import React, { FunctionComponent } from "react";
import { RegisterSimpleHeaderWithSeparator } from "../components/simple-header-with-separator";
import {
  RegisterSceneBoxBody,
  RegisterSceneBoxFooter,
  RegisterSceneBoxWithHeight,
} from "../components/register-scene-box-with-height";
import { Button } from "../../../components/button";

export const RegisterImportPrivateKeyScene: FunctionComponent = () => {
  return (
    <RegisterSceneBoxWithHeight title="Import from private key">
      <RegisterSceneBoxBody>
        <RegisterSimpleHeaderWithSeparator title="Import from private key" />
      </RegisterSceneBoxBody>
      <RegisterSceneBoxFooter>
        <Button mode="outline" text="Back" />
      </RegisterSceneBoxFooter>
    </RegisterSceneBoxWithHeight>
  );
};
