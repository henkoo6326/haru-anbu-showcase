import React from "react";
import { Composition } from "remotion";
import { HaruAnbuPromo } from "./HaruAnbuPromo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="HaruAnbuPromo"
      component={HaruAnbuPromo}
      durationInFrames={990}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
