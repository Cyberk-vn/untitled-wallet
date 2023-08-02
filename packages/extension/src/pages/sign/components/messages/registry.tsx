import React, { FunctionComponent } from "react";
import { IMessageRenderer, IMessageRenderRegistry } from "./types";
import { Msg } from "@keplr-wallet/types";
import { AnyWithUnpacked, UnknownMessage } from "@keplr-wallet/cosmos";
import yaml from "js-yaml";
import { Buffer } from "buffer/";
import {
  ClaimRewardsMessage,
  CustomIcon,
  DelegateMessage,
  ExecuteContractMessage,
  RedelegateMessage,
  SendMessage,
  TransferMessage,
  UndelegateMessage,
  VoteMessage,
} from "./render";
import { FormattedMessage } from "react-intl";
import { useTheme } from "styled-components";
import { ColorPalette } from "../../../../styles";

export class MessageRenderRegistry implements IMessageRenderRegistry {
  protected renderers: IMessageRenderer[] = [];

  register(renderer: IMessageRenderer): void {
    this.renderers.push(renderer);
  }

  render(
    chainId: string,
    msg: Msg | AnyWithUnpacked
  ): {
    icon: React.ReactElement;
    title: string | React.ReactElement;
    content: string | React.ReactElement;
  } {
    try {
      for (const renderer of this.renderers) {
        const res = renderer.process(chainId, msg);
        if (res) {
          return res;
        }
      }
    } catch (e) {
      console.log(e);
      // Fallback to unknown message
    }

    const prettyMsg = (() => {
      try {
        if ("type" in msg) {
          return yaml.dump(msg);
        }

        if ("unpacked" in msg) {
          return yaml.dump({
            typeUrl: msg.typeUrl || "Unknown",
            value: msg.unpacked,
          });
        }

        if (msg instanceof UnknownMessage) {
          return yaml.dump({
            typeUrl: msg.typeUrl || "Unknown",
            value: Buffer.from(msg.value).toString("base64"),
          });
        }

        return yaml.dump(msg);
      } catch (e) {
        console.log(e);
        return "Failed to decode the msg";
      }
    })();

    return {
      icon: <CustomIcon />,
      title: (
        <FormattedMessage id="page.sign.components.messages.custom.title" />
      ),
      content: <UnknownMessageContent>{prettyMsg}</UnknownMessageContent>,
    };
  }
}

const UnknownMessageContent: FunctionComponent = ({ children }) => {
  const theme = useTheme();
  return (
    <pre
      style={{
        margin: 0,
        color:
          theme.mode === "light"
            ? ColorPalette["gray-300"]
            : ColorPalette["gray-200"],
      }}
    >
      {children}
    </pre>
  );
};

export const defaultRegistry = new MessageRenderRegistry();
defaultRegistry.register(ClaimRewardsMessage);
defaultRegistry.register(DelegateMessage);
defaultRegistry.register(ExecuteContractMessage);
defaultRegistry.register(RedelegateMessage);
defaultRegistry.register(SendMessage);
defaultRegistry.register(TransferMessage);
defaultRegistry.register(UndelegateMessage);
defaultRegistry.register(VoteMessage);
