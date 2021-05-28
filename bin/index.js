#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");
const { hideBin } = require('yargs/helpers')

const getScreenshot = require('./getScreenshot');
const CONDITIONS = require('./conditions');


const options = yargs
 .usage("Usage: -w <website>").option("w", 
    { 
        alias: "website", 
        describe: "Website to be tested", 
        type: "string", 
        demandOption: true 
    })
 .usage("Usage: -c <condition>").option("c", 
    { 
        alias: "condition", 
        describe: "Condition to test for", 
        choices: [
            ...CONDITIONS,
            'all'
        ], 
        demandOption: true 
    })
    .usage("Usage: -p <path>").option("p", 
    { 
        alias: "path", 
        describe: "directory path to save screenshot", 
        type: 'string',
    }).argv

const argv = yargs(hideBin(process.argv)).argv

const website = argv.w
const condition = argv.c


getScreenshot(website, condition).then( (value)=> {

    let message = chalk.white.bold(value)

    if( condition == 'all' ){
        message = chalk.white.bold('Your screenshots are pending') 
    }

    const boxenOptions = {
        padding: 1,
        margin: 1,
        borderStyle: "round",
        borderColor: "#800080"
    }
       
    const msgBox = boxen( message, boxenOptions )
       
    console.log(msgBox)

});



