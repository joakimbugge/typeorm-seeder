module.exports = {
  branches: ['main', 'next', { name: 'beta', prerelease: true }],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [{ type: 'build', scope: 'deps', release: 'patch' }],
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          types: [
            { type: 'feat', section: 'Features' },
            { type: 'fix', section: 'Bug fixes' },
            { type: 'build', scope: 'deps', section: 'Dependencies' },
          ],
        },
      },
    ],
    '@semantic-release/changelog',
    ['@semantic-release/npm', { pkgRoot: 'dist' }],
    '@semantic-release/github',
    ['@semantic-release/git', { assets: ['CHANGELOG.md'] }],
  ],
};
