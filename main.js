let player; // YouTubeプレーヤーオブジェクト
let isPlayerReady = false; // プレーヤーの準備完了フラグ
let subtitles = []; // 字幕データ

// YouTube IFrame Player APIの読み込み
function loadYouTubePlayerAPI(callback) {
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  window.onYouTubeIframeAPIReady = function() {
    if (typeof callback === 'function') {
      callback();
    }
  };
}

// 動画の埋め込みと再生
function embedYouTubeVideo(videoId) {
  if (player) {
    player.destroy();
    }
  player = new YT.Player('player', {
    height: '480',
    width: '720',
    videoId: videoId,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// プレーヤーの準備完了時の処理
function onPlayerReady(event) {
  isPlayerReady = true;
  const videoUrlInput = document.getElementById('video-url');
  const videoUrl = videoUrlInput.value;
  const videoId = getVideoIdFromUrl(videoUrl);
  checkSubtitleFile(videoId); // 字幕ファイルの存在確認
}

// 字幕ファイルの存在確認
function checkSubtitleFile(videoId) {
    const subtitleUrl = `https://raw.githubusercontent.com/yutohub/transcribify/main/subtitles/${videoId}.json`;
    fetch(subtitleUrl)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Subtitle file not found');
        }
      })
      .then(data => {
        subtitles = data;
        fetchData(videoId);
      })
      .catch(error => {
        console.error(error);
        subtitles = []; // 字幕データをリセット
        displaySubtitleNotFoundMessage();
        fetchData(videoId);
      });
  }

// 字幕が存在しない場合のメッセージ表示
function displaySubtitleNotFoundMessage() {
    const subtitleElement = document.getElementById('subtitle');
    subtitleElement.textContent = '字幕が見つかりませんでした。リクエストを送信してください。';
  }

// プレーヤーの状態変更時の処理
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    updateCurrentTime(); // 再生時間表示の更新
    updateSubtitle(); // 字幕の更新
  }
}

// ページの読み込みが完了したらYouTube Player APIを読み込む
window.addEventListener('DOMContentLoaded', function() {
  loadYouTubePlayerAPI(function() {
    const loadButton = document.getElementById('load-button');
    const pauseButton = document.getElementById('pause-button');
    const playButton = document.getElementById('play-button');
    const videoUrlInput = document.getElementById('video-url');
    loadButton.addEventListener('click', function() {
      const videoUrl = videoUrlInput.value;
      const videoId = getVideoIdFromUrl(videoUrl);
      embedYouTubeVideo(videoId);
      const subtitleElement = document.getElementById('subtitle');
      subtitleElement.textContent = '';
    });
    pauseButton.addEventListener('click', function() {
      if (isPlayerReady) {
        player.pauseVideo();
      }
    });
    playButton.addEventListener('click', function() {
      if (isPlayerReady) {
        player.playVideo();
      }
    });
  });
});

// YouTubeのURLから動画IDを取得する
function getVideoIdFromUrl(url) {
  const regex = /[?&]v=([^&#]*)/;
  const match = regex.exec(url);
  return match && match[1];
}

// TSVファイルを読み込む
async function fetchData(videoId) {
    const subtitleUrl = `https://raw.githubusercontent.com/yutohub/transcribify/main/subtitles/${videoId}.json`;
    const data = await fetch(subtitleUrl);
    subtitles = await data.json();
  }

// 再生時間表示の更新
function updateCurrentTime() {
  setInterval(function() {
    if (isPlayerReady) {
      const currentTime = formatTime(player.getCurrentTime());
      const duration = formatTime(player.getDuration());
      const currentTimeElement = document.getElementById('current-time');
      currentTimeElement.textContent = `${currentTime} / ${duration}`;
    }
  }, 1000);
}

// 現在の再生時間に該当する字幕を表示
function updateSubtitle() {
  setInterval(function() {
    if (isPlayerReady) {
      const millisecond = player.getCurrentTime() * 1000;
      for (let i = 0; i < subtitles.length; i++) {
        if (millisecond >= subtitles[i].start && millisecond < subtitles[i].end) {
          const subtitleElement = document.getElementById('subtitle');
          subtitleElement.textContent = subtitles[i].text;
          break;
        }
      }
    }
  }, 1000);
}

// 時間を分:秒の形式に整形する
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${padZero(minutes)}:${padZero(seconds)}`;
}

// 1桁の数字を0埋めする
function padZero(number) {
  return number.toString().padStart(2, '0');
}

// --- サムネイルを表示する --- //
// YouTube video IDs
const videoIds = [
  "DY3sT4yIezs",
  "58rZylfxnjE",
  "j_AtQ6N4jQc",
  "wQEl0GGxPcM",
  "54UThDl00qI",
  "ycPr5-27vSI",
  "U9mJuUkhUzk",
  "bZQun8Y4L2A",
  "D8PM89Xry7Q",
  "P2esMVUPhxA",
  "LB9ovOjrw6U",
  "9ISVjh8mdlA",
  "ky1Z2klPalw",
  "zjkBMFhNj_g",
  "f4LeWlt3T8Y",
  "f4NOJ42-BKM",
  "t3YJ5hKiMQ0",
  "cFCGUjc33aU",
  "sWRvSG7vL4g",
  "_EfEoSP7oYQ",
  "qKBubKO-798",
  "XGJNo8TpuVA",
  "cdiD-9MMpb0",
  "Q45sr5p_NmQ",
  "xCS76NGj3u4",
  "3yPBVii7Ct0",
  "lYxGYXjfrNI",
  "tKC1OgRcutg",
  "YXiRbRacTF0",
  "RcYjXbSJBN8",
  "Z7veiyN4LqU",
  "Lag9Pj_33hM",
  "93yueQQnqpM",
  "pjc_oo4ApSY",
  "wD14hb4d04c",
  "Df_2BBTvJ2o",
  "feQhHStBVLE",
  "v_BnBEubv58",
  "ahnGLM-RC1Y",
  "umhl2hakkcY",
  "sYyVi-H-ozI",
  "PDwUKves9GY",
  "g2R2T631x7k",
  "Rty_HFuyG4I",
  "kCc8FmEb1nY",
  "pq34V_V5j18",
  "knHW-p31R0c",
  "4sRigbRITF0",
  "rJKN_880b-M",
  "Le6c4ZaFyAE",
  "in9ubCilsT8",
  "WsYABsWMFqc",
  "euYa4iesOm8",
  "GchC5WxeXGc",
];

const thumbnailUrls = videoIds.map(id => `http://img.youtube.com/vi/${id}/mqdefault.jpg`);
const thumbnailsContainer = document.getElementById("thumbnails-container");
thumbnailUrls.forEach(url => {
    const thumbnail = createThumbnail(url);
    thumbnailsContainer.appendChild(thumbnail);
});

function createThumbnail(url) {
    const thumbnail = document.createElement("img");
    thumbnail.src = url;
    thumbnail.classList.add("cursor-pointer", "rounded-lg", "transition-all", "duration-300");
    thumbnail.addEventListener("click", () => {
        const videoId = extractVideoId(url);
        const youtubeLink = `https://www.youtube.com/watch?v=${videoId}`;
        copyToClipboard(youtubeLink);
    });
    thumbnail.addEventListener("mouseenter", () => {
        thumbnail.classList.add("ring", "ring-offset-2", "ring-indigo-500");
    });
    thumbnail.addEventListener("mouseleave", () => {
        thumbnail.classList.remove("ring", "ring-offset-2", "ring-indigo-500");
    });
    return thumbnail;
}

function extractVideoId(url) {
    const videoIdMatch = url.match(/vi\/([^/?]+)/);
    return videoIdMatch ? videoIdMatch[1] : null;
}

function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
}
