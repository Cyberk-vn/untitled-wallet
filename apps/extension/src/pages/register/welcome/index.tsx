import React, { FunctionComponent, useEffect, useRef } from "react";
import lottie from "lottie-web";
import CheckCircleAnim from "../../../public/assets/lottie/register/welcome-check-circle-icon.json";
import { RegisterSceneBox } from "../components/register-scene-box";
import { Box } from "../../../components/box";
import { H1 } from "../../../components/typography";
import { Button } from "../../../components/button";
import { useIntl } from "react-intl";

export const RegisterWelcomeScene: FunctionComponent = () => {
  const intl = useIntl();

  const animContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (animContainerRef.current) {
      const anim = lottie.loadAnimation({
        container: animContainerRef.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: CheckCircleAnim,
      });

      return () => {
        anim.destroy();
      };
    }
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${require("../../../public/assets/img/register/register-success-bg.png")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <RegisterSceneBox>
        <Box height="35rem">
          <Box
            position="relative"
            style={{
              flex: 1,
              textAlign: "center",
              lineHeight: 1.25,
            }}
            paddingTop="4rem"
          >
            <Box alignX="center" alignY="center" position="relative">
              <div
                ref={animContainerRef}
                style={{
                  width: "17.5rem",
                  height: "17.5rem",
                }}
              />
              <Box
                position="absolute"
                style={{
                  top: "12rem",
                }}
              >
                <H1 style={{}}>Wallet Created Successfully!</H1>
              </Box>
            </Box>
          </Box>
          <Button
            text={intl.formatMessage({
              id: "pages.register.welcome.finish-button",
            })}
            onClick={() => {
              window.close();
            }}
          />
        </Box>
      </RegisterSceneBox>
    </div>
  );
};
