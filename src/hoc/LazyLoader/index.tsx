import * as React from 'react';

export default (importComponent: () => Promise<any>) => {
    return class AsyncComponent extends React.Component<
        any,
        { component: any }
    > {
        private mounted: boolean = false;
        constructor(props: any) {
            super(props);
            this.state = {
                component: null
            };
        }

        componentWillUnmount = () => {
            this.mounted = false;
        };

        componentDidMount = async () => {
            this.mounted = true;
            try {
                const cmp = await importComponent();
                if (this.mounted) {
                    this.setState({
                        component: cmp.default
                    });
                }
            } catch (err) {
                throw err;
            }
        };

        render() {
            const { component: Child } = this.state;
            return Child != null ? <Child {...this.props} /> : null;
        }
    };
};
