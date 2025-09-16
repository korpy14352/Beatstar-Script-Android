import { unlockCustomSongs } from "../utilities/unlockCustomSongs";

export const hookSupportButton = async () => {
  const assembly = Il2Cpp.domain.assembly("Assembly-CSharp").image;

  assembly
    .class("OptionsDialog")
    .method("SupportButtonPressed").implementation = async function () {
    unlockCustomSongs();
  };
};
