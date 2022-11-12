#!/usr/bin/env node
import { getNewProgram, setParams } from '../lib/program.js';
import { setInitCommand } from '../lib/commands.js';

(function init() {
  const program = getNewProgram();

  setParams(program);
  setInitCommand(program);

  program.parse(process.argv);
})();
