exports.config = {
  projectRoot: "src/app",
  routes: {
    '/posts/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./src"
      }
    },
  }
};
