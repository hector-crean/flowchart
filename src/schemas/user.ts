import { z } from "zod";

export const themes = {
    light: {},
    dark: {}
};


const userOptionsSchema = z.object({
    general: z.object({
        sidebarOpen: z.boolean().default(true),
    }),
    panels: z.object({
        splitDirection: z.enum(["horizontal", "vertical"]).default("horizontal"),
    }),
    editor: z.object({
        theme: z.enum(Object.keys(themes) as [string, ...string[]]).default("vsLight"),
        editingMode: z.enum(["default", "vim"]).default("default"),
    }),
    renderer: z.object({
        direction: z.enum(["horizontal", "vertical"]).default("horizontal"),
        autoFitView: z.boolean().default(true),
        theme: z.enum(["light", "dark"]).default("light"),
        enableMinimap: z.boolean().default(true),
    }),
});

export type UserOptions = z.infer<typeof userOptionsSchema> & {
    load: () => void;
    save: () => void;
};