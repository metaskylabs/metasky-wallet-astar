const breakpoints = [576, 768, 992, 1200, 1400, 429];

const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);
const mqMinWidth = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);
const mqMaxHeight = breakpoints.map((bp) => `@media (max-height: ${bp}px)`);

export { mq, mqMinWidth, mqMaxHeight };
