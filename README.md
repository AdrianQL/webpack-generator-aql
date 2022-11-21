<div align="center">
    <a href="https://github.com/webpack/webpack-cli">
        <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
    </a>
</div>

<h1 align="center">webpack-generator-aql</h1>
<h4 align="center">Friendly "webpack" command line generator. </h4>

## Table of Contents

- [About](#about)
- [How to install](#how-to-install)

## About
It is possible that when configuring webpack, it can be somewhat tedious. **webpack-generator-aql** provides the ability to create a project based on webpack technology fast, clean and easy.

With a simple command we can generate a project with changes in real time to start a technical test, carry out quick tests as an ideas laboratory or to start projects in a scalable way.

### How to install
To carry out the installation of the generator, the following command must be carried out

```sh
npm i --save-dev webpack-generator-aql
 ```
 > It should be noted that the optimal scenario will be a global installation to be able to use said command anywhere `-g`

Once the command is finished we will have at our disposal the **wpg** command in our preferred terminal.

 ```sh
Usage: wpg <command> [options]

Options:
  -h, --help                     display help for command

Commands:
  init [options] [project-name]  Initialize a new project
  help [command]                 display help for command
 ```

This command contains the **init** action which spawns the project.

 ```sh
wpg init [project-name]
 ```

The init command contains the `help` options and the option to skip folder generation.

```sh

Usage: wpg init [options] [project-name]

Initialize a new project

Arguments:
  project-name          Name of the project

Options:
  -f, --skipped-folder  does not create folder
  -h, --help            display help for command

```


