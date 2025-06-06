import { createZkNoidGameConfig } from "@zknoid/sdk/lib/createConfig";
import { ZkNoidGameType } from "@zknoid/sdk/lib/platform/game_types";
import {
  ZkNoidGameFeature,
  ZkNoidGameGenre,
} from "@zknoid/sdk/lib/platform/game_tags";
import GameTemplate from "./GameTemplate";

const description = "BoughtModal description";
const rules = "BoughtModal rules";

export const gameTemplateConfig = createZkNoidGameConfig({
  id: "game-template",
  type: ZkNoidGameType.SinglePlayer,
  name: "Game Template",
  description: description,
  image: "/image/games/soon.svg",
  genre: ZkNoidGameGenre.BoardGames,
  features: [ZkNoidGameFeature.SinglePlayer],
  isReleased: true,
  releaseDate: new Date(2000, 1, 1),
  popularity: 0,
  author: "ZkNoid Team",
  rules: rules,
  runtimeModules: {},
  page: GameTemplate,
});
