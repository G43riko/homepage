module.exports = {
    staticFileGlobs: [
        'dist/**.html',
        'dist/**.js',
        'dist/**.css',
        'dist/assets/images/*',
        'dist/assets/favicons/*'
    ],
    root: 'dist',
    stripPrefix: 'dist/',
    navigateFallback: './index.html'
};
