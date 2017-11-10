# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]
- Update tests and example to React 16
- Package Updates
- Use prettierrc.js

## [3.0.1] - 2017-07-13
### Changed
- Add React v16 to peerDependencies
- Package Updates

## [3.0.0] - 2017-05-31
### Added
- Re-added Automatic "early input" handling when ``onEarlyInput`` does not exist.

## [2.0.0] - 2017-05-31
### Added
- Added ``onEarlyInput``. See docs/examples. Thanks to [@vitalyq](https://github.com/vitalyq/) for the idea. See [vitalyq/react-trigger-change#1 (comment)](https://github.com/vitalyq/react-trigger-change/issues/1#issuecomment-303457141)

### Removed
- Automatic "early input" handling (replaced with ``onEarlyInput``)
- ``<Textarea />``

### Fixed
- ``type="radio"`` and ``type="checkbox"`` early input detection
