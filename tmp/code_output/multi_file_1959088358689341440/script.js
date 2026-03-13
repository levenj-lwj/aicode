// 任务管理应用
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const totalTasksEl = document.getElementById('totalTasks');
    const completedTasksEl = document.getElementById('completedTasks');
    
    // 当前过滤状态
    let currentFilter = 'all';
    
    // 从localStorage加载任务
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // 初始化应用
    function initApp() {
        renderTasks();
        updateStats();
        
        // 添加事件监听器
        addTaskBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTask();
            }
        });
        
        // 过滤按钮事件
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有active类
                filterBtns.forEach(b => b.classList.remove('active'));
                // 添加active类到当前按钮
                this.classList.add('active');
                // 更新过滤状态
                currentFilter = this.dataset.filter;
                // 重新渲染任务
                renderTasks();
            });
        });
    }
    
    // 添加新任务
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText) {
            // 创建新任务对象
            const newTask = {
                id: Date.now(),
                text: taskText,
                completed: false,
                createdAt: new Date().toISOString()
            };
            
            // 添加到任务数组
            tasks.push(newTask);
            
            // 保存到localStorage
            saveTasks();
            
            // 清空输入框
            taskInput.value = '';
            
            // 重新渲染任务列表
            renderTasks();
            
            // 更新统计
            updateStats();
        }
    }
    
    // 渲染任务列表
    function renderTasks() {
        // 清空当前列表
        taskList.innerHTML = '';
        
        // 根据过滤状态获取任务
        let filteredTasks = tasks;
        if (currentFilter === 'active') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }
        
        // 如果没有任务，显示提示信息
        if (filteredTasks.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = '暂无任务';
            emptyMessage.classList.add('empty-message');
            taskList.appendChild(emptyMessage);
            return;
        }
        
        // 渲染每个任务
        filteredTasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            
            taskItem.innerHTML = `
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <button class="task-delete">×</button>
            `;
            
            // 添加事件监听器
            const checkbox = taskItem.querySelector('.task-checkbox');
            checkbox.addEventListener('change', () => toggleTaskCompleted(task.id));
            
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
        updateStats();
    }
    
    // 删除任务
    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        renderTasks();
        updateStats();
    }
    
    // 更新任务统计
    function updateStats() {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        
        totalTasksEl.textContent = total;
        completedTasksEl.textContent = completed;
    }
    
    // 保存任务到localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // 初始化应用
    initApp();
});