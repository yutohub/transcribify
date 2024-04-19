let player; // YouTubeプレーヤーオブジェクト
let isPlayerReady = false; // プレーヤーの準備完了フラグ
let currentVideoId = ''; // 現在再生中の動画ID
let subtitles = []; // 字幕データ
const videoIds = [
  "58rZylfxnjE",
  "86Gy035z_KA",
  "dtp6b76pMak",
  "WLz9oDYKxIs",
  "8xI10SFgzQ8",
  "unAi03uc8S0",
  "JVJPAYwY8Us",
  "zA4yiCmZu3U",
  "wt22M5nWJ4Q",
  "OS1yRYsXddU",
  "dmFhhHMsMUk",
  "liVll-GVF3Q",
  "Df_2BBTvJ2o",
  "mWaMSGwiSB0",
  "uYZftCq2efg",
  "f4LeWlt3T8Y",
  "wQEl0GGxPcM",
  "lYxGYXjfrNI",
  "4sRigbRITF0",
  "v_BnBEubv58",
  "GchC5WxeXGc",
  "D8PM89Xry7Q",
  "cFCGUjc33aU",
  "sWRvSG7vL4g",
  "Q45sr5p_NmQ",
  "3yPBVii7Ct0",
  "AZnGRKFUU0c",
  "4jBJhCaNrWU",
  "Lag9Pj_33hM",
  "BE-L7xu8pO4",
  "PDwUKves9GY",
  "ZB1nn3JWyec",
  "g_wlZ9IhbTs",
  "93yueQQnqpM",
  "euYa4iesOm8",
  "DY3sT4yIezs",
  "54UThDl00qI",
  "U9mJuUkhUzk",
  "bZQun8Y4L2A",
  "9ISVjh8mdlA",
  "_EfEoSP7oYQ",
  "XGJNo8TpuVA",
  "cdiD-9MMpb0",
  "P2esMVUPhxA",
  "PkXELH6Y2lM",
  "3Zu8Zsqw26s",
  "ahnGLM-RC1Y",
  "g2R2T631x7k",
  "Rty_HFuyG4I",
  "pq34V_V5j18",
  "knHW-p31R0c",
  "tKC1OgRcutg",
  "YXiRbRacTF0",
  "bRFLE9qi3t8",
  "WsYABsWMFqc",
  "j_AtQ6N4jQc",
  "LB9ovOjrw6U",
  "T58o49xcZE4",
  "sYyVi-H-ozI",
  "Z7veiyN4LqU",
  "in9ubCilsT8",
  "ycPr5-27vSI",
  "RcYjXbSJBN8",
  "ky1Z2klPalw",
  "pjc_oo4ApSY",
  "f4NOJ42-BKM",
  "3Nq3ye-QCyM",
  "xCS76NGj3u4",
  "wD14hb4d04c",
  "feQhHStBVLE",
  "umhl2hakkcY",
  "rJKN_880b-M",
  "Le6c4ZaFyAE",
  "qKBubKO-798",
  "aIzv1o3t1Ac",
  "u19e3wf-nq8",
  "Xp2HxRm-nDI",
  "JMNcHpnHE4M",
  "jRjTtG8tYJM",
  "LWxYnSVuN9U",
  "t8RrvkMQqwE",
  "Jqvs4S57Xzs",
  "IqLvlZ_ZpMk",
  "l8mWvDUwOt4",
  "yYALsys-P_w",
  "PceVGWP0YJM",
  "8q2vICb89ys",
  "HnggP09mKpM",
  "KR22jigJLok",
  "12qdf3NAJmo",
  "qjJEQwE7nsc",
  "rO62xZ27BPE",
  "sZckj0SsWdU",
  "ASpw213hvh0",
  "ijBABDvlFV8",
  "errcSiGGj_k",
  "E4-pe4IP4Eo",
  "amgun49wsds",
  "BV9Xy6L_rlM",
  "df0TUKWnMNs",
  "LebeoXEkUg0",
  "Kz509oMxS7k",
  "15SNzFHJhRE",
  "D5u7trVY5Ho",
  "Lu56xVlZ40M",
  "eOH33sWgds8",
  "BufUW7h9TB8",
  "DuqLkG75BE8",
  "nbPbK1xYSNY",
  "POJ1w8H8OjY",
  "FWBnNcZv3kw",
  "Pvk4vqescz4",
  "LouCFKqt0rA",
  "9xXbY1o4GfY",
  "bHZ_nTvQOhc",
  "RBYJTop1e-g",
  "c8_tafixiAs",
  "DJvM2lSPn6w",
  "xQqsvRHjas4",
  "eAIXgisyZOg",
  "AF8d72mA41M",
  "iUOrH2FJKfo",
  "7uK-OmrMEz8",
  "s-V7gKrsels",
  "vrF3MtGwD0Y",
  "m0pIlLfpXWE",
  "Y_k3bHPcPTo",
  "Q1JCrG1bJ-A",
  "oSCRZkSQ1CE",
  "TnNqNJ8XXaQ",
  "Us5ZFp16PaU",
  "9770lpKQJE8",
  "0oAXlJO-5EQ",
  "a_n4yOqlWbA",
  "H-YMOhap3ZA",
  "UjtPSWsQguQ",
  "mTKwyCl34a8",
  "2ZAHunnZUAM",
  "XS8eRtlcCGU",
  "zduSFxRajkE",
  "zjkBMFhNj_g",
  "kCc8FmEb1nY",
  "t3YJ5hKiMQ0",
  "q8SA3rM6ckI",
  "P6sfmUTpUmc",
  "TCH_1BHY58I",
  "PaCmpygFfXo",
  "VMj-3S1tku0",
  "Gtf3CxIRiPk",
  "qTogNUV3CAI",
  "P7ZdUbSAujQ",
  "Yh-hC4tfBhU",
  "vuWbJlBePPA",
  "AKMuA_TVz3A",
  "unotid_qTbw",
  "MUvFuZpxLU8",
  "Kp5R6GZh8O0",
  "0D23NeBjCeQ",
  "XHBJJ2N-kUc",
  "AeRmk-gn8I8",
  "_b0Y_Oj7id4",
  "MFKV48ikV5E",
  "OEeNjlBYSrk",
  "J-CTR0xHr98",
  "_oHvhJhjkx0",
  "uqOfC3KSZFc",
  "u0619QrWxQc",
  "lA19zXgObKA",
  "Uskm9a26V6U",
  "kOfesqNz2xU",
  "KVDKWrsP3es",
  "Yv7drI7cBsQ",
  "2Kx9jbSMZqA",
  "DiJsg93zQDc",
  "Gag7H4M-GdQ",
  "cognZ12dpAM",
  "c_UqS54ZA5o",
  "9iSxF_RW6xk",
  "FP8t774U8ek",
  "ISNdQcPhsts",
  "bCz4OMemCcA",
  "PXWYUTMt-AU",
  "Mn_9W1nCFLo",
  "oM4VmoabDAI",
  "90mGPxR2GgY",
  "rhZgXNdhWDY",
  "0VdNflU08yA",
  "toUSzwR0EV8",
  "UiX8K-xBUpE",
  "8Q_tqwpTpVU",
  "qGyFrqc34yc",
  "KJ5bFv-IRFM",
  "6gHvqXrfjuo",
  "sEFx0b9y_Xo",
  "O0WwgAnFSCc",
  "uhOxwIZwV1g",
  "Hnlr9H0kCHE",
  "5gxSHuscNS8",
  "LbH1ZDImaI8",
  "cIQ36Kt7UVg",
  "zsjq1Rfh9C4",
  "p4ZLysa9Qqg",
  "t705r8ICkRw",
  "cIQ36Kt7UVg",
  "SA8ZBJWo73E",
  "9Zlnbs-NBUI",
  "3Ux6B3bvO0w",
  "XP5k3ZzPf_0",
  "hIPLmZK3C1Y",
  "E7MQb9Y4FAE",
  "bAUVCn_jw5I",
  "AgqZMK22LEk",
  "lXLBTBBil2U",
  "cEg8cOx7UZk",
  "odEnRBszBVI",
  "f-tFjRk4gSE",
  "gRLrARn4TxY",
  "jvqFAi7vkBc",
  "iAlwZyRUOVM",
  "5t1vTLU7s40",
  "f_lRdkH_QoY",
  "mAUpxN-EIgU",
  "-ZSVkjukC1U",
  "UlmyyYQGhzc",
  "jHf6dkgXfVg",
  "-1zxjGxpnqA",
  "U16RnpV48KQ",
  "slL7AW9q8Fc",
  "RDd71IUIgpg",
  "JjHFubUPLV0",
  "AhChOFRegn4",
  "c3b-JASoPi0",
  "_N2KPEdh69s",
  "zwYHloLXH0c",
  "Wqmtf9SA_kk",
  "IsoW7_X3j5A",
  "SY-MB0VWjJI",
  "sal78ACtGTc",
  "UTuuTTnjxMQ",
  "BUE-icVYRFU",
  "Th8JoIan4dg",
  "A4SLDQDXdp0",
  "z1iF1c8w5Lg",
  "oWZbWzAyHAE",
  "hyYCn_kAngI",
  "QRZ_l7cVzzU",
  "u36A-YTxiOw",
  "rP7bpYsfa6Q",
  "zBUhQPPS9AY",
  "B5tU2447OK8",
  "6DTK9yDP6p0",
  "_mKeVGSqQac",
  "fdD4y4Civp4",
  "G8T1O81W96Y",
  "hc0u4avAkuM",
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
  loadVideoFromUrl(); // URLから動画を読み込む
  // 入力フィールドに入力があったときに動画を自動で読み込む
  document.getElementById('video-url').addEventListener('input', debounce(loadVideo, 1000));
}

// 関数の実行を遅延させるためのデバウンス関数
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

function loadVideoFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get('v');
  if (videoId) {
    embedYouTubeVideo(videoId);
  }
}

function loadVideo() {
  scrollToTop();
  const videoUrl = document.getElementById('video-url').value;
  const videoId = getVideoIdFromUrl(videoUrl);
  if(videoId) {
    updateUrlParameter(videoId); // URLパラメータを更新
    embedYouTubeVideo(videoId);
    document.getElementById('subtitle').textContent = '';
  }
}

function updateUrlParameter(videoId) {
  const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?v=${videoId}`;
  window.history.pushState({ path: newUrl }, '', newUrl);
}

// YouTubeのURLから動画IDを取得する
function getVideoIdFromUrl(url) {
  // 短縮URLのパターン
  let match = url.match(/youtu\.be\/([^?&]+)/);
  if (match) {
    return match[1];
  }
  // 通常のYouTube URLのパターン
  match = url.match(/(?:youtube\.com.*(?:\\?|&)v=)([^&]+)/);
  if (match) {
    return match[1];
  }
  // URLがすでにVideoIDの形式であるかをチェック
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }
  // どのパターンにも該当しない場合はnullを返す
  return null;
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
  thumbnail.addEventListener("click", async () => {
    const videoId = extractVideoId(url);
    await checkSubtitleFile(videoId); // 字幕ファイルの確認と読み込み
    scrollToTop();
    embedYouTubeVideo(videoId);
    updateUrlParameter(videoId); // クリックした動画のIDに基づいてURLパラメータを更新
  });
  thumbnail.addEventListener("mouseenter", () => thumbnail.classList.add("ring", "ring-offset-2", "ring-indigo-500"));
  thumbnail.addEventListener("mouseleave", () => thumbnail.classList.remove("ring", "ring-offset-2", "ring-indigo-500"));
  return thumbnail;
}

function extractVideoId(url) {
  const match = url.match(/vi\/([^/?]+)/);
  return match ? match[1] : null;
}
