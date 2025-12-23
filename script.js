// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    console.log('宠物露营餐吧商业计划网站已加载！');
    
    // 1. 移动端菜单切换
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden'; // 防止滚动
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // 点击菜单链接后关闭菜单
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // 2. 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 3. 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        // 导航栏效果
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 返回顶部按钮
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // 4. 返回顶部功能
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 5. 资源需求标签页切换
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // 移除所有活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });
            
            // 添加当前活动状态
            this.classList.add('active');
            const activeTab = document.getElementById(`${tabId}-tab`);
            if (activeTab) {
                activeTab.classList.add('active');
                activeTab.style.display = 'block';
            }
        });
    });
    
    // 6. 创建现金流图表
    const cashflowChart = document.getElementById('cashflowChart');
    if (cashflowChart) {
        const ctx = cashflowChart.getContext('2d');
        
        // 数据来自你的财务预算表
        const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月'];
        const revenue = [0, 180, 220, 350, 380, 280, 300, 210, 360, 400]; // 单位：千元
        const costs = [710, 187, 190, 313, 310, 232, 202, 211, 304, 318]; // 单位：千元
        const netCash = [460, 137, 11, 37, 70, 38, 103, -6, -2, 7]; // 单位：千元
        
        // 转换为实际金额（万元）
        const revenueData = revenue.map(value => value);
        const costData = costs.map(value => value);
        const netData = netCash.map(value => value);
        
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [
                    {
                        label: '营业收入 (千元)',
                        data: revenueData,
                        borderColor: '#2ecc71',
                        backgroundColor: 'rgba(46, 204, 113, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: '运营成本 (千元)',
                        data: costData,
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: '净现金流 (千元)',
                        data: netData,
                        borderColor: '#4a6fa5',
                        backgroundColor: 'rgba(74, 111, 165, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                family: "'Noto Sans SC', sans-serif",
                                size: 14
                            },
                            padding: 20
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ¥${context.parsed.y}千元`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: "'Noto Sans SC', sans-serif",
                                size: 12
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            font: {
                                family: "'Noto Sans SC', sans-serif",
                                size: 12
                            },
                            callback: function(value) {
                                return '¥' + value + '千';
                            }
                        },
                        title: {
                            display: true,
                            text: '金额 (千元)',
                            font: {
                                family: "'Noto Sans SC', sans-serif",
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'nearest'
                }
            }
        });
        
        // 调整图表大小
        window.addEventListener('resize', function() {
            chart.resize();
        });
    }
    
    // 7. 统计数字动画
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + (element.textContent.includes('+') ? '+' : '');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // 观察器触发动画
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 触发统计数字动画
                const statNumbers = entry.target.querySelectorAll('.stat-number, .highlight-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const numericValue = parseFloat(text.replace(/[^0-9.]/g, ''));
                    if (!isNaN(numericValue) && numericValue > 0) {
                        animateValue(stat, 0, numericValue, 1500);
                    }
                });
                
                // 触发图表动画（如果有）
                if (entry.target.id === 'financial') {
                    // 图表已经在加载时创建，这里可以触发其他动画
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有主要部分
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
    
    // 8. 页面加载时的初始动画
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // 9. 卡片悬停效果增强
    const cards = document.querySelectorAll('.framework-card, .legal-card, .customer-segment, .trend-card, .swot-card, .resource-card, .kpi-card, .budget-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // 10. 打印功能（可选）
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> 打印报告';
    printButton.className = 'btn btn-primary';
    printButton.style.position = 'fixed';
    printButton.style.bottom = '90px';
    printButton.style.right = '30px';
    printButton.style.zIndex = '998';
    printButton.style.display = 'none';
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    document.body.appendChild(printButton);
    
    // 在滚动到一定位置后显示打印按钮
    window.addEventListener('scroll', function() {
        if (window.scrollY > 1000) {
            printButton.style.display = 'block';
        } else {
            printButton.style.display = 'none';
        }
    });
    
    // 11. 键盘快捷键支持
    document.addEventListener('keydown', function(e) {
        // Esc键关闭菜单
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            document.body.style.overflow = 'auto';
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        
        // 空格键回到顶部
        if (e.key === ' ' && e.target === document.body) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
    
    // 12. 添加加载动画
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loadingOverlay';
    loadingOverlay.style.position = 'fixed';
    loadingOverlay.style.top = '0';
    loadingOverlay.style.left = '0';
    loadingOverlay.style.width = '100%';
    loadingOverlay.style.height = '100%';
    loadingOverlay.style.backgroundColor = 'white';
    loadingOverlay.style.display = 'flex';
    loadingOverlay.style.alignItems = 'center';
    loadingOverlay.style.justifyContent = 'center';
    loadingOverlay.style.zIndex = '9999';
    loadingOverlay.style.transition = 'opacity 0.5s ease';
    
    loadingOverlay.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 80px; height: 80px; border: 5px solid #f3f3f3; border-top: 5px solid #4a6fa5; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
            <h3 style="color: #4a6fa5; font-family: 'Noto Sans SC', sans-serif;">加载宠物露营餐吧商业计划...</h3>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    document.body.appendChild(loadingOverlay);
    
    // 页面加载完成后隐藏加载动画
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }, 1000);
    });
    
    // 如果页面已经加载完成（从缓存加载）
    if (document.readyState === 'complete') {
        loadingOverlay.style.display = 'none';
    }
    
    console.log('网站交互功能初始化完成！');
});
