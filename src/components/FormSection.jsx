import { useState } from "react";

function FormSection() {
  const [taskTitle, setTaskTitle] = useState(""); // نص المهمة الجديدة
  const [idIncrease, setIdIncrease] = useState(3); // لزيادة الـ id لكل مهمة جديدة
  const [tasks, setTasks] = useState([
    { id: 1, title: "Item1", isCompleted: false },
    { id: 2, title: "Item2", isCompleted: false },
  ]); 

  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // للتحكم بفتح/اغلاق مودال التعديل
  const [currentEditTask, setCurrentEditTask] = useState(null); // المهمة الحالية اللي عم نعدلها
  const [editTitle, setEditTitle] = useState(""); // النص داخل المودال أثناء التعديل
  const [hideCompleted, setHideCompleted] = useState(false); // خيار اخفاء المهام المكتملة
  const [searchTerm, setSearchTerm] = useState(""); // نص البحث عن مهمة

  
  function addTaskHandler(e){
    e.preventDefault();
    if(!taskTitle.trim()) return;
      setTasks([
        ...tasks,
        {id:idIncrease,title:taskTitle,isCompleted:false}
      ])
      setIdIncrease((prev)=>prev+1);
      setTaskTitle("");
  }

  function allCompletedHandler(){
    setTasks(
      tasks.map((item)=>{
        return {...item,isCompleted:!item.isCompleted};
      })
    )
  }

  function completedHandle(id) {
    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  }

  function editTaskHandler(id) {
    const taskToEdit = tasks.find((item) => item.id === id);
    setCurrentEditTask(taskToEdit);
    setEditTitle(taskToEdit.title); // تعبئة النص الحالي داخل المودال
    setIsEditModalOpen(true);
  }

  function saveEditHandler() {
    setTasks(
      tasks.map((item) =>
        item.id === currentEditTask.id ? { ...item, title: editTitle } : item
      )
    );
    setIsEditModalOpen(false); // اغلاق المودال بعد الحفظ
    setCurrentEditTask(null); // إعادة تهيئة المهمة الحالية
  }

  function deleteTaskHandler(id) {
    if (confirm("Are you sure?")) {
      setTasks(tasks.filter((item) => item.id !== id));
    }
  }

  function deleteCompletedHandler() {
    if (confirm("Delete all completed tasks?")) {
      setTasks(tasks.filter((item) => !item.isCompleted));
    }
  }

  const filteredTasks = tasks.filter((item) => {
    const matchSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchHide = hideCompleted ? !item.isCompleted : true;
    return matchSearch && matchHide;
  });

  const taskItems = filteredTasks.map((item) => (
    <li key={item.id} style={{ opacity: item.isCompleted ? 0.7 : 1 }}>
      <h3 style={{ textDecoration: item.isCompleted ? "line-through" : "none" }}>
        {item.title}
      </h3>
      <div className="actions">
        <button
          type="button"
          className="completed"
          onClick={() => completedHandle(item.id)}
        >
          {item.isCompleted ? "Undo" : "Completed"}
        </button>

        <button
          type="button"
          className="edit"
          onClick={() => editTaskHandler(item.id)}
        >
          Edit
        </button>

        <button
          type="button"
          className="delete"
          onClick={() => deleteTaskHandler(item.id)}
        >
          Delete
        </button>
      </div>
    </li>
  ));

  return (
    <form className="form">
      <div className="addInput">
        <input
          type="text"
          value={taskTitle}
          placeholder="Add New Task!"
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button type="button" onClick={addTaskHandler}>
          Add <b>+</b>
        </button>
      </div>

      <input
        type="text"
        className="search"
        placeholder="Search a Task"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="checkCompleted">
        <label htmlFor="check">Hide Completed Task's</label>
        <input
          id="check"
          type="checkbox"
          checked={hideCompleted}
          onChange={(e) => setHideCompleted(e.target.checked)}
        />
      </div>

      <div className="buttons">
        <button type="button" onClick={deleteCompletedHandler}>
          Delete Completed Tasks!
        </button>
        <button type="button" onClick={allCompletedHandler}>
          Select All As Completed
        </button>
      </div>

      <hr />
      <ul className="Tasks">{taskItems}</ul>
      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Task</h3>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <div className="modal-buttons">
              <button type="button" onClick={saveEditHandler}>
                Save
              </button>
              <button type="button" onClick={() => setIsEditModalOpen(false)}>
                Cancel
             </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
export default FormSection;