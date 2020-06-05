#!/usr/bin/env node
// The CLI
import { program } from 'commander'
program
.command('details <slug_or_user_id>')
.description('Display user details')
.action(require('./commands/details'));
program.command('search <query>')
.description('Search for profiles')
.action(require('./commands/search'));
program.command('topUpvoted')
.description('Show the most upvoted profiles')
.action(require('./commands/topUpvoted'));

program.parse(process.argv)