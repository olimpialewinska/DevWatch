import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
     video: false,
    viewportHeight: 1080,
    viewportWidth: 1920,
  },
});
