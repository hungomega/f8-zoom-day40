const initState = {
    tasks: [],
    loading: false,
    error: null,
    counter: 0,
};

export default function reducer(state = initState, action) {
    // console.log(state);
    switch (action.type) {
        case "increase":
            return {
                ...state, // bảo lưu toàn bộ dữ liện cũ , ghi đè counter = state,.counter + 1
                counter: state.counter + 1, // lấy giá trị counter hiện tại cộng thêm 1 rồi gán lại cho counter.
            };

        case "SET_TASKS":
            return {
                ...state,
                tasks: action.payload,
            };
        case "ADD_TASK":
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };

        case "UPDATE_TASK":
            return {
                //  Giả sử action.payload chứa task đã cập nhật. Ta dùng map() để tìm task có cùng id và thay bằng dữ liệu mới
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id ? action.payload : task,
                ),
            };
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload,
            };
        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
            };

        default:
            return state;
    }
}
