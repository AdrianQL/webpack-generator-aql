import chalk from 'chalk';

const headerIntro = chalk.blue.bgWhite.bold(`
                                                                    Version: ${chalk.black(
                                                                      '1.0.0'
                                                                    )}  
`);

const webpackIntro = chalk.blue.bold(`
                                                                                             
           ██╗       ██╗███████╗██████╗ ██████╗  █████╗  █████╗ ██╗  ██╗                 
           ██║  ██╗  ██║██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║ ██╔╝                 
           ╚██╗████╗██╔╝█████╗  ██████╦╝██████╔╝███████║██║  ╚═╝█████═╝                  
            ████╔═████║ ██╔══╝  ██╔══██╗██╔═══╝ ██╔══██║██║  ██╗██╔═██╗                  
            ╚██╔╝ ╚██╔╝ ███████╗██████╦╝██║     ██║  ██║╚█████╔╝██║ ╚██╗                 
             ╚═╝   ╚═╝  ╚══════╝╚═════╝ ╚═╝     ╚═╝  ╚═╝ ╚════╝ ╚═╝  ╚═╝                 `);

const generatorIntro = chalk.blue.bold(`
                                                                                             
      ██████╗ ███████╗███╗  ██╗███████╗██████╗  █████╗ ████████╗ █████╗ ██████╗          
     ██╔════╝ ██╔════╝████╗ ██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗         
     ██║  ██╗ █████╗  ██╔██╗██║█████╗  ██████╔╝███████║   ██║   ██║  ██║██████╔╝         
     ██║  ╚██╗██╔══╝  ██║╚████║██╔══╝  ██╔══██╗██╔══██║   ██║   ██║  ██║██╔══██╗         
     ╚██████╔╝███████╗██║ ╚███║███████╗██║  ██║██║  ██║   ██║   ╚█████╔╝██║  ██║         
      ╚═════╝ ╚══════╝╚═╝  ╚══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚════╝ ╚═╝  ╚═╝         `);



function getAuthor() {
  return chalk.white(`Author: ${chalk.bold.white('AdrianQL')}`);
}

function getLine(lineLength = 89) {
  return chalk.blue.bgWhite.bold(`${' '.repeat(lineLength)}`);
}

function showIntro() {
  console.log(`${getLine()}${webpackIntro}${generatorIntro}\n${getAuthor()}\n${getLine()}`);
}

export { showIntro };
