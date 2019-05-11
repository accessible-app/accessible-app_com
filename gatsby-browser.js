// gatsby-browser.js

export const onClientEntry = async () => {
  await import(`focus-visible`);
};
