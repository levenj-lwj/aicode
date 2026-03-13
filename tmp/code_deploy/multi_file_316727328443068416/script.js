// 文章数据
const articlesData = {
    1: {
        title: "前端开发的最佳实践",
        date: "2023年10月15日",
        image: "https://picsum.photos/800/600?random=1",
        content: `
            <p>在现代前端开发中，遵循最佳实践是确保代码质量和可维护性的关键。本文将探讨一些重要的前端开发最佳实践。</p>
            
            <h3>1. 组件化开发</h3>
            <p>将UI拆分为可重用的组件是现代前端框架的核心概念。即使在使用原生JavaScript时，也可以采用类似的思维模式，创建模块化和可维护的代码结构。</p>
            
            <h3>2. 响应式设计</h3>
            <p>确保网站在各种设备上都能良好显示是必不可少的。使用CSS媒体查询、弹性布局和相对单位来创建适应不同屏幕尺寸的界面。</p>
            
            <h3>3. 性能优化</h3>
            <p>优化图片、最小化HTTP请求、使用懒加载和代码分割等技术可以显著提高网站性能，提供更好的用户体验。</p>
            
            <h3>4. 可访问性</h3>
            <p>确保网站对所有用户都可访问，包括使用屏幕阅读器的用户。使用语义HTML、适当的ARIA属性和键盘导航支持。</p>
            
            <p>通过遵循这些最佳实践，您可以创建高质量、可维护且用户友好的前端应用程序。</p>
        `
    },
    2: {
        title: "响应式设计指南",
        date: "2023年10月10日",
        image: "https://picsum.photos/800/600?random=2",
        content: `
            <p>响应式设计已成为现代网页开发的标准实践。本文将介绍创建响应式网站的关键原则和技术。</p>
            
            <h3>流动布局</h3>
            <p>使用百分比而不是固定像素值来定义容器宽度，使布局能够适应不同的屏幕尺寸。</p>
            
            <h3>媒体查询</h3>
            <p>CSS媒体查询允许您根据设备特性（如屏幕宽度、高度和方向）应用不同的样式规则。</p>
            
            <h3>弹性图片</h3>
            <p>确保图片能够随容器大小调整，使用max-width: 100%防止图片溢出容器。</p>
            
            <h3>移动优先</h3>
            <p>采用移动优先的设计方法，先为移动设备设计，然后使用媒体查询为更大的屏幕添加增强功能。</p>
            
            <h3>响应式排版</h3>
            <p>使用相对单位（如rem和em）和视口单位（如vw和vh）来创建适应不同屏幕大小的排版。</p>
            
            <p>通过实施这些技术，您可以创建在各种设备上都能提供出色用户体验的网站。</p>
        `
    },
    3: {
        title: "JavaScript ES2023 新特性",
        date: "2023年10月5日",
        image: "https://picsum.photos/800/600?random=3",
        content: `
            <p>ECMAScript 2023（ES14）为JavaScript语言带来了一些有趣的新特性。本文将介绍这些新功能及其使用场景。</p>
            
            <h3>1. 数组查找方法</h3>
            <p>ES2023为数组添加了findLast()和findLastIndex()方法，允许从数组末尾开始查找元素。</p>
            
            <h3>2. Hashbang语法正式化</h3>
            <p>Hashbang（#!）语法现在在ECMAScript标准中正式支持，允许JavaScript文件作为可执行脚本运行。</p>
            
            <h3>3. WeakMap支持符号键</h3>
            <p>WeakMap现在支持使用符号作为键，这为内存管理提供了更多的灵活性。</p>
            
            <h3>4. 数组拷贝方法</h3>
            <p>新的toSorted()、toReversed()、toSpliced()和with()方法允许在不改变原数组的情况下执行操作。</p>
            
            <h3>5. 正则表达式改进</v>
            <p>ES2023引入了/v标志用于正则表达式，提供了更严格的Unicode属性转义匹配。</p>
            
            <p>这些新特性使JavaScript更加强大和表达力丰富，同时保持了向后兼容性。</p>
        `
    }
};

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 菜单切换功能
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // 文章卡片点击事件
    const articleCards = document.querySelectorAll('.article-card');
    const articlesSection = document.getElementById('articles');
    const articleDetailSection = document.getElementById('article-detail');
    const backButton = document.querySelector('.back-button');
    
    articleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 防止点击按钮时触发卡片点击事件
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
                return;
            }
            
            const articleId = this.getAttribute('data-id');
            showArticleDetail(articleId);
        });
        
        // 阅读更多按钮点击事件
        const readMoreBtn = card.querySelector('.read-more');
        if (readMoreBtn) {
            readMoreBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                const articleId = card.getAttribute('data-id');
                showArticleDetail(articleId);
            });
        }
    });
    
    // 返回按钮点击事件
    if (backButton) {
        backButton.addEventListener('click', function() {
            articleDetailSection.classList.add('hidden');
            articlesSection.classList.remove('hidden');
            window.scrollTo(0, 0);
        });
    }
    
    // 导航链接平滑滚动
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // 隐藏文章详情视图（如果可见）
                if (articleDetailSection && !articleDetailSection.classList.contains('hidden')) {
                    articleDetailSection.classList.add('hidden');
                    articlesSection.classList.remove('hidden');
                }
                
                // 关闭移动端菜单
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                }
                
                // 滚动到目标区域
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // 显示文章详情函数
    function showArticleDetail(articleId) {
        const article = articlesData[articleId];
        
        if (article) {
            // 更新文章详情内容
            document.querySelector('.article-title').textContent = article.title;
            document.querySelector('.article-meta').textContent = article.date;
            document.querySelector('.article-image').src = article.image;
            document.querySelector('.article-image').alt = article.title;
            document.querySelector('.article-body').innerHTML = article.content;
            
            // 切换视图
            articlesSection.classList.add('hidden');
            articleDetailSection.classList.remove('hidden');
            
            // 滚动到顶部
            window.scrollTo(0, 0);
        }
    }
});