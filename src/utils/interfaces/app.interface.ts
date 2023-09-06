import Controller from "./controller.interface";

export interface AppInfo {
    url: string;
}

export interface AppOptions {
    controllers: Controller[];
    port: number;
    logger?: any | undefined;
    apiRoot?: string | undefined;
}
