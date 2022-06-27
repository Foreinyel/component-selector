import * as utils from "@hemyn/utils-web";

export const findComponents = async () => {
  const res = await utils.rGet(`/api/component/list`);
  return res;
};
