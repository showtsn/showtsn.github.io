        document.addEventListener('DOMContentLoaded', function() {
            const songList = document.getElementById('songList');
            const songPlayer = document.getElementById('songPlayer');
            const loading = document.getElementById('loading');
            const errorDiv = document.getElementById('error');
            
            // 模拟从D盘"歌曲"文件夹获取MP3文件
            // 注意：浏览器出于安全考虑，不能直接访问本地文件系统
            // 这是一个模拟实现，实际应用中需要通过服务器或Electron等框架实现
            
            try {
        const songs = [
            { name: '🌻读《滕王阁序》1', path: './AUVI/songs/读《滕王阁序》1.mp3' },
			 { name: '🌻不依不饶就是画地为牢', path: './AUVI/songs/不依不饶就是画地为牢.mp3' },
            { name: '🌻不因生气而说刻薄的话', path: './AUVI/songs/不因生气而说刻薄的话.mp3' },
			{ name: '🌻人生本过客，何必千千结', path: './AUVI/songs/人生本过客，何必千千结.mp3' },
            { name: '🌻朝花夕拾的含义', path: './AUVI/songs/朝花夕拾的含义.mp3' },
            { name: '🌻做人就像仙人掌', path: './AUVI/songs/做人就像仙人掌.mp3' },
            { name: '🌻人生最重要的四个习惯', path: './AUVI/songs/人生最重要的四个习惯.mp3' },
            { name: '🌻为人处事_01', path: './AUVI/songs/为人处事_01.mp3' },
			{ name: '🌻萨克斯_想你的时候问月亮', path: './AUVI/songs/萨克斯_想你的时候问月亮.mp3' },
			{ name: '🌻10首葫芦丝', path: './AUVI/songs/10首葫芦丝.mp3' },
            { name: '🌻画你', path: './AUVI/songs/画你.mp3' },
            { name: '🌻斯卡布罗集市', path: './AUVI/songs/斯卡布罗集市.mp3' },
            { name: '🌻光阴的故事', path: './AUVI/songs/光阴的故事.mp3' },
            { name: '🌻鸿雁', path: './AUVI/songs/鸿雁.mp3' },
            { name: '🌻搀扶-歌曲', path: './AUVI/songs/搀扶-歌曲.mp3' },
            { name: '🌻弯弯的月亮', path: './AUVI/songs/弯弯的月亮.mp3' },
            { name: '🌻红枣树', path: './AUVI/songs/红枣树.mp3' },
            { name: '🌻故乡是北京', path: './AUVI/songs/故乡是北京.mp3' },
            { name: '🌻在云端', path: './AUVI/songs/在云端.mp3' },
            { name: '🌻再过二十年我们来相会', path: './AUVI/songs/再过二十年我们来相会.mp3' }, 
            { name: '🌻毛主席的话记心上', path: './AUVI/songs/毛主席的话记心上.mp3' },
            { name: '🌻军港之夜', path: './AUVI/songs/军港之夜.mp3' },
            { name: '🌻童年', path: './AUVI/songs/童年.mp3' },
            { name: '🌻梦里水乡', path: './AUVI/songs/梦里水乡.mp3' },
            { name: '🌻命运不是辘轳', path: './AUVI/songs/命运不是辘轳.mp3' },
            { name: '🌻映山红', path: './AUVI/songs/映山红.mp3' },
            { name: '🌻莫斯科郊外的晚上', path: './AUVI/songs/莫斯科郊外的晚上.mp3' },
            { name: '🌻阿佤人民唱新歌', path: './AUVI/songs/阿佤人民唱新歌.mp3' },
            { name: '🌻常回家看看', path: './AUVI/songs/常回家看看.mp3' },
            { name: '🌻家乡', path: './AUVI/songs/家乡.mp3' },
        ];
                
                loading.style.display = 'none';
                
                songs.forEach(song => {
                    const li = document.createElement('li');
                    li.className = 'song-item';
                    li.textContent = song.name;
                    li.addEventListener('click', function() {
                        // 移除所有歌曲的playing类
                        document.querySelectorAll('.song-item').forEach(item => {
                            item.classList.remove('playing');
                        });
                        
                        // 为当前歌曲添加playing类
                        this.classList.add('playing');
                        
                        // 尝试播放歌曲
                        try {
                            // 注意：浏览器不能直接访问本地文件系统路径
                            // 这里只是模拟，实际应用中需要提供正确的URL或使用Electron等框架
                            songPlayer.src = song.path;
                            songPlayer.play().catch(e => {
                                errorDiv.textContent = '无法播放歌曲: ' + e.message;
                            });
                        } catch (e) {
                            errorDiv.textContent = '错误: ' + e.message;
                        }
                    });
                    songList.appendChild(li);
                });
            } catch (e) {
                loading.style.display = 'none';
                errorDiv.textContent = '加载歌曲列表失败: ' + e.message;
            }
        });


