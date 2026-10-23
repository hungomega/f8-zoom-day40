import { useDispatch, useSelector } from "../../libs/react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import styles from "./TaskList.module.scss";
import TaskItem from "../components/TaskItem/index.jsx";

function TaskList() {
    const tasks = useSelector((state) => state.tasks); //  tasks đã  chứa các task  r
    const loading = useSelector((state) => state.loading);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log("TaskList render");

    useEffect(() => {
        fetch("http://localhost:3000/tasks")
            .then((response) => response.json())
            .then((data) => {
                dispatch({
                    type: "SET_TASKS",
                    payload: data,
                });
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                dispatch({ type: "SET_LOADING", payload: true });
            });
    }, [dispatch]);
    const handleDelete = (id) => {
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Xóa task thất bại");
                }

                dispatch({
                    type: "DELETE_TASK",
                    payload: id,
                });
            })
            .catch((error) => {
                console.error(error);
                alert(error.message);
            });
    };
    return (
        <div className={styles.container}>
            <h1>Task List</h1>
            <a href="../../../public/redux.html">Page Redux</a>
            {loading && <p>Đang tải...</p>}

            <button onClick={() => navigate("/new-task")}>
                Create New Task
            </button>

            {!loading && tasks.length === 0 && <p>Chưa có task nào</p>}

            <ul>
                {tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <TaskItem
                                task={task}
                                onEdit={() => navigate(`/${task.id}/edit`)}
                                onDelete={() => handleDelete(task.id)}
                                isDeleting={false}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
export default TaskList;
