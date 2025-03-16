/**
 * @jest-environment node
 */
 /* eslint-disable */

import { ImageSourcePropType } from "react-native";
import discordPng from "../../assets/images/brandIcons/discord.png";
import spotifyPng from "../../assets/images/brandIcons/spotify.png";
import teamsPng from "../../assets/images/brandIcons/teams.png";
import youtubePng from "../../assets/images/brandIcons/youtube.png";
import twitchPng from "../../assets/images/brandIcons/twitch.png";

const imageMap: Record<string, ImageSourcePropType> = {
  discord: discordPng,
  spotify: spotifyPng,
  teams: teamsPng,
  youtube: youtubePng,
  twitch: twitchPng,
};

export default imageMap;