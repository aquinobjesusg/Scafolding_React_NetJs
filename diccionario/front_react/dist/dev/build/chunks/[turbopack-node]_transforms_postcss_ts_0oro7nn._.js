module.exports = [
"[turbopack-node]/transforms/postcss.ts?config=[project]/front_react/postcss.config.mjs { CONFIG => \"[project]/front_react/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "chunks/0_g5_0oe-vs8._.js",
  "chunks/[root-of-the-server]__088q-vg._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts?config=[project]/front_react/postcss.config.mjs { CONFIG => \"[project]/front_react/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];