const __DO_NOT_USE__ActionTypes = {
    type: "@@@F8-redux/INIT.a.b.c",
};

function createStore(reducer, initState) {
    let state = reducer(initState, __DO_NOT_USE__ActionTypes);
    const listeners = [];
    return {
        getState() {       
            return state;
        },
        dispatch(action) {
            state = reducer(state, action);
            listeners.forEach((listener) => listener()); // Duyệt qua mảng listeners và gọi chạy từng hàm listener bên trong mảng đó.
        },
        subscribe(listener) {
            if (typeof listener === "function") {
                listeners.push(listener); // lúc này push hàm render vào manggr chính lầ đăng ký hàm render để chạy khi store thay đổi
            }
            return () => {
                const index = listeners.indexOf(listener);
                if (index !== -1) {
                    listeners.splice(index, 1);
                }
            };
        },
    };
}
export { createStore };