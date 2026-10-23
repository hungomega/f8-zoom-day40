import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "../../libs/react-redux";
import styles from "./NewTask.module.scss";
import TaskForm from "../components/TaskForm";

function NewTask() {
    const [loading, setLoading] = useState(false); // xác định form có đang gửi dữ liệu lên API hay không.

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = (title) => {
        setLoading(true);

        fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Tạo task thất bại");
                }
                return response.json();
            })
            .then((data) => {
                dispatch({
                    type: "ADD_TASK",
                    payload: data,
                });
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
                alert(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <div className={styles.container}>
            <h1>Form</h1>

            <TaskForm
                initialData={null}
                onSubmit={handleSubmit}
                submitText="Create"
                isLoading={loading}
            />
        </div>
    );
}

export default NewTask;
