import { useEffect, useRef, useState } from "react";
import styles from "./TaskForm.module.scss";

function TaskForm({ initialData, onSubmit, submitText, isLoading }) {
    const [title, setTitle] = useState(initialData?.title ?? ""); //  Có tiêu đề  thì lấy  tiêu đề chưa có thì dùng  chuỗi rỗng
    const [error, setError] = useState("");

    const inputRef = useRef(null); // useRef giữ tham chiếu đến focus
    useEffect(() => {
        inputRef.current.focus(); //Khi component được render lần đầu, tự động đưa con trỏ chuột vào ô input.
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // title.trim() loại bỏ khoảng trắng ở đầu và cuối chuỗi.
        if (!title.trim()) {
            setError("Vui lòng nhập tên task");
            return;
        }

        setError(""); // Xóa thông báo lỗi cũ khi dữ liệu hợp lệ
        onSubmit(title.trim()); // Gọi hàm onSubmit được truyền từ component cha thông qua props, đồng thời truyền tên task đã loại bỏ khoảng trắng thừa.
    };

    return (
        <div className={styles.container}>
            <h1>{submitText} Task</h1>

            <form onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={isLoading}
                    placeholder="Nhập tên task..."
                />

                {error && <p>{error}</p>}

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Đang xử lý..." : submitText}
                </button>
            </form>
        </div>
    );
}

export default TaskForm;
