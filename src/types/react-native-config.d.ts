declare module 'react-native-config' {
  export interface NativeConfig {
    DIRECTUS_USER_NAME?: string;
    DIRECTUS_PASSWORD?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
