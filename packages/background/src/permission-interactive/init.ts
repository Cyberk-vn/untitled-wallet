import { Router } from "@titan-wallet/router";
import { PermissionInteractiveService } from "./service";
import {
  EnableAccessMsg,
  DisableAccessMsg,
  IsEnabledAccessMsg,
  EnableAccessForEVMMsg,
  EnableAccessForStarknetMsg,
} from "./messages";
import { ROUTE } from "./constants";
import { getHandler } from "./handler";

export function init(
  router: Router,
  service: PermissionInteractiveService
): void {
  router.registerMessage(EnableAccessMsg);
  router.registerMessage(EnableAccessForEVMMsg);
  router.registerMessage(EnableAccessForStarknetMsg);
  router.registerMessage(DisableAccessMsg);
  router.registerMessage(IsEnabledAccessMsg);

  router.addHandler(ROUTE, getHandler(service));
}
