import util from 'util';
import {exec} from 'child_process';

const execPromise = util.promisify(exec);
// Example
// async function ls() {
//   const { stdout, stderr } = await exec('ls');
//   console.log('stdout:', stdout);
//   console.log('stderr:', stderr);
// }
// ls();

export default execPromise;
