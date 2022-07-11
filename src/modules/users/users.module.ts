import { User, UserResolvers } from './resolvers/users.resolver.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const typeUserReturn = {
    types: [User, UserResolvers],
    path: __dirname + '/schemas/users.schema.graphql',
    typegen: __dirname + '/schemas/users.typings.ts',
}

export { typeUserReturn }
