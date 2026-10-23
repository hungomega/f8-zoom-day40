import styles from "./TaskItem.module.scss";

function TaskItem({ task, onEdit, onDelete, isDeleting }) {
    const handleDelete = () => {
        const confirmed = window.confirm("Bạn có chắc muốn xoá task này ?");
        if (confirmed) {
            onDelete();
        }
    };

    return (
        <div className={styles.container}>
            <span>{task.title}</span>

            <button type="button" disabled={isDeleting} onClick={onEdit}>
                Edit
            </button>

            <button type="button" disabled={isDeleting} onClick={handleDelete}>
                {isDeleting ? "Đang xóa..." : "Delete"}
            </button>
        </div>
    );
}

export default TaskItem;
