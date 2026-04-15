        // 歌曲列表（包含歌曲名和路径）
        const songs = [
            
			{ name: '纯音乐-童年老家', path: 'E:/all_Audio/纯音乐/music/纯音乐-童年老家.mp3' },
            { name: '天边-马头琴', path: 'E:/all_Audio/纯音乐/music/天边-马头琴.mp3' },
			{ name: '鸿雁-马头琴', path: 'E:/all_Audio/纯音乐/music/鸿雁-马头琴.mp3' },
			{ name: '远古的梦', path: 'E:/all_Audio/纯音乐/music/远古的梦.mp3' },
			{ name: '画你', path: 'E:/all_Audio/纯音乐/music/画你.mp3' },
			{ name: '游牧时光', path: 'E:/all_Audio/纯音乐/music/游牧时光.mp3' },
			{ name: '光阴的故事', path: 'E:/all_Audio/纯音乐/music/光阴的故事.mp3' },
			{ name: '搀扶', path: 'E:/all_Audio/纯音乐/music/搀扶.mp3' },
            { name: '春江花月夜-古筝', path: 'E:/all_Audio/纯音乐/music/春江花月夜-古筝.mp3' },
            { name: '春江花月夜-琵琶', path: 'E:/all_Audio/纯音乐/music/春江花月夜-琵琶.mp3' },
            { name: '二泉映月-二胡', path: 'E:/all_Audio/纯音乐/music/二泉映月-二胡.mp3' },
            { name: '离骚-大提琴', path: 'E:/all_Audio/纯音乐/music/离骚-大提琴.mp3' },
            { name: '渔舟唱晚', path: 'E:/all_Audio/纯音乐/music/渔舟唱晚.mp3' },
            { name: '渔舟唱晚-陶笛', path: 'E:/all_Audio/纯音乐/music/渔舟唱晚-陶笛.mp3' },
            { name: '月光下的凤尾竹-葫芦丝', path: 'E:/all_Audio/纯音乐/music/月光下的凤尾竹-葫芦丝.mp3' },
            { name: '云水禅心', path: 'E:/all_Audio/纯音乐/music/云水禅心.mp3' },
        ];
        let currentSongIndex = 0;
        const audioPlayer = document.getElementById('audioPlayer');
        const songTitleElement = document.getElementById('songTitle');

        // 播放下一首歌曲
        function playNextSong() {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            updateSong();
        }

        // 更新歌曲和显示歌曲名
        function updateSong() {
            const currentSong = songs[currentSongIndex];
            audioPlayer.src = currentSong.path;
            songTitleElement.textContent = `正在播放:🍀${currentSong.name}`;
            audioPlayer.play();
        }

        // 当一首歌曲结束时，播放下一首
        audioPlayer.addEventListener('ended', playNextSong);

        // 初始化播放第一首歌曲
        updateSong();
