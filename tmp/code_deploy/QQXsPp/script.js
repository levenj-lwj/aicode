// 任务管理功能
document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const tasksCount = document.getElementById('tasksCount');
    const clearCompletedBtn = document.getElementById('clearCompleted');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';
    
    // 初始化渲染
    renderTasks();
    updateTasksCount();
    
    // 添加任务事件
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // 清除已完成任务
    clearCompletedBtn.addEventListener('click', clearCompletedTasks);
    
    // 筛选按钮事件
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 为当前点击的按钮添加active类
            this.classList.add('active');
            // 更新当前筛选条件
            currentFilter = this.getAttribute('data-filter');
            // 重新渲染任务列表
            renderTasks();
        });
    });
    
    // 添加任务函数
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            timestamp: new Date().toISOString()
        };
        
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        updateTasksCount();
        
        // 清空输入框
        taskInput.value = '';
        taskInput.focus();
    }
    
    // 渲染任务列表
    function renderTasks() {
        // 根据筛选条件过滤任务
        let filteredTasks = tasks;
        if (currentFilter === 'active') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }
        
        // 清空任务列表
        taskList.innerHTML = '';
        
        if (filteredTasks.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = '没有任务';
            emptyMessage.style.textAlign = 'center';
            emptyMessage.style.padding = '20px';
            emptyMessage.style.color = '#95a5a6';
            taskList.appendChild(emptyMessage);
            return;
        }
        
        // 添加任务到列表
        filteredTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskItem.setAttribute('data-id', task.id);
            
            taskItem.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <button class="delete-btn">×</button>
            `;
            
            // 添加复选框事件
            const checkbox = taskItem.querySelector('.task-checkbox');
            checkbox.addEventListener('change', function() {
                toggleTaskCompleted(task.id);
            });
            
            // 添加删除按钮事件
            const deleteBtn = taskItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function() {
                deleteTask(task.id);
            });
            
            taskList.appendChild(taskItem);
        });
    }
    
    // 切换任务完成状态
    function toggleTaskCompleted(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        
        saveTasks();
        renderTasks();
        updateTasksCount();
    }
    
    // 删除任务
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
        updateTasksCount();
    }
    
    // 清除已完成任务
    function clearCompletedTasks() {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
        updateTasksCount();
    }
    
    // 更新任务计数
    function updateTasksCount() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        const remainingTasks = totalTasks - completedTasks;
        
        tasksCount.textContent = `${remainingTasks} 个待完成任务，共 ${totalTasks} 个任务`;
    }
    
    // 保存任务到本地存储
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});