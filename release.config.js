module.exports = {
  branches: ['main', 'next', { name: 'beta', prerelease: true }],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    ['@semantic-release/npm', { pkgRoot: 'dist' }],
    '@semantic-release/github',
    ['@semantic-release/git', { assets: ['CHANGELOG.md'] }],
  ],
};
