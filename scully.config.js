exports.config = {
  projectRoot: "src/app",
  routes: {
    '/posts/:slug': {
      type: 'contentFolder',
      slug: {
        folder: "./markdown/posts"
      }
    },
  }
};
