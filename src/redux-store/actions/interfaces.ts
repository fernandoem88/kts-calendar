/**
 * @description evrey action to dispatch must have this signature
 */
export interface IAction {
    type: ACTIONS;
    payload?: any;
}
/**
 * @description create and dispatch action to reducers.
 * @param params the params to use to implement logic and create the action.
 */
export type IActionCreator<P> = (param: P) => IAction;

/**
 * @description the AsyncActionCreator returns a function of type AsyncActionCreatorReturnType which has dispatch as parameter.
 * @param params the params to use to implement logic and create the action.
 * the action creator ends in error and does not dispatch the error in the store.
 * in this case, the error case can be catched directly by the component directly.
 * NB: the callback parameter is an observable in order to allow the component to unsubscribe in componentWillUnmount fase.
 */
export type IAsyncActionCreator<P> = (
    params?: P
) => IAsyncActionCreatorReturnType;
/**
 * @description the return type of an AsyncActionCreator function.
 * @param dispatch the dispatcher function.
 */
export type IAsyncActionCreatorReturnType = (
    dispatch: DispatcherFunction
) => any;
/**
 * @description the dispatcher function will be used to dispatch an action to the store
 * @param action the action to dispatch
 */
export type DispatcherFunction = (action: IAction) => void;

// ====================
// tslint:disable:interface-over-type-literal
// declare actions types here
export enum ACTIONS_STATUS {
    LOADING_STATUS = 'loading',
    SUCCESS_STATUS = 'success',
    ERROR_STATUS = 'error'
}
export enum ACTIONS {}

export enum ACTIONS_CREATORS {}
