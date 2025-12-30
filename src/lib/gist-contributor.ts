export interface GistContributor {
  name: string;
  avatar: string;
  website: string;
}

export const GIST_CONTRIBUTORS: GistContributor[] = [
  {
    name: "Avi",
    avatar: "/avatar/avatar.png",
    website: "https://yoavi.fun",
  },
  {
    name: "Jane Smith",
    avatar: "https://avatars.githubusercontent.com/janesmith",
    website: "https://janesmith.com",
  },
];