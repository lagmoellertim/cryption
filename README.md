<h1 align="center">Cryption</h1>

*<p align="center">In-Browser AES File Encryption with Data Integrity Check</p>*

<p align="center">
  <a href="https://github.com/lagmoellertim/cryption/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat"/></a>
  <a href="https://cloud.drone.io/lagmoellertim/cryption"><img src="https://cloud.drone.io/api/badges/lagmoellertim/cryption/status.svg"/></a>
  <a href="https://app.codacy.com/app/lagmoellertim/cryption?utm_source=github.com&utm_medium=referral&utm_content=lagmoellertim/cryption&utm_campaign=Badge_Grade_Dashboard"><img src="https://api.codacy.com/project/badge/Grade/b674afd5204e48a7b1e39d47728c8a3d"/></a>
</p>

<p align="center">
  <a href="https://cryption.pw">Website</a>
</p>

---

## Introduction

Cryption is an **open-source tool** that **encrypts and decrypts** your data in the browser.

It does **not** upload data to any **cloud**.

It checks the **file integrity**, making it **impossible to manipulate data** without the correct password.

You can also **give hints** in order to  remeber your **password**.

If you want to,  you could download Cryption and use it fully functional **offline on your computer**.

### Usage

![](screen.gif)

### Usage Information

To use Cryption as it was intentioned, I advice you to use **Firefox**. Both Chrome and Safari will crash when files get big (>25 MB), while Firefox managed to encrypt and decrypt files larger then 100 MB. It was also the fastest, but nonetheless, every browser **should** work

If you want to upload a directory, consider **zipping** it before uploading, since JavaScript cannot handle directory uploads. You can, however, upload multiple files, which Cryption then **bundles** to a zip-archive automatically.


### Prerequisites

- [Node.js](https://nodejs.org/) >= 10
- npm >= 5

### Installation

```sh
# Clone the repository (stable branch)
git clone -b master https://github.com/lagmoellertim/cryption.git cryption

#Change Directory
cd cryption

# Install npm packages
npm install

# Start a local server
npm start
```

### Build

```sh
# Clone the repository (stable branch)
git clone -b master https://github.com/lagmoellertim/cryption.git cryption

#Change Directory
cd cryption

# Install npm packages
npm install

# Build the app 
npm run-script build
```

### Use on local machine without internet

Download the latest build.zip file from the [Cryption releases](https://github.com/lagmoellertim/cryption/releases/latest).

After unzipping it, you can just open the index.html file with your browser, no need to put it on a server!

## Contributing

If you are missing a feature or have new idea, go for it! That is what open-source is for!

## Author

**Tim-Luca Lagmöller** ([@lagmoellertim](https://github.com/lagmoellertim))

## Donate

You can also contribute by [buying me a coffee](http://donate.lagmoellertim.de).

## License

[MIT License](https://github.com/lagmoellertim/cryption/blob/master/LICENSE)

Copyright © 2019-present, [Tim-Luca Lagmöller](https://en.lagmoellertim.de)

## Have fun :tada:
