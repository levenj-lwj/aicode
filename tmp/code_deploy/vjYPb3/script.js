// 任务管理功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const tasksCount = document.getElementById('tasksCount');
    const clearCompletedBtn = document.getElementById('clearCompletedBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // 当前过滤状态
    let currentFilter = 'all';
    
    // 从本地存储加载任务
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // 初始化渲染任务列表
    renderTasks();
    
    // 添加任务事件
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // 清除已完成任务事件
    clearCompletedBtn.addEventListener('click', clearCompletedTasks);
    
    // 过滤按钮事件
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有按钮的active类
            filterBtns.forEach(b => b.classList.remove('active'));
            // 给当前点击的按钮添加active类
            this.classList.add('active');
            // 更新当前过滤状态
            currentFilter = this.getAttribute('data-filter');
            // 重新渲染任务列表
            renderTasks();
        });
    });
    
    // 添加任务函数
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        
        // 创建新任务对象
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date()
        };
        
        // 添加到任务数组
        tasks.push(newTask);
        
        // 保存到本地存储
        saveTasks();
        
        // 清空输入框
        taskInput.value = '';
        
        // 重新渲染任务列表
        renderTasks();
    }
    
    // 渲染任务列表
    function renderTasks() {
        // 清空当前列表
        taskList.innerHTML = '';
        
        // 根据过滤状态获取要显示的任务
        let tasksToRender = [];
        
        if (currentFilter === 'all') {
            tasksToRender = tasks;
        } else if (currentFilter === 'active') {
            tasksToRender = tasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            tasksToRender = tasks.filter(task => task.completed);
        }
        
        // 更新任务计数
        updateTasksCount();
        
        // 如果没有任务，显示提示信息
        if (tasksToRender.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.textContent = '暂无任务';
            emptyMessage.classList.add('empty-message');
            taskList.appendChild(emptyMessage);
            return;
        }
        
        // 渲染每个任务
        tasksToRender.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            
            taskItem.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <button class="task-delete">×</button>
            `;
            
            // 添加复选框事件
            const checkbox = taskItem.querySelector('.task-checkbox');
            checkbox.addEventListener('change', () => toggleTaskCompleted(task.id));
            
            // 添加删除按钮事件
            const deleteBtn = taskItem.querySelector('.task-delete');
            deleteBtn.addEventListener('click', () => deleteTask(task.id));
            
            taskList.appendChild(taskItem);
        });
    }
    
    // 切换任务完成状态
    function toggleTaskCompleted(taskId) {
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                return {...task, completed: !task.completed};
            }
            return task;
        });
        
        saveTasks();
        renderTasks();
    }
    
    // 删除任务
    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        renderTasks();
    }
    
    // 清除已完成任务
    function clearCompletedTasks() {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
    }
    
    // 更新任务计数
    function updateTasksCount() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        const activeTasks = totalTasks - completedTasks;
        
        tasksCount.textContent = `${activeTasks} 个待完成，${completedTasks} 个已完成`;
    }
    
    // 保存任务到本地存储
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});