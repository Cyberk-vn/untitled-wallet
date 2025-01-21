import { Guard } from "@titan-wallet/router";
import { ExtensionGuards } from "@titan-wallet/router-extension";

export class MockGuards {
  static readonly checkOriginIsValid: Guard =
    ExtensionGuards.checkOriginIsValid;

  static readonly checkMessageIsInternal: Guard =
    ExtensionGuards.checkMessageIsInternal;
}
