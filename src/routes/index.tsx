import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LazyLoader from 'HOC/LazyLoader';
import { IRouteConf } from './interfaces';
import AuthWrapper from 'HOC/AuthWrapper';

export const RoutesPathes = {
    agenda: '/agenda',
    home: '/home',
    newEventPage: '/new-event'
};

export const routesConf: IRouteConf[] = [
    {
        key: 'agenda',
        urlPath: RoutesPathes.agenda,
        lazyImport: true,
        component: 'Agenda'
    },
    {
        key: 'home',
        urlPath: RoutesPathes.home,
        component: 'HomePage',
        lazyImport: true
    },
    {
        key: 'new-event',
        urlPath: RoutesPathes.newEventPage,
        component: 'NewEventPage',
        lazyImport: true
    },
    {
        key: 'home-redirect',
        from: '/',
        to: RoutesPathes.home,
        exact: true
    }
];

const renderRoute = ({
    component,
    lazyImport,
    urlPath,
    ...route
}: IRouteConf) => {
    if (route.from) {
        const redirectConf: any = route;
        return <Redirect {...redirectConf} />;
    }
    const Comp: any = lazyImport
        ? LazyLoader(() => import('../containers/' + component))
        : component;
    return (
        <Route
            {...route}
            component={(props: any) => (
                <AuthWrapper>
                    <Comp {...props} />
                </AuthWrapper>
            )}
            path={urlPath}
        />
    );
};

export const Routes = () => <Switch>{routesConf.map(renderRoute)}</Switch>;
