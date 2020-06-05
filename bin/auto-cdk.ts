#!/usr/bin/env node
import * as arg from 'arg';

const defaultCommand = 'dev';

export type Command = (argv?: string[]) => void;

export type CommandMap = {
    [command: string]: () => Promise<Command>
}

const commands: CommandMap = {
    build: async () => await import('../cli/build').then((i) => i.build),
    dev: async () => await import('../cli/dev').then((i) => i.dev)
};

const argMap = {
    // Types
    '--help': Boolean,
    '--version': Boolean,
    '--verbose': arg.COUNT,

    // Aliases
    '-v': '--verbose'
};

const args = arg(argMap);

if (args['--version']) {
    console.log(`auto-cdk v`);
    process.exit(0);
}

const foundCommand = Boolean(commands[args._[0]]);
const command = foundCommand ? args._[0] : defaultCommand;
const forwardedArgs = foundCommand ? args._.slice(1) : args._;

if (args['--help']) {
    forwardedArgs.push('--help')
}

commands[command]().then((exec) => exec(forwardedArgs));