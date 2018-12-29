import * as React from 'react';
import { connect } from 'react-redux';
import { IAuthWrapperProps } from './interfaces';
import { IStoreSignature } from 'Reducers/interfaces';
import {
    userAuth,
    setUserAutoAuthStatus,
    SetUserAutoAuthStatus
} from 'Actions/user-actions';
import { withRouter, RouteComponentProps } from 'react-router';
import {
    subscribeToActionStatusEventEmitter,
    unsubscribeToActionStatusEventEmitter
} from 'Common/utils';
import { getAppointments, getServiceList } from 'Actions/app-actions';
import { RoutesPathes } from 'src/routes';
import { setNewEventServiceId } from 'Actions/new-event-page-actions';
import { IActionStatus } from 'Common/interfaces';
import { ACTIONS_CREATORS } from 'Actions/interfaces';
import { FED_TOKEN } from 'Common/constants';
type OwnProps = IAuthWrapperProps &
    RouteComponentProps &
    IStoreSignature & {
        setUserAutoAuthStatus: SetUserAutoAuthStatus;
    };
class AuthWrapper extends React.Component<OwnProps> {
    constructor(props: any) {
        super(props);
    }

    componentWillMount = () => {
        subscribeToActionStatusEventEmitter(this.onActionStatus);
    };

    componentWillUnmount = () => {
        unsubscribeToActionStatusEventEmitter(this.onActionStatus);
    };

    componentDidMount() {
        const {
            user,
            location: { pathname },
            history
        } = this.props;
        if (!user && pathname !== RoutesPathes.home) {
            history.push(RoutesPathes.home);
        } else {
            this.replaceUrlToken();
        }
    }

    componentDidUpdate = () => {
        const {
            history,
            location: { pathname },
            user
        } = this.props;
        if (user && pathname === RoutesPathes.home) {
            history.push(RoutesPathes.agenda);
        }
    };

    render() {
        const {
            user,
            children,
            location: { pathname, search, state = {} }
        } = this.props;

        if (user || pathname === RoutesPathes.home) {
            return children;
            // const { Consumer,Provider } = React.createContext({ authenticated: false });
            // return (
            //     <Provider value={{ authenticated: true }}>{children}</Provider>
            // );
        }
        if (search.indexOf(FED_TOKEN) !== -1 || state.fedToken) {
            return 'loading';
        }
        return null;
    }

    private authenticate = (token: string) => {
        const {
            setUserAutoAuthStatus: setUAAS,
            autoAuthStatus,
            userAuth: authenticate
        } = this.props;

        if (autoAuthStatus !== -1) {
            setUAAS(-1);
        }
        authenticate(token);
    };

    private onActionStatus = ({ data, action, status }: IActionStatus) => {
        if (action === ACTIONS_CREATORS.GetUserAuth) {
            console.log({ action, status, data });
        }
    };

    private replaceUrlToken = () => {
        const { location, history } = this.props;
        const token = location.search
            .replace(/(.*)(fedToken=.*)(&.*)?/, '$2')
            .split('=');
        if (token.length > 1) {
            const tk = token[1];
            this.authenticate(tk);
            history.replace(location.pathname, { fedToken: tk });
        }
    };
}

const mapState = ({
    user,
    autoAuthStatus,
    daysAppointments,
    newEventServiceId,
    services
}: IStoreSignature) => {
    return {
        user,
        autoAuthStatus,
        daysAppointments,
        newEventServiceId,
        services
    };
};
const mapDispatch = {
    userAuth,
    setUserAutoAuthStatus,
    getAppointments,
    getServiceList,
    setNewEventServiceId
};

export default connect(
    mapState,
    mapDispatch
)(withRouter(AuthWrapper));
