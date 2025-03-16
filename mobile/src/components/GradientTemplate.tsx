import React from "react";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import {StatusBar} from "react-native";

const GradientTemplate = () => (
    <Svg height="1000" width="400" style={[{position: "absolute"}]}>
      <StatusBar barStyle="light-content"/>
      <Defs>
        <RadialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <Stop offset="0%" stopColor="rgba(191, 0, 255, 1)" stopOpacity="1" />
          <Stop offset="100%" stopColor="rgba(191, 0, 255, 0)" stopOpacity="0" />
        </RadialGradient>
        <RadialGradient id="grad2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <Stop offset="0%" stopColor="rgba(85, 0, 255, 1)" stopOpacity="1" />
          <Stop offset="100%" stopColor="rgba(85, 0, 255, 0)" stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Circle cx="-70" cy="50" r="300" fill="url(#grad1)" />
      <Circle cx="500" cy="800" r="300" fill="url(#grad2)" />
    </Svg>
  );

export default GradientTemplate;
