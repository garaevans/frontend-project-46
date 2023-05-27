# Difference Calculator

[![Actions Status](https://github.com/garaevans/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/garaevans/frontend-project-46/actions)
[![Node CI](https://github.com/garaevans/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/garaevans/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/c21084f26eef46716819/maintainability)](https://codeclimate.com/github/garaevans/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c21084f26eef46716819/test_coverage)](https://codeclimate.com/github/garaevans/frontend-project-46/test_coverage)

The Difference calculator is a program that determines the difference between two data structures.

Utility features:
- Supported input formats: yaml/yml, json
- Three output formats: plain, stylish, and json

## System Requirements
- Node.js 16.0.0 or newer

## Setup

```bash
git clone git@github.com:garaevans/frontend-project-46.git
cd frontend-project-46
make install
npm link
```

## Usage

```bash
gendiff [options] <filepath1> <filepath2>

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command
```

### Comparing two JSON files
[![asciicast](https://asciinema.org/a/bXgu6v3IS9pJNeVJbbiIeA1lh.svg)](https://asciinema.org/a/bXgu6v3IS9pJNeVJbbiIeA1lh)

### Comparing two YAML files
[![asciicast](https://asciinema.org/a/cAOJCI99isWC0yopY68CGBVWU.svg)](https://asciinema.org/a/cAOJCI99isWC0yopY68CGBVWU)

### Stylish output format (default)
[![asciicast](https://asciinema.org/a/Ent9PTDfYeuvNUxpHUJ4hVU8R.svg)](https://asciinema.org/a/Ent9PTDfYeuvNUxpHUJ4hVU8R)

### Plain output format
[![asciicast](https://asciinema.org/a/HIY1tMhiMTVbPUq18XycchlPq.svg)](https://asciinema.org/a/HIY1tMhiMTVbPUq18XycchlPq)

### JSON output format
[![asciicast](https://asciinema.org/a/8YK305uhjZq7ogpeVQJO5T7zn.svg)](https://asciinema.org/a/8YK305uhjZq7ogpeVQJO5T7zn)