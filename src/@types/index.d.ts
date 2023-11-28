export {};

declare global {
  interface Window {
    onMetaWidget: import('../typings/onMetaWidgetTypes').onMetaWidgetModule;
  }
}
