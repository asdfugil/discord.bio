#!/usr/bin/env node
// The CLI
import { program } from 'commander'
program.name('dbio')
program
    .command('details <slug_or_user_id>')
    .description('Display user details')
    .action(require('./commands/details'));
program
    .command('search <query>')
    .description('Search for profiles, sorted by upvotes')
    .action(require('./commands/search'));
program
    .command('topUpvoted')
    .description('Show the most upvoted profiles, sorted by upvotes')
    .action(require('./commands/topUpvoted'));
program
    .command('version')
    .description('Displays the API version')
    .action(require('./commands/version'))
program.parse(process.argv)