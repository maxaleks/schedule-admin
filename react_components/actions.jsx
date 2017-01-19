export function appStart(cb) {
    return (dispatch, getState) => {
        cb();
    };
}
