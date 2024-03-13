import {createDirectus, authentication, graphql} from '@directus/sdk';
import {Gesangbuchlied} from './modeltypes.tsx';

export interface Schema {
  gesangbuchlied: Gesangbuchlied[];
}

// Client with GraphQL support
const directus = createDirectus<Schema>(
  'https://gb26-admin.johannische-kirche.org',
)
  .with(graphql())
  .with(authentication());

async function login() {
  throw new Error('Not implemented');
  // try {
  // } catch (error) {
  //   console.error(error);
  // }
}

export {directus, login};
