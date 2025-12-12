var audio=document.getElementById
('audioTag');
var playPause=document.
getElementsByClassName('playPause')[0];

var recordImg=document.getElementsByClassName('record-img')[0];
var body=document.body;
var musicTitle=document.getElementsByClassName('music-title')[0];
var authorName=document.getElementsByClassName('author-name')[0];
var beforeMusic=document.getElementsByClassName('beforeMusic')[0];
var nextMusic=document.getElementsByClassName('nextMusic')[0];
var playedTime=document.
getElementsByClassName('played-time')[0];
var totalTime=document.
getElementsByClassName('audio-time')[0];

var progressPlayed=document.getElementsByClassName('progress-played')[0];

var playMode=document.getElementsByClassName('playMode')[0];
var totleProgress=document.
getElementsByClassName('progress')[0];

var volumn=document.getElementsByClassName('volumn')[0];
var volumnTogger=document.getElementById('volumn-togger');

var speed=document.getElementsByClassName('speed')[0];

var listIcon=document.getElementsByClassName('list')[0];
var closeList=document.getElementsByClassName('close-list')[0];
var musicList=document.getElementsByClassName('musicList-container')[0];
var musicNameList=document.getElementsByClassName('musics-list')[0];
var musicId=0;
var musicData=[
    ['666','邵骏杰'],
    ['25216950119','邵骏杰'],
    ['邵骏杰','25216950119'],
    ['邵骏杰','25216950119'],
]
function initMusic(){
    audio.src=`./mp3/music${musicId}.mp3`
    audio.load();
    recordImg.classList.remove
    ('rotate-play');
    audio.onloadedmetadata=function(){
        recordImg.style.backgroundImage=`url('./img/record${musicId}.jpg')`;
        body.style.backgroundImage=`url('./img/bg${musicId}.png')`;
        refreshRotate();
        musicTitle.innerText=musicData[musicId][0];
        authorName.innerText=musicData[musicId][1];

        totalTime.innerText=transTime(audio.duration);
        audio.currentTime=0;
        updateProgress();
    };
}
initMusic();



function initAndplay(){
    initMusic();
    audio.play();
    playPause.classList.remove('icon-play');
    playPause.classList.add('icon-pause');
    rotateRecord();
}

playPause.addEventListener('click',
    function(){
        if(audio.paused){
            audio.play();
            rotateRecord();
             playPause.classList.remove('icon-play');
             playPause.classList.add('icon-pause');
        }else{
            audio.pause();
            rotateRecordStop();
            playPause.classList.remove('icon-pause');
             playPause.classList.add('icon-play');
        }
    }
);

function rotateRecord(){
    recordImg.style.
    animationPlayState='running';
}

function rotateRecordStop(){
    recordImg.style.animationPlayState='paused';
}
function refreshRotate(){
    recordImg.classList.add
    ('rotate-play');
}

nextMusic.addEventListener(
    'click',
    function(){
        musicId++;
        if(musicId>=musicData.length){
            musicId=0;
        }
        initAndplay();
    }
);

beforeMusic.addEventListener(
    'click',
    function(){
        musicId--;
        if(musicId<=0){
            musicId=musicData.length-1;
        }
        initAndplay();
    }
);



function transTime(value){
 var hour=parseInt(value/3600);
 var minutes=parseInt((value%3600)/60);
 var seconds=parseInt(value%60);

 if(hour>0){
   return `${hour.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}}:${
 seconds.toString().padStart(2,'0')}`;
 }
 return `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}

audio.addEventListener('timeupdate',updateProgress);
function updateProgress(){
  playedTime.innerText = transTime(audio.currentTime);
  var value=audio.currentTime / audio.duration;
  progressPlayed.style.width=value*100+'%';
  
}

var modeId=1;
playMode.addEventListener('click',function(){
    modeId++;
    if(modeId>3){
     modeId=1;
    }
    playMode.style.backgroundImage=`url('./img/mode${modeId}.png')`;
});


audio.addEventListener('ended',
   function(){
    if(modeId==2){
     musicId=(musicId+1)%musicData.length;
    }else if(modeId==3){
        var oldId=musicId;
        while(true){
     musicId=Math.floor(Math.random()*musicData.length);
        if(musicId!=oldId){
          break;
        }
        }
    }
    initAndplay();
   });




   totleProgress.addEventListener('mousedown',
   function(event){
    if(!audio.paused||audio.currentTime!=0){
      var pgswidth=totleProgress.getBoundingClientRect().width;
      var rate=event.offsetX/pgswidth;
      audio.currentTime=audio.duration*rate;
      updateProgress(audio);
    }
   }
   );


   //音量调节
   let lastVolumn=70;
   audio.volumn=lastVolumn/100;
   audio.addEventListener('timeupdate',updateVolumn);
   function updateVolumn(){
    audio.volumn=volumnTogger.value/100;
   }

volumn.addEventListener('click',
    setNoVolumn
);
   //点击音量按钮
   function setNoVolumn(){
    audio.muted=!audio.muted;
    if(audio.muted){
      lastVolumn=volumnTogger.value;
      volumnTogger.value=0;
      volumn.style.backgroundImage=`url('./img/静音.png')`;
    }else{
        volumnTogger.value=lastVolumn;
        volumn.style.backgroundImage=`url('./img/音量.png')`;
    }
   }

   speed.addEventListener('click',function(){
    var speedText=speed.innerText;
    if(speedText=='1.0X'){
        speed.innerText='1.5X';
        audio.playbackRate=1.5;
    }else if(speedText=='1.5X'){
        speed.innerText='2.0X';
        audio.playbackRate=2.0;
    }else if(speedText=='2.0X'){
        speed.innerText='0.5X';
        audio.playbackRate=0.5;
    }else if(speedText=='0.5X'){
        speed.innerText='1.0X';
        audio.playbackRate=1.0;
    }
   });

   listIcon.addEventListener('click',
    function(){
        musicList.classList.remove('list.hide');
        musicList.classList.add('list.show');
        closeList.style.display='block';
        musicList.style.display='block';
    }
   );

   closeList.addEventListener('click',
    function(){
        musicList.classList.remove('list.show');
        musicList.classList.add('list.hide');
        closeList.style.display='none';
        musicList.style.display='none';
    }
   );

   //创建列表歌单
   function createMusicList(){
    for(let i=0;i<musicData.length;i++){
        let div=document.createElement('div');
        div.innerText=`${musicData[i][0]}`;
        
        musicNameList.appendChild(div);
        div.addEventListener('click',function(){
            musicId=i;
            initAndplay();
        });
    }
   }

   document.addEventListener('DOMContentLoaded',createMusicList)








   
// MV变量
var mvBtn = document.querySelector('.MV');
var mvContainer = null;
var mvVideo = null;
var isMvMode = false;
var mvData = [
    './mp4/video0.mp4',
    './mp4/video1.mp4', 
    './mp4/video2.mp4',
    './mp4/video3.mp4'
];

// 创建MV容器
function createMvContainer() {
    if(mvContainer) return;
    
    mvContainer = document.createElement('div');
    mvContainer.className = 'mv-container';
    document.body.appendChild(mvContainer);
    
    // 关闭按钮
    var closeBtn = document.createElement('div');
    closeBtn.className = 'mv-close-btn';
    closeBtn.innerHTML = '×';
    closeBtn.addEventListener('click', closeMv);
    mvContainer.appendChild(closeBtn);
    
    // 视频元素
    mvVideo = document.createElement('video');
    mvVideo.className = 'mv-video';
    mvVideo.controls = true;
    mvContainer.appendChild(mvVideo);
}

// 加载MV
function loadMv() {
    if(!mvVideo || !isMvMode) return;
    if(musicId >= mvData.length) return;
    
    mvVideo.src = mvData[musicId];
    mvVideo.currentTime = audio.currentTime;
    mvVideo.play();
}

// 打开MV
function openMv() {
    if(musicId >= mvData.length) return;
    
    createMvContainer();
    isMvMode = true;
    mvBtn.classList.add('active');
    document.body.classList.add('mv-blur');
    
    mvContainer.style.display = 'flex';
    loadMv();
    
    // 暂停音乐（MV有声音）
    audio.pause();
    playPause.className = 'playPause center-icon icon-play';
    rotateRecordStop();
}

// 关闭MV
function closeMv() {
    if(!mvContainer) return;
    
    isMvMode = false;
    mvBtn.classList.remove('active');
    document.body.classList.remove('mv-blur');
    
    mvVideo.pause();
    mvContainer.style.display = 'none';
    
    // 恢复音乐播放
    if(!audio.paused) {
        audio.play();
        playPause.className = 'playPause center-icon icon-pause';
        rotateRecord();
    }
}

// MV按钮点击事件
mvBtn.addEventListener('click', function() {
    if(isMvMode) {
        closeMv();
    } else {
        openMv();
    }
});

// ESC键关闭MV
document.addEventListener('keydown', function(e) {
    if(e.key === 'Escape' && isMvMode) {
        closeMv();
    }
});

// 切换歌曲时关闭MV
nextMusic.addEventListener('click', function() {
    if(isMvMode) closeMv();
});

beforeMusic.addEventListener('click', function() {
    if(isMvMode) closeMv();
});
