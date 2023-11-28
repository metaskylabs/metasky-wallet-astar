export const APP_ID = process.env.NEXT_PUBLIC_INTERCOM_APP_ID;

const intercomHide = () => {
  (window as any)?.Intercom(`hide`);
};

const load = () => {
  (function () {
    const w = window as any;
    const ic = w.Intercom;
    if (typeof ic === `function`) {
      ic(`reattach_activator`);
      ic(`update`, w.intercomSettings);
    } else {
      const d = document;
      const i: any = function (...args: any) {
        i.c(args);
      };
      i.q = [];
      i.c = function (args: any) {
        i.q.push(args);
      };
      w.Intercom = i;
      const l = function () {
        const s = d.createElement(`script`);
        s.type = `text/javascript`;
        s.async = true;
        s.src = `https://widget.intercom.io/widget/` + APP_ID;
        const x: any = d.getElementsByTagName(`script`)[0];
        x && x.parentNode.insertBefore(s, x);
      };
      if (document.readyState === `complete`) {
        l();
      } else if (w.attachEvent) {
        w.attachEvent(`onload`, l);
      } else {
        w.addEventListener(`load`, l, false);
      }
    }
  })();
  intercomHide();
};

// Initializes Intercom
const boot = (options = {}) => {
  (window as any)?.Intercom(`boot`, { app_id: APP_ID, ...options });
};

const update = (status: any) => {
  (window as any)?.Intercom(`update`, {
    hide_default_launcher: status,
  });
};

const show = () => {
  (window as any)?.Intercom(`show`);
};

const intercomUnreadCount = (callback: any) => {
  (window as any)?.Intercom(`onUnreadCountChange`, function (unreadCount: any) {
    callback(unreadCount);
  });
};

const intercomOnHide = (cb: any) => {
  (window as any)?.Intercom(`onHide`, function () {
    cb();
  });
};
