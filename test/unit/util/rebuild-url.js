/* eslint import/no-extraneous-dependencies: 0 */

import chai from 'chai';
import rebuildUrl from '../../../src/util/rebuild-url';

const expect = chai.expect;

describe('rebuildUrl()', () => {
  describe('build flags', () => {
    it('should handle minify flag', () => {
      const packages = [];
      const buildFlags = { minify: true, dedupe: false };
      expect(rebuildUrl(packages, buildFlags)).to.equal('/?flags=minify');
    });

    it('should enable minify regardless, if dedupe flag is enabled', () => {
      const packages = [];
      const buildFlags = { minify: false, dedupe: true };
      expect(rebuildUrl(packages, buildFlags)).to.equal('/?flags=dedupe,minify');
    });

    it('should support empty build flags', () => {
      const packages = [];
      expect(rebuildUrl(packages, {})).to.equal('/');
    });
  });

  describe('environment', () => {
    it('should handle empty env correctly', () => {
      const packages = [];
      expect(rebuildUrl(packages, {}, '')).to.equal('/');
    });

    it('should use value if passed', () => {
      const packages = [];
      expect(rebuildUrl(packages, {}, 'dev')).to.equal('/dev/');
      expect(rebuildUrl(packages, {}, 'production')).to.equal('/production/');
    });

    it('should fall back to non-env if anything other than "dev" or "prod" used', () => {
      const packages = [];
      expect(rebuildUrl(packages, {}, 'x')).to.equal('/');
    });
  });

  describe('expansion', () => {
    it('should expand single package name + version correctly', () => {
      const packages = [{ pkgName: 'ak-button', pkgVersion: 'latest' }];
      expect(rebuildUrl(packages, {})).to.equal('/?ak-button');
    });

    it('should expand multiple package names + versions correctly', () => {
      const packages = [
        { pkgName: 'ak-button', pkgVersion: 'latest' },
        { pkgName: 'ak-icon', pkgVersion: '1.x' },
      ];
      expect(rebuildUrl(packages, {})).to.equal('/?ak-button,ak-icon@1.x');
    });

    it('should remove @latest from package if latest supplied', () => {
      const packages = [{ pkgName: 'ak-button', pkgVersion: 'latest' }];
      expect(rebuildUrl(packages, {})).to.equal('/?ak-button');
    });
  });

  it('should preserve package order', () => {
    const packages = [
      { pkgName: 'ak-zephyr', pkgVersion: 'latest' },
      { pkgName: 'ak-icon', pkgVersion: '1.x' },
      { pkgName: 'ak-button', pkgVersion: 'latest' },
    ];
    expect(rebuildUrl(packages, {})).to.equal('/?ak-zephyr,ak-icon@1.x,ak-button');
  });
});
