import { Routes, Route } from "react-router";
import TaskList from "./pages/TaskList";
import NewTask from "./pages/NewTask";
import EditTask from "./pages/EditTask";
function App() {
    return (
        <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/new-task" element={<NewTask />} />
            <Route path="/:id/edit" element={<EditTask />} />
        </Routes>
    );
}

export default App;
