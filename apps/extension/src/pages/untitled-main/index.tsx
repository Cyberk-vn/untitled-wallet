import React from "react";
import { Box } from "../../components/box";
import {
  DepositIcon,
  ReceiveIcon,
  SendIcon,
  SidebarViewIcon,
  SwapIcon,
} from "../../components/icon";
import { Body3, H1, Subtitle3 } from "../../components/typography";
import { Gutter } from "../../components/gutter";
import { Column, Columns } from "../../components/column";

export const UntitledMainPage = () => {
  return (
    <Box backgroundColor="#010005">
      <Box
        paddingY="1rem"
        paddingX="1.5rem"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <Box
          paddingX="0.75rem"
          paddingY="0.35rem"
          borderRadius="999px"
          alignY="center"
          alignX="center"
          backgroundColor="#23232366"
          style={{
            backdropFilter: "blur(1.25rem)",
          }}
        >
          <Subtitle3>Timmy First Wallet</Subtitle3>
        </Box>
        <Box style={{ cursor: "pointer" }} onClick={() => {}}>
          <SidebarViewIcon width="1.5rem" height="1.5rem" color="#C9C9C9" />
        </Box>
      </Box>
      <Box paddingY="1.25rem" paddingX="1.5rem" alignX="left">
        <div>
          <Box
            paddingX="0.75rem"
            paddingY="0.35rem"
            borderRadius="999px"
            alignY="center"
            alignX="center"
            backgroundColor="#23232366"
            style={{
              backdropFilter: "blur(1.25rem)",
            }}
          >
            <Subtitle3>Account 1</Subtitle3>
          </Box>
        </div>
        <Gutter size="0.5rem" />
        <div>
          <H1>1,003.89</H1>
        </div>
      </Box>
      <Box paddingY="1rem" paddingX="1.5rem">
        <Columns sum={4} gutter="0.5rem">
          <Column weight={1}>
            <Box alignX="center" alignY="center" paddingY="0.875rem">
              <SwapIcon width="2rem" height="2rem" color="#FF671F" />
              <Gutter size="0.3125rem" />
              <Body3>Swap</Body3>
            </Box>
          </Column>
          <Column weight={1}>
            <Box alignX="center" alignY="center" paddingY="0.875rem">
              <ReceiveIcon width="2rem" height="2rem" color="#FF671F" />
              <Gutter size="0.3125rem" />
              <Body3>Receive</Body3>
            </Box>
          </Column>
          <Column weight={1}>
            <Box alignX="center" alignY="center" paddingY="0.875rem">
              <SendIcon width="2rem" height="2rem" color="#FF671F" />
              <Gutter size="0.3125rem" />
              <Body3>Send</Body3>
            </Box>
          </Column>
          <Column weight={1}>
            <Box alignX="center" alignY="center" paddingY="0.875rem">
              <DepositIcon width="2rem" height="2rem" color="#FF671F" />
              <Gutter size="0.3125rem" />
              <Body3>Deposit</Body3>
            </Box>
          </Column>
        </Columns>
        <Gutter size="1.5rem" />
      </Box>
    </Box>
  );
};
