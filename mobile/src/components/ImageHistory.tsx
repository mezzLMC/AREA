/**
 * @jest-environment node
 */
 /* eslint-disable */

import discordPng from "../../assets/images/brandIcons/discord.png";
import spotifyPng from "../../assets/images/brandIcons/spotify.png";
import teamsPng from "../../assets/images/brandIcons/teams.png";
import youtubePng from "../../assets/images/brandIcons/youtube.png";
import twitchPng from "../../assets/images/brandIcons/twitch.png";

const imageMapHist: Record<string, any> = {
  "https://upload.wikimedia.org/wikipedia/fr/4/4f/Discord_Logo_sans_texte.svg": discordPng,
  "https://cdn.iconscout.com/icon/free/png-256/spotify-11-432546.png": spotifyPng,
  "https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg": teamsPng,
  youtube: youtubePng,
  "/images/twitch-purple.svg": twitchPng,
};

export default imageMapHist;