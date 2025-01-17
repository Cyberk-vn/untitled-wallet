import { Router } from "@titan-wallet/router";
import { GetThemeOptionMsg, SetThemeOptionMsg } from "./messages";
import { ROUTE } from "./constants";
import { getHandler } from "./handler";
import { SettingsService } from "./service";

export function init(router: Router, service: SettingsService): void {
  router.registerMessage(GetThemeOptionMsg);
  router.registerMessage(SetThemeOptionMsg);

  router.addHandler(ROUTE, getHandler(service));
}
