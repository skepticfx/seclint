# seclint
A simple linter to warn about javascript dom issues et al.

## What is this?

Lets say you are security reviewing a single JavaScript file or a folder full of *.js files.
Most often you would want to just know the unsafe API usages and then dig your own way into finding security issues(if at all it exists)

Seclint tries to do that for Javascript with the vanilla DOM, React and Angular.
The table below lists the unsafe APIs which most often leads you to discovering vulnerabilities.


## Installation

```
npm install -g seclint
```

## Usage

```
seclint <js-folder>
```

## TODO

* Configure options through a file
* Add React, Angular unsafe usages


## Current tests

| API Name | Tips | Example Usage |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------|
| jQuery Append | Most often this is used for legitimate purposes. However, there are instances when a developer might accidentally assign unsafe inputs here. This tool tries to reduce the false positives by doing simple heuristics, but no taint analysis.The Return on Investment is not that great.  | $(some_div).append(some_$_div) |
| jQuery HTML | This is similar to jQuery Append  | $(some_div).html(some_$_div) |



