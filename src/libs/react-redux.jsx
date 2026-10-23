import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext(null); //  nơi chia sẻ dữ liệu store  giữa các component
function ReduxProvider({ store, children }) {
    return <Context.Provider value={store}>{children}</Context.Provider>;
}

function useStore() {
    const store = useContext(Context); // lấy value mà Context.Provider  cung cấp , tức là store
    return store; // trả store cho component  hoặc  hook khác  sử dụng
}

function useDispatch() {
    const store = useStore(); // lấy store từ Context thông qua useStore vừa viết
    return store.dispatch; // Trả về hàm dispatch để component có thể action đến reducer
}

function useSelector(selector) {
    const store = useStore(); // Lấy store từ Context
    const [state, setState] = useState(() => {
        // Khởi tạo state của React bằng giá trị được selector chọn
        return selector(store.getState());
        // store.getState(): lấy toàn bộ state hiện tại của Redux
        // selector(...): chọn phần state mà component cần sử dụng
    });

    useEffect(() => {
        // Đăng ký listener để theo dõi mỗi khi Redux Store thay đổi
        const unsubscribe = store.subscribe(() => {
            // Lấy state mới nhất của Redux Store
            const newState = selector(store.getState());

            // Cập nhật state của React để giao diện có thể render lại
            setState((prevState) => {
                if (newState !== prevState) {
                    return newState;
                }

                return prevState;
            });
        });

        // Hủy đăng ký listener khi component unmount
        // hoặc khi effect cần chạy lại
        return unsubscribe;
    }, [store, selector]); // Chạy lại effect khi store hoặc selector thay đổi

    return state; // Trả về giá trị state đã chọn cho component sử dụng
}
export { ReduxProvider, useStore, useDispatch, useSelector };