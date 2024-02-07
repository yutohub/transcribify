let player; // YouTubeプレーヤーオブジェクト
let isPlayerReady = false; // プレーヤーの準備完了フラグ
let currentVideoId = ''; // 現在再生中の動画ID
let subtitles = []; // 字幕データ
const videoIds = [
  "DY3sT4yIezs",
  "58rZylfxnjE",
  "86Gy035z_KA",
  "j_AtQ6N4jQc",
  "dtp6b76pMak",
  "WLz9oDYKxIs",
  "uYZftCq2efg",
  "wQEl0GGxPcM",
  "54UThDl00qI",
  "3Nq3ye-QCyM",
  "ycPr5-27vSI",
  "U9mJuUkhUzk",
  "bZQun8Y4L2A",
  "8xI10SFgzQ8",
  "unAi03uc8S0",
  "D8PM89Xry7Q",
  "P2esMVUPhxA",
  "LB9ovOjrw6U",
  "9ISVjh8mdlA",
  "JVJPAYwY8Us",
  "ky1Z2klPalw",
  "zjkBMFhNj_g",
  "f4LeWlt3T8Y",
  "f4NOJ42-BKM",
  "T58o49xcZE4",
  "t3YJ5hKiMQ0",
  "zA4yiCmZu3U",
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
  "PkXELH6Y2lM",
  "3Zu8Zsqw26s",
  "wt22M5nWJ4Q",
  "93yueQQnqpM",
  "pjc_oo4ApSY",
  "wD14hb4d04c",
  "Df_2BBTvJ2o",
  "feQhHStBVLE",
  "v_BnBEubv58",
  "OS1yRYsXddU",
  "ahnGLM-RC1Y",
  "umhl2hakkcY",
  "sYyVi-H-ozI",
  "dmFhhHMsMUk",
  "liVll-GVF3Q",
  "PDwUKves9GY",
  "g2R2T631x7k",
  "Rty_HFuyG4I",
  "kCc8FmEb1nY",
  "pq34V_V5j18",
  "knHW-p31R0c",
  "4sRigbRITF0",
  "rJKN_880b-M",
  "bRFLE9qi3t8",
  "ZB1nn3JWyec",
  "Le6c4ZaFyAE",
  "in9ubCilsT8",
  "WsYABsWMFqc",
  "euYa4iesOm8",
  "GchC5WxeXGc",
]; // YouTube video IDs

// YouTube IFrame Player APIの読み込み
function loadYouTubePlayerAPI(callback) {
  const tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  window.onYouTubeIframeAPIReady = callback;
}

// 動画の埋め込みと再生
function embedYouTubeVideo(videoId) {
  currentVideoId = videoId; // 現在の動画IDを保存
  if (player) player.destroy();
  player = new YT.Player('player', {
    height: '480',
    width: '720',
    videoId,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// プレーヤーの準備完了時の処理
function onPlayerReady() {
  isPlayerReady = true;
  checkSubtitleFile(currentVideoId); // 字幕ファイルの存在確認
}

// 字幕ファイルの存在確認
async function checkSubtitleFile(videoId) {
  const subtitleUrl = `https://raw.githubusercontent.com/yutohub/transcribify/main/subtitles/${videoId}.json`;
  try {
    const response = await fetch(subtitleUrl);
    if (!response.ok) throw new Error('Subtitle file not found');
    subtitles = await response.json();
  } catch (error) {
    console.error(error);
    subtitles = []; // 字幕データをリセット
    displaySubtitleNotFoundMessage();
  }
}

// 字幕が存在しない場合のメッセージ表示
function displaySubtitleNotFoundMessage() {
  document.getElementById('subtitle').textContent = '字幕が見つかりませんでした。リクエストを送信してください。';
}

// プレーヤーの状態変更時の処理
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    updateCurrentTime(); // 再生時間表示の更新
    updateSubtitle(); // 字幕の更新
  }
}

// ページの読み込みが完了したらYouTube Player APIを読み込む
window.addEventListener('DOMContentLoaded', () => {
  loadYouTubePlayerAPI(initUI);
});

function initUI() {
  document.getElementById('load-button').addEventListener('click', loadVideo);
  document.getElementById('pause-button').addEventListener('click', () => { if (isPlayerReady) player.pauseVideo(); });
  document.getElementById('play-button').addEventListener('click', () => { if (isPlayerReady) player.playVideo(); });
}

function loadVideo() {
  scrollToTop();
  const videoId = getVideoIdFromUrl(document.getElementById('video-url').value);
  embedYouTubeVideo(videoId);
  document.getElementById('subtitle').textContent = '';
}

// YouTubeのURLから動画IDを取得する
function getVideoIdFromUrl(url) {
  const match = url.match(/[?&]v=([^&#]*)/);
  return match ? match[1] : null;
}

// 再生時間表示の更新
function updateCurrentTime() {
  setInterval(() => {
    if (isPlayerReady) {
      const currentTimeElement = document.getElementById('current-time');
      currentTimeElement.textContent = `${formatTime(player.getCurrentTime())} / ${formatTime(player.getDuration())}`;
    }
  }, 1000);
}

// 現在の再生時間に該当する字幕を表示
function updateSubtitle() {
  setInterval(() => {
    if (isPlayerReady) {
      const millisecond = player.getCurrentTime() * 1000;
      const subtitleElement = document.getElementById('subtitle');
      const currentSubtitle = subtitles.find(sub => millisecond >= sub.start && millisecond < sub.end);
      subtitleElement.textContent = currentSubtitle ? currentSubtitle.text : '';
    }
  }, 1000);
}

// 時間を分:秒の形式に整形する
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// サムネイルの表示
const thumbnailsContainer = document.getElementById("thumbnails-container");
videoIds.forEach(id => thumbnailsContainer.appendChild(createThumbnail(`http://img.youtube.com/vi/${id}/mqdefault.jpg`)));

function createThumbnail(url) {
  const thumbnail = document.createElement("img");
  thumbnail.src = url;
  thumbnail.classList.add("cursor-pointer", "rounded-lg", "transition-all", "duration-300");
  thumbnail.addEventListener("click", async () => { // 非同期処理を追加
    const videoId = extractVideoId(url);
    await checkSubtitleFile(videoId); // 字幕ファイルの確認と読み込み
    scrollToTop();
    embedYouTubeVideo(videoId);
  });
  thumbnail.addEventListener("mouseenter", () => thumbnail.classList.add("ring", "ring-offset-2", "ring-indigo-500"));
  thumbnail.addEventListener("mouseleave", () => thumbnail.classList.remove("ring", "ring-offset-2", "ring-indigo-500"));
  return thumbnail;
}

function extractVideoId(url) {
  const match = url.match(/vi\/([^/?]+)/);
  return match ? match[1] : null;
}
