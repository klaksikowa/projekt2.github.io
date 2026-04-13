class Task {
    constructor(text) {
        this.text = text;
        this.done = false;
    }
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

document.getElementById("addBtn").addEventListener("click", addTask);

function addTask() {
    if (input.value === "") return;

    const task = new Task(input.value);
    tasks.push(task);

    save();
    render();

    input.value = "";
}

function render(filter = "all") {
    list.innerHTML = "";

    let filtered = tasks;

    if (filter === "done") {
        filtered = tasks.filter(t => t.done);
    }
    if (filter === "todo") {
        filtered = tasks.filter(t => !t.done);
    }

    filtered.forEach((task, index) => {
        const li = document.createElement("li");

        li.textContent = task.text;

        if (task.done) li.classList.add("done");

        li.addEventListener("click", () => {
            task.done = !task.done;
            save();
            render();
        });

        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";

        delBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            save();
            render();
        });

        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.getElementById("all").addEventListener("click", () => render("all"));
document.getElementById("done").addEventListener("click", () => render("done"));
document.getElementById("todo").addEventListener("click", () => render("todo"));

render();