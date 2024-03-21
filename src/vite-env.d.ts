/// <reference types="./vite-env-override.d.ts" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_PATH: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
