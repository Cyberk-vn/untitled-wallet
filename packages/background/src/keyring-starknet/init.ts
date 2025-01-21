import { Router } from "@titan-wallet/router";
import { KeyRingStarknetService } from "./service";
import {
  GetStarknetKeyMsg,
  GetStarknetKeysSettledMsg,
  RequestSignStarknetTx,
  RequestSignStarknetDeployAccountTx,
  RequestJsonRpcToStarknetMsg,
  GetStarknetKeysForEachVaultSettledMsg,
  GetStarknetKeyParamsSelectedMsg,
  RequestSignStarknetMessage,
} from "./messages";
import { ROUTE } from "./constants";
import { getHandler } from "./handler";
import { PermissionInteractiveService } from "../permission-interactive";

export function init(
  router: Router,
  service: KeyRingStarknetService,
  permissionInteractionService: PermissionInteractiveService
): void {
  router.registerMessage(GetStarknetKeyMsg);
  router.registerMessage(GetStarknetKeysSettledMsg);
  router.registerMessage(RequestSignStarknetTx);
  router.registerMessage(RequestSignStarknetMessage);
  router.registerMessage(RequestSignStarknetDeployAccountTx);
  router.registerMessage(RequestJsonRpcToStarknetMsg);
  router.registerMessage(GetStarknetKeysForEachVaultSettledMsg);
  router.registerMessage(GetStarknetKeyParamsSelectedMsg);

  router.addHandler(ROUTE, getHandler(service, permissionInteractionService));
}
