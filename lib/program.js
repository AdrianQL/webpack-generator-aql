import { Command } from 'commander';
import { PROGRAM } from './enum/enums.js';

function getNewProgram() {
  return new Command();
}

function setParams(program = {}) {
  program.name(PROGRAM.NAME).usage(PROGRAM.USAGE);
}

function getParams() {
  return {
    name: PROGRAM.NAME,
    usage: PROGRAM.USAGE
  };
}

export { getNewProgram, setParams, getParams };
