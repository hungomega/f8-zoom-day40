import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "../../libs/react-redux";
import styles from "./EditTask.module.scss";
import TaskForm from "../components/TaskForm/index.jsx";

function EditTask() {
    const { id } = useParams(); //  useParams() lấy id từ URL. Ví dụ /2/edit thì id là "2"
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false); // xác định form có đang gửi dữ liệu lên API hay không.
    const [task, setTask] = useState(null);
    const handleSubmit = (title) => {
        setSubmitting(true);

        fetch(`http://localhost:3000/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Cập nhật task thất bại");
                }

                return response.json();
            })
            .then((data) => {
                dispatch({
                    type: "UPDATE_TASK",
                    payload: data,
                });
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
                alert(error.message);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    useEffect(() => {
        setLoading(true);

        fetch(`http://localhost:3000/tasks/${id}`)
            .then((response) => {
                if (!response.ok) {
                    navigate("/");
                    return null;
                }

                return response.json();
            })
            .then((data) => {
                if (data) {
                    setTask(data);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id, navigate]);

    return (
        <div className={styles.container}>
            <p>Task ID: {id}</p>

            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : task ? (
                <TaskForm
                    initialData={task}
                    onSubmit={handleSubmit}
                    submitText="Update"
                    isLoading={submitting}
                />
            ) : null}
        </div>
    );
}

export default EditTask;
