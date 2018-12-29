export interface IRouteConf {
    component?: React.ComponentClass | React.FunctionComponent | string | null;
    key: string;
    urlPath?: string;
    from?: string;
    to?: string;
    lazyImport?: boolean;
    exact?: boolean;
}
