import { SiCounterstrike, SiEpicgames, SiPubg, SiRiotgames, SiValorant } from "react-icons/si";


export interface MediaLink {
  title: string;
  url: string;
  description: string;
  cover: string; 
}

export const SPOTIFY_PLAYLIST = {
  name: "Beats Bhaji",
  url: "https://open.spotify.com/playlist/37i9dQZF1E4n5kC8r5D2j6",
  cover: "/images/beats-bhaaji.jpg",
};

export const YOUTUBE_PLAYLISTS: MediaLink[] = [
  {
    title: "Monologue",
    url: "https://www.youtube.com/playlist?list=PLl3J1N6NlmXWHeypuizVBSPTR4K7o__Pr",
    description: "a monologue by sadman bhai on life, philosophy, and perception.",
    cover: "/images/yt-playlist.jpg",
  },
];

export const GAMES = [
  { name: "VALORANT", icon: SiValorant },
  { name: "CS2", icon: SiCounterstrike },

  { name: "PUBG PC", icon: SiPubg },
];