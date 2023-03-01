const idRe = new RegExp('vk_user_id=\\d*');

export const getId = (params) => {
  return parseInt(idRe.exec(atob(params))[0].slice(11));
};
