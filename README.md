# Chromium Binaries for AWS Lambda

This repository provides Chromium binaries compiled for AWS Lambda, compatible and tested with Playwright and Puppeteer. 

We offer both `ARM_64` and `X86_64` binaries, as well as support for both Amazon Linux 2 (NodeJS 16 & 18) and Amazon Linux 2023 (NodeJS 20+).

## Installation

No need to add additional NPM packages to your project! 

Simply configure environment variables and Playwright/Puppeteer will automatically download our Lambda-compatible binaries. Alternatively, you can download our binaries manually.

## Usage

For automatic installation, set environment variables and Playwright/Puppeteer will automatically download compatible binaries ([examples](#examples-automatic-installation)). For manual installation, download the zip file containing Chromium and it's required dependencies and upload to Lambda yourself.

## Examples (automatic installation)

### Usage with Playwright
Configure the following environment variables.
```bash
PLAYWRIGHT_CHROMIUM_DOWNLOAD_HOST=https://files.chromiumforlambda.org/arm64 # (if you're on ARM64)
PLAYWRIGHT_CHROMIUM_DOWNLOAD_HOST=https://files.chromiumforlambda.org/x86_64 # (if you're on x86_64)
PLAYWRIGHT_BROWSERS_PATH=/tmp
XDG_CACHE_HOME=/tmp
HOME=/tmp
```

```javascript
// Make sure that:
// - You're using a supported Playwright version (see https://github.com/chromium-for-lambda/binaries?tab=readme-ov-file#versioning).
// - You've set process.env.PLAYWRIGHT_CHROMIUM_DOWNLOAD_HOST to https://files.chromiumforlambda.org/arm64 or https://files.chromiumforlambda.org/x86_64
// - You've set the other environment variables above.

import { chromium } from "playwright-core";

export const handler = async () => {
  const install = require('playwright-core/lib/server').installBrowsersForNpmInstall;
  await install(['chromium']);

  const browser = await chromium.launch({
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--single-process'],
  });

  const page = await browser.newPage();

  // your Playwright code as usual
}

```

### Usage with Puppeteer
Configure the following environment variables.
```bash
PUPPETEER_DOWNLOAD_BASE_URL=https://files.chromiumforlambda.org/arm64 # (if you're on ARM64))
PUPPETEER_DOWNLOAD_BASE_URL=https://files.chromiumforlambda.org/x86_64 # (if you're on x86_64))
XDG_CACHE_HOME=/tmp
PUPPETEER_CACHE_DIR=/tmp
HOME=/tmp
```

```javascript
// Make sure that:
// - You're using a supported Puppeteer version (see https://github.com/chromium-for-lambda/binaries?tab=readme-ov-file#versioning).
// - You've set process.env.PUPPETEER_DOWNLOAD_BASE_URL to https://files.chromiumforlambda.org/arm64 or https://files.chromiumforlambda.org/x86_64
// - You've set the other environment variables above.

import puppeteer from "puppeteer";

export const handler = async () => {
  const install = require(`puppeteer/internal/node/install.js`).downloadBrowser;
  await install()

  const browser = await puppeteer.launch({
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--single-process', '--no-sandbox'],
    headless: 'shell'
    // headless: true // use this instead if you're using Puppeteer < 22
  });

  const page = await browser.newPage();

  // your Puppeteer code as usual
}
```

## Versioning

We aim to release compatible Chromium versions as soon as possible after official releases. However, compiling, and testing isn't free. We therefore only offer the binaries from at least 5 major versions ago for free.

| Chromium Version | Compatible Playwright Versions | Compatible Puppeteer Versions | ARM Download | X86 Download |
| --- | --- | --- | --- | --- |
| `126.0.6478` |  | `v22.11.0`, `v22.11.1`, `v22.11.2` | [Request AL2](mailto:hi@chromiumforlambda.org?subject=Please%20compile%20Chromium%20126.0.6478%20for%20AL2%20(ARM64)!)\*<br/>[Request AL2023](mailto:hi@chromiumforlambda.org?subject=Please%20compile%20Chromium%20126.0.6478%20for%20AL2023%20(ARM64)!)\* | [Request AL2](mailto:hi@chromiumforlambda.org?subject=Please%20compile%20Chromium%20126.0.6478%20for%20AL2%20(X86)!)\*<br/>[Request AL2023](mailto:hi@chromiumforlambda.org?subject=Please%20compile%20Chromium%20126.0.6478%20for%20AL2023%20(X86)!)\* | 
| `125.0.6422` | `v1.44.0`, `v1.44.1` | `v22.10.0`, `v22.10.1`, `v22.9.0` | [Request AL2](mailto:hi@chromiumforlambda.org?subject=Please%20compile%20Chromium%20125.0.6422%20for%20AL2%20(ARM64)!)\*<br/>[Request AL2023](mailto:hi@chromiumforlambda.org?subject=Please%20compile%20Chromium%20125.0.6422%20for%20AL2023%20(ARM64)!)\* | [Request AL2](mailto:hi@chromiumforlambda.org?subject=Please%20compile%20Chromium%20125.0.6422%20for%20AL2%20(X86)!)\*<br/>[Request AL2023](mailto:hi@chromiumforlambda.org?subject=Please%20compile%20Chromium%20125.0.6422%20for%20AL2023%20(X86)!)\* | 
| `124.0.6367` | `v1.43.0`, `v1.43.1` | `v22.7.0`, `v22.7.1`, `v22.8.0`, `v22.8.1`, `v22.8.2` | [Request AL2](mailto:hi@chromiumforlambda.org?subject=Please%20compile%20Chromium%20124.0.6367%20for%20AL2%20(ARM64)!)\*<br/>[Request AL2023](mailto:hi@chromiumforlambda.org?subject=Please%20compile%20Chromium%20124.0.6367%20for%20AL2023%20(ARM64)!)\* | [Request AL2](mailto:hi@chromiumforlambda.org?subject=Please%20compile%20Chromium%20124.0.6367%20for%20AL2%20(X86)!)\*<br/>[Request AL2023](mailto:hi@chromiumforlambda.org?subject=Please%20compile%20Chromium%20124.0.6367%20for%20AL2023%20(X86)!)\* | 
| `123.0.6312` | `v1.42.0`, `v1.42.1` | `v22.6.0`, `v22.6.1`, `v22.6.2`, `v22.6.3`, `v22.6.4`, `v22.6.5` | [Request AL2](mailto:hi@chromiumforlambda.org?subject=Please%20compile%20Chromium%20123.0.6312%20for%20AL2%20(ARM64)!)\*<br/>[Request AL2023](mailto:hi@chromiumforlambda.org?subject=Please%20compile%20Chromium%20123.0.6312%20for%20AL2023%20(ARM64)!)\* | [Request AL2](mailto:hi@chromiumforlambda.org?subject=Please%20compile%20Chromium%20123.0.6312%20for%20AL2%20(X86)!)\*<br/>[Request AL2023](mailto:hi@chromiumforlambda.org?subject=Please%20compile%20Chromium%20123.0.6312%20for%20AL2023%20(X86)!)\* | 
| `122.0.6261` |  | `v22.2.0`, `v22.3.0`, `v22.4.0`, `v22.4.1`, `v22.5.0` | [Request AL2](mailto:hi@chromiumforlambda.org?subject=Please%20compile%20Chromium%20122.0.6261%20for%20AL2%20(ARM64)!)\*<br/>[Request AL2023](mailto:hi@chromiumforlambda.org?subject=Please%20compile%20Chromium%20122.0.6261%20for%20AL2023%20(ARM64)!)\* | [Request AL2](mailto:hi@chromiumforlambda.org?subject=Please%20compile%20Chromium%20122.0.6261%20for%20AL2%20(X86)!)\*<br/>[Request AL2023](mailto:hi@chromiumforlambda.org?subject=Please%20compile%20Chromium%20122.0.6261%20for%20AL2023%20(X86)!)\* | 
| `121.0.6167` | `v1.41.0`, `v1.41.1`, `v1.41.2` | `v21.10.0`, `v21.11.0`, `v21.9.0`, `v22.0.0`, `v22.1.0` | [Download AL2](https://github.com/chromium-for-lambda/binaries/releases/tag/arm64-amazon-linux-2-chromium-121.0.6167)<br/>[Request AL2023](https://github.com/chromium-for-lambda/binaries/issues/new?title=Please%20compile%20Chromium%20121.0.6167%20for%20AL2023%20(ARM64)!) | [Request AL2](https://github.com/chromium-for-lambda/binaries/issues/new?title=Please%20compile%20Chromium%20121.0.6167%20for%20AL2%20(X86)!)<br/>[Request AL2023](https://github.com/chromium-for-lambda/binaries/issues/new?title=Please%20compile%20Chromium%20121.0.6167%20for%20AL2023%20(X86)!) | 
| `120.0.6099` | `v1.40.0`, `v1.40.1` | `v21.8.0` | [Download AL2](https://github.com/chromium-for-lambda/binaries/releases/tag/arm64-amazon-linux-2-chromium-120.0.6099)<br/>[Request AL2023](https://github.com/chromium-for-lambda/binaries/issues/new?title=Please%20compile%20Chromium%20120.0.6099%20for%20AL2023%20(ARM64)!) | [Request AL2](https://github.com/chromium-for-lambda/binaries/issues/new?title=Please%20compile%20Chromium%20120.0.6099%20for%20AL2%20(X86)!)<br/>[Request AL2023](https://github.com/chromium-for-lambda/binaries/issues/new?title=Please%20compile%20Chromium%20120.0.6099%20for%20AL2023%20(X86)!) | 

<sup>* The 5 newest Chromium releases require a [pro subscription or a one-time payment](https://pro.chromiumforlambda.org).</sup>

## Support

We thoroughly test our binaries before publishing. But feel free to [create an issue](https://github.com/chromium-for-lambda/binaries/issues) if you experience unexpected behaviour.

## FAQ
### What is the difference between automatic and manual installation?
Automatic installation uses environment variables to configure Playwright/Puppeteer to download Lambda-compatible binaries. Manual installation requires downloading the zip file containing required dependencies and uploading to Lambda manually.

### Why are there different Chromium binaries for Amazon Linux 2 (AL2) and Amazon Linux 2023 (AL2023)?
The Chromium binaries for Amazon Linux 2 (AL2) and Amazon Linux 2023 (AL2023) are different because they are compiled with different versions of the Linux kernel and dependencies. 

The main differences are:
- Kernel version: AL2 is based on the 4.14 kernel, while AL2023 is based on the 5.10 kernel. This means that the AL2023 binaries are compiled with a newer kernel version, which can provide better support for newer hardware and features.
- Dependency versions: The dependencies used to build the Chromium binaries, such as glibc, libstdc++, and other libraries, are also different between AL2 and AL2023. These differences can affect the compatibility and functionality of the Chromium browser.

### Which version should I download?
If you are using Amazon Linux 2 (AL2), you should download the Chromium binaries specifically compiled for AL2. If you are using Amazon Linux 2023 (AL2023), you should download the Chromium binaries specifically compiled for AL2023.

If you're using Node.js, please note that:
- The Node.js 16 and 18 Lambda runtimes are using Amazon Linux 2 (AL2)
- The Node.js 20 runtime is using Amazon Linux 2023 (AL2023)
