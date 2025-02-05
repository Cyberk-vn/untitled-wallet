import React, {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { RegisterSceneBox } from "../components/register-scene-box";
import { Button } from "../../../components/button";
import {
  useFixedWidthScene,
  useSceneEvents,
  useSceneTransition,
  VerticalResizeTransition,
} from "../../../components/transition";
import { TextInput } from "../../../components/input";
import { XAxis } from "../../../components/axis";
import { Styles } from "./styles";
import { Gutter } from "../../../components/gutter";
import { Bleed } from "../../../components/bleed";
import { Box } from "../../../components/box";
import { Mnemonic } from "@titan-wallet/crypto";
import { useBIP44PathState } from "../components/bip-44-path";
import { observer } from "mobx-react-lite";
import lottie from "lottie-web";
import AnimSeed from "../../../public/assets/lottie/register/seed.json";
import { useRegisterHeader } from "../components/header";
import { WarningBox } from "../../../components/warning-box";
import { CopyToClipboard } from "../components/copy-to-clipboard";
import { useIntl } from "react-intl";
import { useTheme } from "styled-components";

type WordsType = "12words" | "24words";

export const NewMnemonicScene: FunctionComponent = observer(() => {
  const intl = useIntl();

  const header = useRegisterHeader();
  useSceneEvents({
    onWillVisible: () => {
      header.setHeader({
        mode: "step",
        title: intl.formatMessage({ id: "pages.register.new-mnemonic.title" }),
        stepCurrent: 1,
        stepTotal: 3,
      });
    },
  });

  const seedAnimDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (seedAnimDivRef.current) {
      const anim = lottie.loadAnimation({
        container: seedAnimDivRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: AnimSeed,
      });

      return () => {
        anim.destroy();
      };
    }
  }, []);

  const [policyDelayRemaining, setPolicyDelayRemaining] = useState(3000);
  const [policyVerified, setPolicyVerified] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPolicyDelayRemaining((v) => Math.max(v - 1000, 0));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const sceneTransition = useSceneTransition();

  // const [wordsType, setWordsType] = useState<WordsType>("12words");
  const wordsType: WordsType = "12words";

  const fixedWidthScene = useFixedWidthScene();
  useEffect(() => {
    // if (wordsType === "24words") {
    //   fixedWidthScene.setWidth("41.5rem");
    // } else
    {
      fixedWidthScene.setWidth(undefined);
    }
  }, [fixedWidthScene, wordsType]);

  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    const rng = (array: any) => {
      return Promise.resolve(crypto.getRandomValues(array));
    };

    if (wordsType === "12words") {
      Mnemonic.generateSeed(rng, 128).then((str) => setWords(str.split(" ")));
    } else if (wordsType === "24words") {
      Mnemonic.generateSeed(rng, 256).then((str) => setWords(str.split(" ")));
    } else {
      throw new Error(`Unknown words type: ${wordsType}`);
    }
  }, [wordsType]);

  const bip44PathState = useBIP44PathState();

  return (
    <RegisterSceneBox>
      <Box position="relative">
        {!policyVerified ? (
          <BlurBackdrop>
            <div
              style={{ width: "10rem", height: "10rem" }}
              ref={seedAnimDivRef}
            />
          </BlurBackdrop>
        ) : null}
        <Gutter size="1rem" />
        <Bleed left="1rem">
          <VerticalResizeTransition>
            <Styles.WordsGridContainer columns={3}>
              {words.map((word, i) => {
                return (
                  <XAxis key={i} alignY="center">
                    <Styles.IndexText>{i + 1}.</Styles.IndexText>
                    <TextInput
                      value={word}
                      readOnly={true}
                      borderRadius="0.5rem"
                    />
                  </XAxis>
                );
              })}
            </Styles.WordsGridContainer>
            <Gutter size="1rem" />
          </VerticalResizeTransition>
        </Bleed>

        <CopyToClipboard text={words.join(" ")} />
      </Box>
      <Gutter size="1.625rem" />

      <Box>
        <WarningBox
          title={intl.formatMessage({
            id: "pages.register.new-mnemonic.recovery-warning-box-title",
          })}
          paragraph={intl.formatMessage({
            id: "pages.register.new-mnemonic.recovery-warning-box-paragraph",
          })}
        />

        <Gutter size="0.875rem" />

        <WarningBox
          title={intl.formatMessage({
            id: "pages.register.new-mnemonic.back-up-warning-box-title",
          })}
          paragraph={intl.formatMessage({
            id: "pages.register.new-mnemonic.back-up-warning-box-paragraph",
          })}
        />
      </Box>

      <Gutter size="2rem" />
      <Box width="100%" marginX="auto">
        {policyVerified ? (
          <Button
            text={intl.formatMessage({
              id: "button.next",
            })}
            onClick={() => {
              if (words.join(" ").trim() !== "") {
                sceneTransition.push("verify-mnemonic", {
                  mnemonic: words.join(" "),
                  bip44Path: bip44PathState.getPath(),
                  stepPrevious: 1,
                  stepTotal: 3,
                });
              }
            }}
          />
        ) : (
          <Button
            text={`${intl.formatMessage({
              id: "pages.register.new-mnemonic.agree-button",
            })} ${
              policyDelayRemaining > 0
                ? ` (${Math.ceil(policyDelayRemaining / 1000)})`
                : ""
            }`}
            disabled={policyDelayRemaining > 0}
            onClick={() => {
              setPolicyVerified(true);
            }}
          />
        )}
      </Box>
    </RegisterSceneBox>
  );
});

const BlurBackdrop: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();

  return (
    <div
      style={{
        position: "absolute",
        top: "-1.5rem",
        bottom: 0,
        left: "-1rem",
        right: "-1rem",
        backgroundImage: `url(${require(theme.mode === "light"
          ? "../../../public/assets/img/register-new-recovery-phrase-blur-light.png"
          : "../../../public/assets/img/register-new-recovery-phrase-blur.png")})`,
        backgroundSize: "cover",
        borderRadius: "1rem",
        zIndex: 1000,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};
