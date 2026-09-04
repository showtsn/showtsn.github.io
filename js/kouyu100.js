        // 图片数据
        const images = [
            {
                 url: './img/kouyu100/image1.png',
                title: '图01',
                desc: '图片描述'
            },
            {
                 url: './img/kouyu100/image2.png',
                title: '图02',
                desc: '图片描述'
            },
            {
                url: './img/kouyu100/image3.png',
                title: '图03',
                desc: '图片描述'
            },
            {
                 url: './img/kouyu100/image4.png',
                title: '图04',
                desc: '图片描述'
            },
            {
                 url: './img/kouyu100/image5.png',
                title: '图片标题',
                desc: '图片描述'
            },
            {
                 url: './img/kouyu100/image6.png',
                title: '图片标题',
                desc: '图片描述'
            },
            {
                 url: './img/kouyu100/image7.png',
                title: '图片标题',
                desc: '图片描述'
            },
            {
                url: './img/kouyu100/image8.png',
                title: '图片标题',
                desc: '图片描述'
            },
            {
                url: './img/kouyu100/image9.png',
                title: '图片标题',
                desc: '图片描述'
            },	
            {
                url: './img/kouyu100/image10.png',
                title: '图片标题',
                desc: '图片描述'
            },		
            {
                url: './img/kouyu100/image11.png',
                title: '图片标题',
                desc: '图片描述'
            },		
            {
                url: './img/kouyu100/image12.png',
                title: '图片标题',
                desc: '图片描述'
            },		
            {
                url: './img/kouyu100/image13.png',
                title: '图片标题',
                desc: '图片描述'
            },	
            {
                url: './img/kouyu100/image14.png',
                title: '图片标题',
                desc: '图片描述'
            },		
            {
                url: './img/kouyu100/image15.png',
                title: '图片标题',
                desc: '图片描述'
            },		
            {
                url: './img/kouyu100/image16.png',
                title: '图片标题',
                desc: '图片描述'
            },				
            {
                url: './img/kouyu100/image17.png',
                title: '图片标题',
                desc: '图片描述'
            }		
        ];

        // 当前图片索引
        let currentIndex = 0;
        
        // DOM元素
        const currentImage = document.getElementById('current-image');
        const imageTitle = document.getElementById('image-title');
        const imageDesc = document.getElementById('image-desc');
        const currentIndexElement = document.getElementById('current-index');
        const totalCountElement = document.getElementById('total-count');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const thumbnailContainer = document.getElementById('thumbnail-container');
        
        // 初始化
        function init() {
            // 设置图片总数
            totalCountElement.textContent = images.length;
            
            // 加载当前图片
            loadImage(currentIndex);
            
            // 生成缩略图
            generateThumbnails();
            
            // 添加事件监听器
            prevBtn.addEventListener('click', showPrevImage);
            nextBtn.addEventListener('click', showNextImage);
            
            // 添加键盘事件监听
            document.addEventListener('keydown', handleKeyPress);
            
            // 更新按钮状态
            updateButtonState();
        }
        
        // 加载图片
        function loadImage(index) {
            const image = images[index];
            
            // 添加淡入效果
            currentImage.classList.remove('fade-in');
            
            // 使用setTimeout确保动画重新触发
            setTimeout(() => {
                currentImage.src = `${image.url}?w=800&h=450&fit=crop`;
                currentImage.alt = image.title;
                imageTitle.textContent = image.title;
                imageDesc.textContent = image.desc;
                currentIndexElement.textContent = index + 1;
                
                // 高亮当前缩略图
                highlightThumbnail(index);
                
                // 添加淡入效果
                currentImage.classList.add('fade-in');
                
                // 更新按钮状态
                updateButtonState();
            }, 50);
        }
        
        // 生成缩略图
        function generateThumbnails() {
            thumbnailContainer.innerHTML = '';
            
            images.forEach((image, index) => {
                const thumbnail = document.createElement('img');
                thumbnail.src = `${image.url}?w=100&h=70&fit=crop`;
                thumbnail.alt = `缩略图: ${image.title}`;
                thumbnail.className = 'thumbnail';
                
                if (index === currentIndex) {
                    thumbnail.classList.add('active');
                }
                
                thumbnail.addEventListener('click', () => {
                    currentIndex = index;
                    loadImage(currentIndex);
                });
                
                thumbnailContainer.appendChild(thumbnail);
            });
        }
        
        // 高亮当前缩略图
        function highlightThumbnail(index) {
            const thumbnails = document.querySelectorAll('.thumbnail');
            thumbnails.forEach((thumb, i) => {
                if (i === index) {
                    thumb.classList.add('active');
                } else {
                    thumb.classList.remove('active');
                }
            });
        }
        
        // 显示上一张图片
        function showPrevImage() {
            if (currentIndex > 0) {
                currentIndex--;
                loadImage(currentIndex);
            }
        }
        
        // 显示下一张图片
        function showNextImage() {
            if (currentIndex < images.length - 1) {
                currentIndex++;
                loadImage(currentIndex);
            }
        }
        
        // 更新按钮状态
        function updateButtonState() {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === images.length - 1;
        }
        
        // 处理键盘按键
        function handleKeyPress(event) {
            if (event.key === 'ArrowLeft') {
                showPrevImage();
            } else if (event.key === 'ArrowRight') {
                showNextImage();
            }
        }
        
        // 页面加载完成后初始化
        document.addEventListener('DOMContentLoaded', init);