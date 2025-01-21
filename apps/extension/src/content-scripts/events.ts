import { Message, Router } from "@titan-wallet/router";

class PushEventDataMsg<D = unknown> extends Message<void> {
  public static type() {
    return "push-event-data";
  }

  constructor(
    public readonly data: {
      type: string;
      data: D;
    }
  ) {
    super();
  }

  validateBasic(): void {
    if (!this.data.type) {
      throw new Error("Type should not be empty");
    }
  }

  route(): string {
    return "interaction-foreground";
  }

  type(): string {
    return PushEventDataMsg.type();
  }
}

export function initEvents(router: Router) {
  router.registerMessage(PushEventDataMsg);

  router.addHandler("interaction-foreground", (_, msg) => {
    switch (msg.constructor) {
      case PushEventDataMsg:
        switch ((msg as PushEventDataMsg).data.type) {
          case "keystore-changed":
            return window.dispatchEvent(new Event("titan_keystorechange"));
          case "titan_chainChanged":
            return window.dispatchEvent(
              new CustomEvent("titan_chainChanged", {
                detail: {
                  ...(
                    msg as PushEventDataMsg<{
                      origin: string;
                      evmChainId: number;
                    }>
                  ).data.data,
                },
              })
            );
          case "titan_starknetChainChanged":
            return window.dispatchEvent(
              new CustomEvent("titan_starknetChainChanged", {
                detail: {
                  ...(
                    msg as PushEventDataMsg<{
                      origin: string;
                      starknetChainId: string;
                    }>
                  ).data.data,
                },
              })
            );
          case "titan_ethSubscription":
            return window.dispatchEvent(
              new CustomEvent("titan_ethSubscription", {
                detail: {
                  ...(
                    msg as PushEventDataMsg<{
                      origin: string;
                      data: { subscription: string; result: any };
                    }>
                  ).data.data,
                },
              })
            );
        }
        return;
      default:
        throw new Error("Unknown msg type");
    }
  });
}
