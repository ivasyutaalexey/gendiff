# Gendiff
[![Maintainability](https://api.codeclimate.com/v1/badges/a0cb5d95277e3cf095f0/maintainability)](https://codeclimate.com/github/ivasyutaalexey/gendiff/maintainability)
[![Build Status](https://travis-ci.org/ivasyutaalexey/gendiff.svg?branch=master)](https://travis-ci.org/ivasyutaalexey/gendiff)

## Installation

```bash
npm install -g ai-gendiff
```

Available formats of config files: .yml, .json, .ini.\
Available output formats: plain, tree, json (tree as default). 

## Run

Compare config files with output format 'tree'
```
gendiff before.json after.json
```
[![asciicast](https://asciinema.org/a/5SbDMSkJJpkiCI1ury4aKN3Zs.svg)](https://asciinema.org/a/5SbDMSkJJpkiCI1ury4aKN3Zs)

Compare config files with output format 'plain'

```
gendiff before.json after.json -f plain
```
[![asciicast](https://asciinema.org/a/5XFs6pZnpvvRaotbGEeYEihQA.svg)](https://asciinema.org/a/5XFs6pZnpvvRaotbGEeYEihQA)


Compare config files with output format 'plain'

```
gendiff before.json after.json -f json
```
[![asciicast](https://asciinema.org/a/cc9P7wYaHeoL52WFaDqFkdFT2.svg)](https://asciinema.org/a/cc9P7wYaHeoL52WFaDqFkdFT2)