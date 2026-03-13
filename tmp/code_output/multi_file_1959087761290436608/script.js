// 获取DOM元素
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// 事件监听：表单提交添加任务
taskForm.addEventListener('submit', function(e) {
    e.preventDefault(); // 阻止表单默认提交行为
    
    const taskText = taskInput.value.trim(); // 获取输入值并去除空格
    
    if (taskText === '') {
        alert('请输入任务描述！'); // 简单验证，如果为空则提示
        return;
    }
    
    addTask(taskText); // 调用添加任务函数
    taskInput.value = ''; // 清空输入框
});

// 函数：添加任务到列表
function addTask(text) {
    const li = document.createElement('li'); // 创建列表项
    
    // 创建任务文本节点
    const taskSpan = document.createElement('span');
    taskSpan.textContent = text;
    
    // 创建删除按钮
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '删除';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        li.remove(); // 点击删除按钮时移除该任务项
    });
    
    // 将文本和按钮添加到列表项
    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    
    // 将列表项添加到任务列表
    taskList.appendChild(li);
}

// 可选：初始化时加载一些示例任务（如果需要）
// addTask('示例任务1');
// addTask('示例任务2');