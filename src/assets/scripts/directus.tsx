import Config from 'react-native-config';
import {createDirectus, authentication, graphql} from '@directus/sdk';
import {Gesangbuchlied} from '../../types/modeltypes.ts';

export interface Schema {
  gesangbuchlied: Gesangbuchlied[];
}

export const directus_url = Config.DIRECTUS_URL as string;

// Client with GraphQL support
const directus = createDirectus<Schema>(directus_url)
  .with(graphql())
  .with(authentication());

async function login() {
  try {
    await directus.login(
      Config.DIRECTUS_USER_NAME as string,
      Config.DIRECTUS_PASSWORD as string,
    );
  } catch (error) {
    console.error(error);
  }
}

export {directus, login};
