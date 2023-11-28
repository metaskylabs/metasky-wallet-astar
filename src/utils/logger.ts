let SHOW_LOGS = false;
if (process.env.NODE_ENV === `development`) {
  SHOW_LOGS = true;
}
export const Logger = {
  debug: function (...msg: any) {
    if (SHOW_LOGS) {
      console.log(msg);
    }
  },
  error: function (...err: any) {
    if (SHOW_LOGS) {
      console.error(err);
    }
  },
};
