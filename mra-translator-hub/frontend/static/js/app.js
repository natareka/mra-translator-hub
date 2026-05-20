const API_BASE = window.MRA_API_BASE || `${window.location.origin}/api`;

const languages = [
  ["auto", "Auto Detect"],
  ["en", "English"],
  ["ta", "Tamil"],
  ["af", "Afrikaans"],
  ["sq", "Albanian"],
  ["am", "Amharic"],
  ["ar", "Arabic"],
  ["hy", "Armenian"],
  ["az", "Azerbaijani"],
  ["eu", "Basque"],
  ["be", "Belarusian"],
  ["bn", "Bengali"],
  ["bs", "Bosnian"],
  ["bg", "Bulgarian"],
  ["ca", "Catalan"],
  ["ceb", "Cebuano"],
  ["ny", "Chichewa"],
  ["zh-CN", "Chinese Simplified"],
  ["zh-TW", "Chinese Traditional"],
  ["co", "Corsican"],
  ["hr", "Croatian"],
  ["cs", "Czech"],
  ["da", "Danish"],
  ["nl", "Dutch"],
  ["eo", "Esperanto"],
  ["et", "Estonian"],
  ["tl", "Filipino"],
  ["fi", "Finnish"],
  ["fr", "French"],
  ["fy", "Frisian"],
  ["gl", "Galician"],
  ["ka", "Georgian"],
  ["de", "German"],
  ["el", "Greek"],
  ["gu", "Gujarati"],
  ["ht", "Haitian Creole"],
  ["ha", "Hausa"],
  ["haw", "Hawaiian"],
  ["iw", "Hebrew"],
  ["hi", "Hindi"],
  ["hmn", "Hmong"],
  ["hu", "Hungarian"],
  ["is", "Icelandic"],
  ["ig", "Igbo"],
  ["id", "Indonesian"],
  ["ga", "Irish"],
  ["it", "Italian"],
  ["ja", "Japanese"],
  ["jw", "Javanese"],
  ["kn", "Kannada"],
  ["kk", "Kazakh"],
  ["km", "Khmer"],
  ["rw", "Kinyarwanda"],
  ["ko", "Korean"],
  ["ku", "Kurdish"],
  ["ky", "Kyrgyz"],
  ["lo", "Lao"],
  ["la", "Latin"],
  ["lv", "Latvian"],
  ["lt", "Lithuanian"],
  ["lb", "Luxembourgish"],
  ["mk", "Macedonian"],
  ["mg", "Malagasy"],
  ["ms", "Malay"],
  ["ml", "Malayalam"],
  ["mt", "Maltese"],
  ["mi", "Maori"],
  ["mr", "Marathi"],
  ["mn", "Mongolian"],
  ["my", "Myanmar"],
  ["ne", "Nepali"],
  ["no", "Norwegian"],
  ["or", "Odia"],
  ["ps", "Pashto"],
  ["fa", "Persian"],
  ["pl", "Polish"],
  ["pt", "Portuguese"],
  ["pa", "Punjabi"],
  ["ro", "Romanian"],
  ["ru", "Russian"],
  ["sm", "Samoan"],
  ["gd", "Scots Gaelic"],
  ["sr", "Serbian"],
  ["st", "Sesotho"],
  ["sn", "Shona"],
  ["sd", "Sindhi"],
  ["si", "Sinhala"],
  ["sk", "Slovak"],
  ["sl", "Slovenian"],
  ["so", "Somali"],
  ["es", "Spanish"],
  ["su", "Sundanese"],
  ["sw", "Swahili"],
  ["sv", "Swedish"],
  ["tg", "Tajik"],
  ["tt", "Tatar"],
  ["te", "Telugu"],
  ["th", "Thai"],
  ["tr", "Turkish"],
  ["tk", "Turkmen"],
  ["uk", "Ukrainian"],
  ["ur", "Urdu"],
  ["ug", "Uyghur"],
  ["uz", "Uzbek"],
  ["vi", "Vietnamese"],
  ["cy", "Welsh"],
  ["xh", "Xhosa"],
  ["yi", "Yiddish"],
  ["yo", "Yoruba"],
  ["zu", "Zulu"],
];

const speechCodes = {
  en: "en-US",
  ta: "ta-IN",
  hi: "hi-IN",
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
  ja: "ja-JP",
  ar: "ar-SA",
  "zh-CN": "zh-CN",
  "zh-TW": "zh-TW",
};

const demoPhrases = {
  ta: {
    hello: "வணக்கம்",
    "good morning": "காலை வணக்கம்",
    "how are you": "நீங்கள் எப்படி இருக்கிறீர்கள்?",
    "thank you": "நன்றி",
    welcome: "வரவேற்கிறோம்",
    "translate this file": "இந்த கோப்பை மொழிபெயர்க்கவும்",
    "i need help": "எனக்கு உதவி வேண்டும்",
  },
  hi: {
    hello: "नमस्ते",
    "good morning": "सुप्रभात",
    "how are you": "आप कैसे हैं?",
    "thank you": "धन्यवाद",
    welcome: "स्वागत है",
    "translate this file": "इस फाइल का अनुवाद करें",
    "i need help": "मुझे मदद चाहिए",
  },
  es: {
    hello: "Hola",
    "good morning": "Buenos dias",
    "how are you": "Como estas?",
    "thank you": "Gracias",
    welcome: "Bienvenido",
    "translate this file": "Traduce este archivo",
    "i need help": "Necesito ayuda",
  },
  fr: {
    hello: "Bonjour",
    "good morning": "Bonjour",
    "how are you": "Comment allez-vous?",
    "thank you": "Merci",
    welcome: "Bienvenue",
    "translate this file": "Traduisez ce fichier",
    "i need help": "J'ai besoin d'aide",
  },
  de: {
    hello: "Hallo",
    "good morning": "Guten Morgen",
    "how are you": "Wie geht es Ihnen?",
    "thank you": "Danke",
    welcome: "Willkommen",
    "translate this file": "Ubersetzen Sie diese Datei",
    "i need help": "Ich brauche Hilfe",
  },
  ja: {
    hello: "こんにちは",
    "good morning": "おはようございます",
    "how are you": "お元気ですか?",
    "thank you": "ありがとうございます",
    welcome: "ようこそ",
    "translate this file": "このファイルを翻訳してください",
    "i need help": "助けが必要です",
  },
  ar: {
    hello: "مرحبا",
    "good morning": "صباح الخير",
    "how are you": "كيف حالك؟",
    "thank you": "شكرا لك",
    welcome: "اهلا وسهلا",
    "translate this file": "ترجم هذا الملف",
    "i need help": "أحتاج إلى مساعدة",
  },
  "zh-CN": {
    hello: "你好",
    "good morning": "早上好",
    "how are you": "你好吗?",
    "thank you": "谢谢",
    welcome: "欢迎",
    "translate this file": "翻译这个文件",
    "i need help": "我需要帮助",
  },
};

const browserFileTypes = ["txt", "md", "csv", "json", "html"];

const sourceLang = document.querySelector("#sourceLang");
const targetLang = document.querySelector("#targetLang");
const sourceText = document.querySelector("#sourceText");
const translatedText = document.querySelector("#translatedText");
const translateBtn = document.querySelector("#translateBtn");
const voiceBtn = document.querySelector("#voiceBtn");
const voiceStatus = document.querySelector("#voiceStatus");
const copyBtn = document.querySelector("#copyBtn");
const listenBtn = document.querySelector("#listenBtn");
const downloadTextBtn = document.querySelector("#downloadTextBtn");
const ttsAudio = document.querySelector("#ttsAudio");
const fileForm = document.querySelector("#fileForm");
const fileInput = document.querySelector("#fileInput");
const fileProgress = document.querySelector("#fileProgress");
const fileStatus = document.querySelector("#fileStatus");
const fileDownload = document.querySelector("#fileDownload");
const clearFileBtn = document.querySelector("#clearFileBtn");
const toast = document.querySelector("#toast");

let generatedBrowserDownloadUrl = "";
let activeAudio = null;
let activeRecognition = null;
let isRecording = false;
let wavRecorder = null;
let recordingTimer = null;

function fillLanguages() {
  sourceLang.innerHTML = languages.map(([code, name]) => `<option value="${code}">${name}</option>`).join("");
  targetLang.innerHTML = languages
    .filter(([code]) => code !== "auto")
    .map(([code, name]) => `<option value="${code}">${name}</option>`)
    .join("");
  targetLang.value = "ta";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("d-none");
  window.setTimeout(() => toast.classList.add("d-none"), 3200);
}

function setVoiceStatus(message) {
  voiceStatus.textContent = message;
}

function explainVoiceError(errorName) {
  const messages = {
    "not-allowed": "Microphone is blocked. Click the lock icon in the address bar, allow Microphone, then reload.",
    "service-not-allowed": "Speech service is blocked by the browser. Allow microphone access and try Chrome or Edge.",
    "audio-capture": "No microphone was found. Connect or enable your microphone and try again.",
    "no-speech": "No speech detected. Click Record voice again and speak clearly.",
    network: "Speech recognition network service failed. Check internet connection or try Chrome/Edge.",
    aborted: "Voice recording was stopped.",
  };
  return messages[errorName] || `Voice capture failed: ${errorName || "unknown error"}. Check microphone permission.`;
}

async function ensureMicrophonePermission() {
  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error("This browser cannot request microphone access. Use Chrome or Edge.");
  }

  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  stream.getTracks().forEach((track) => track.stop());
}

function getSourceSpeechCode() {
  return sourceLang.value === "auto" ? "en-US" : speechCodes[sourceLang.value] || sourceLang.value || "en-US";
}

function encodeWav(samples, sampleRate) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  function writeString(offset, string) {
    for (let index = 0; index < string.length; index += 1) {
      view.setUint8(offset + index, string.charCodeAt(index));
    }
  }

  writeString(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, samples.length * 2, true);

  let offset = 44;
  for (let index = 0; index < samples.length; index += 1, offset += 2) {
    const sample = Math.max(-1, Math.min(1, samples[index]));
    view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
  }

  return new Blob([view], { type: "audio/wav" });
}

function resampleAudio(samples, fromSampleRate, toSampleRate = 16000) {
  if (fromSampleRate === toSampleRate) return samples;
  const ratio = fromSampleRate / toSampleRate;
  const newLength = Math.round(samples.length / ratio);
  const result = new Float32Array(newLength);

  for (let index = 0; index < newLength; index += 1) {
    const position = index * ratio;
    const before = Math.floor(position);
    const after = Math.min(before + 1, samples.length - 1);
    const weight = position - before;
    result[index] = samples[before] * (1 - weight) + samples[after] * weight;
  }

  return result;
}

function trimAndNormalizeAudio(samples, sampleRate) {
  const threshold = 0.012;
  const padding = Math.floor(sampleRate * 0.18);
  let start = 0;
  let end = samples.length - 1;

  while (start < samples.length && Math.abs(samples[start]) < threshold) start += 1;
  while (end > start && Math.abs(samples[end]) < threshold) end -= 1;

  if (end <= start) return samples;

  start = Math.max(0, start - padding);
  end = Math.min(samples.length - 1, end + padding);
  const trimmed = samples.slice(start, end + 1);
  let peak = 0;

  for (let index = 0; index < trimmed.length; index += 1) {
    peak = Math.max(peak, Math.abs(trimmed[index]));
  }

  if (peak > 0 && peak < 0.92) {
    const gain = Math.min(8, 0.92 / peak);
    for (let index = 0; index < trimmed.length; index += 1) {
      trimmed[index] = Math.max(-1, Math.min(1, trimmed[index] * gain));
    }
  }

  return trimmed;
}

function prepareSpeechAudio(samples, sourceSampleRate) {
  const targetRate = 16000;
  const resampled = resampleAudio(samples, sourceSampleRate, targetRate);
  return trimAndNormalizeAudio(resampled, targetRate);
}

async function startWavRecorder() {
  const AudioContextApi = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextApi) {
    throw new Error("Audio recording is not supported in this browser. Try Chrome, Edge, or Safari latest version.");
  }

  const stream = await navigator.mediaDevices.getUserMedia({
    audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
  });

  const audioContext = new AudioContextApi();
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  const source = audioContext.createMediaStreamSource(stream);
  const processor = audioContext.createScriptProcessor(4096, 1, 1);
  const silentGain = audioContext.createGain();
  const chunks = [];

  silentGain.gain.value = 0;

  processor.onaudioprocess = (event) => {
    chunks.push(new Float32Array(event.inputBuffer.getChannelData(0)));
  };

  source.connect(processor);
  processor.connect(silentGain);
  silentGain.connect(audioContext.destination);

  return {
    stop: async () => {
      const sourceSampleRate = audioContext.sampleRate;
      processor.disconnect();
      silentGain.disconnect();
      source.disconnect();
      stream.getTracks().forEach((track) => track.stop());
      await audioContext.close();
      const length = chunks.reduce((total, chunk) => total + chunk.length, 0);
      const samples = new Float32Array(length);
      let offset = 0;
      chunks.forEach((chunk) => {
        samples.set(chunk, offset);
        offset += chunk.length;
      });
      const preparedSamples = prepareSpeechAudio(samples, sourceSampleRate);
      return encodeWav(preparedSamples, 16000);
    },
  };
}

async function transcribeVoiceBlob(audioBlob) {
  const endpoints = [
    `${API_BASE}/transcribe-voice/`,
    `${API_BASE}/transcribe_voice/`,
    `${API_BASE}/voice/transcribe/`,
    `${window.location.origin}/transcribe-voice/`,
  ];

  let lastError = null;
  for (const endpoint of endpoints) {
    const formData = new FormData();
    formData.append("audio", audioBlob, "voice.wav");
    formData.append("language", getSourceSpeechCode());

    let response;
    try {
      response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
    } catch (error) {
      lastError = error;
      continue;
    }

    if (response.status === 404) {
      lastError = new Error(`${endpoint} not found`);
      continue;
    }

    return await parseJsonResponse(response);
  }

  throw new Error(`${lastError?.message || "Voice API not found"}. Restart Django and hard refresh the browser.`);
}

function setRecordingUi(recording) {
  isRecording = recording;
  voiceBtn.textContent = recording ? "Stop recording" : "Record voice";
  voiceBtn.classList.toggle("btn-accent", recording);
  voiceBtn.classList.toggle("btn-outline-light", !recording);
  if (!recording && recordingTimer) {
    window.clearTimeout(recordingTimer);
    recordingTimer = null;
  }
}

function clearVoiceTextForNewRecording() {
  sourceText.value = "";
  translatedText.value = "";
  if (ttsAudio) {
    ttsAudio.pause();
    ttsAudio.removeAttribute("src");
    ttsAudio.load();
    ttsAudio.classList.add("d-none");
  }
}

async function stopVoiceRecording() {
  if (!wavRecorder) return;

  try {
    setVoiceStatus("Processing voice. Please wait...");
    setRecordingUi(false);
    const audioBlob = await wavRecorder.stop();
    wavRecorder = null;

    if (audioBlob.size < 3000) {
      throw new Error("Recording is too short. Please speak for at least one second.");
    }

    const data = await transcribeVoiceBlob(audioBlob);
    if (!data.transcript) {
      throw new Error("Voice API returned no transcript. Please speak clearly and try again.");
    }
    sourceText.value = data.transcript.trim();
    setVoiceStatus(`Captured: ${data.transcript}. Translating now...`);
    await translateText();
  } catch (error) {
    wavRecorder = null;
    const message = error.message || "Voice transcription failed. Try again closer to the microphone.";
    setVoiceStatus(message);
    showToast(message);
    const manualTranscript = window.prompt(
      "Automatic voice recognition failed. Type the words you spoke, and the app will translate them:",
      ""
    );
    if (manualTranscript && manualTranscript.trim()) {
      sourceText.value = manualTranscript.trim();
      setVoiceStatus("Manual voice fallback added. Translating now...");
      await translateText();
    }
  }
}

function resetFileOutput(message = "Waiting for file.") {
  if (generatedBrowserDownloadUrl) {
    URL.revokeObjectURL(generatedBrowserDownloadUrl);
    generatedBrowserDownloadUrl = "";
  }
  fileProgress.style.width = "0%";
  fileProgress.textContent = "0%";
  fileStatus.textContent = message;
  fileDownload.classList.add("d-none");
  fileDownload.removeAttribute("href");
  fileDownload.removeAttribute("download");
}

function clearFileForm(message = "Waiting for file.") {
  fileInput.value = "";
  resetFileOutput(message);
}

function getLanguageName(code) {
  const language = languages.find(([languageCode]) => languageCode === code);
  return language ? language[1] : code.toUpperCase();
}

function demoTranslate(text, target) {
  const clean = text.trim();
  if (!clean || target === "en") return clean;
  const dictionary = demoPhrases[target] || {};
  return clean
    .split("\n")
    .map((line) => {
      const key = line.trim().toLowerCase().replace(/[.!?]+$/, "");
      return dictionary[key] || `${getLanguageName(target)} demo: ${line}`;
    })
    .join("\n");
}

async function parseJsonResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  const rawBody = await response.text();

  if (!contentType.includes("application/json")) {
    const preview = rawBody.replace(/\s+/g, " ").slice(0, 80);
    if (response.status === 404) {
      throw new Error("Backend API route was not found. Restart Django and confirm /api/transcribe-voice/ exists.");
    }
    throw new Error(`API returned HTML instead of JSON: ${preview}`);
  }

  const data = rawBody ? JSON.parse(rawBody) : {};
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data;
}

function getTargetSpeechCode() {
  return speechCodes[targetLang.value] || targetLang.value || "en-US";
}

function getBestVoice(voices, lang) {
  const languageRoot = lang.split("-")[0].toLowerCase();
  return (
    voices.find((voice) => voice.lang.toLowerCase() === lang.toLowerCase()) ||
    voices.find((voice) => voice.lang.toLowerCase().startsWith(languageRoot)) ||
    voices.find((voice) => voice.default) ||
    voices[0]
  );
}

function loadSpeechVoices() {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis?.getVoices() || [];
    if (voices.length) {
      resolve(voices);
      return;
    }

    const timer = window.setTimeout(() => resolve(window.speechSynthesis?.getVoices() || []), 700);
    window.speechSynthesis.onvoiceschanged = () => {
      window.clearTimeout(timer);
      resolve(window.speechSynthesis.getVoices());
    };
  });
}

async function speakWithBrowser(text) {
  if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
    throw new Error("Browser speech synthesis is unavailable.");
  }

  const lang = getTargetSpeechCode();
  await loadSpeechVoices();

  return new Promise((resolve, reject) => {
    let started = false;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.92;
    utterance.pitch = 1;

    utterance.onstart = () => {
      started = true;
      showToast("Playing translated audio.");
    };
    utterance.onend = resolve;
    utterance.onerror = (event) => reject(new Error(event.error || "Speech synthesis failed."));

    window.speechSynthesis.cancel();
    window.setTimeout(() => window.speechSynthesis.speak(utterance), 80);
    window.setTimeout(() => {
      if (!started && !window.speechSynthesis.speaking) {
        reject(new Error("Speech did not start."));
      }
    }, 1600);
  });
}

async function speakWithServer(text) {
  const response = await fetch(`${API_BASE}/speak-text/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ text, lang: targetLang.value }),
  });
  const data = await parseJsonResponse(response);

  if (activeAudio) {
    activeAudio.pause();
    activeAudio = null;
  }

  ttsAudio.src = data.audio_url;
  ttsAudio.classList.remove("d-none");
  ttsAudio.load();
  activeAudio = ttsAudio;
  await ttsAudio.play();
  showToast("Playing MP3 audio from server.");
}

async function translateText() {
  translateBtn.disabled = true;
  translateBtn.textContent = "Translating...";
  try {
    const response = await fetch(`${API_BASE}/translate-text/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        source_text: sourceText.value,
        source_lang: sourceLang.value,
        target_lang: targetLang.value,
      }),
    });
    const data = await parseJsonResponse(response);
    translatedText.value = data.translated_text;
  } catch (error) {
    translatedText.value = demoTranslate(sourceText.value, targetLang.value);
    showToast("Backend API is not returning JSON. Showing browser demo translation. Start Django for live translation.");
  } finally {
    translateBtn.disabled = false;
    translateBtn.textContent = "Translate";
  }
}

async function recordVoice() {
  if (!window.isSecureContext && !["localhost", "127.0.0.1"].includes(window.location.hostname)) {
    const message = "Microphone needs HTTPS or localhost. Open http://127.0.0.1:8000/ while developing.";
    setVoiceStatus(message);
    showToast(message);
    return;
  }

  if (isRecording && wavRecorder) {
    await stopVoiceRecording();
    return;
  }

  try {
    activeAudio?.pause();
    window.speechSynthesis?.cancel();
    clearVoiceTextForNewRecording();
    setVoiceStatus("Starting microphone. If prompted, allow microphone access.");
    wavRecorder = await startWavRecorder();
    setRecordingUi(true);
    setVoiceStatus("Recording. Speak now, then click Stop recording. Auto-stops after 20 seconds.");
    showToast("Recording started. Click Stop recording when finished.");
    recordingTimer = window.setTimeout(() => {
      if (isRecording && wavRecorder) void stopVoiceRecording();
    }, 20000);
    return;
  } catch (error) {
    const message = error?.name === "NotAllowedError" ? explainVoiceError("not-allowed") : error.message || "Could not start microphone recording.";
    setVoiceStatus(message);
    showToast(message);
  }
}

async function listenToResult() {
  const text = translatedText.value.trim();
  if (!text) {
    showToast("Translate some text first, then click Listen.");
    return;
  }

  listenBtn.disabled = true;
  listenBtn.textContent = "Preparing audio...";

  try {
    await speakWithServer(text);
  } catch (serverError) {
    window.speechSynthesis?.cancel();
    try {
      await speakWithBrowser(text.slice(0, 3500));
    } catch (browserError) {
      showToast("Listen failed. Check system volume, browser sound permission, or Django gTTS internet access.");
    }
  } finally {
    listenBtn.disabled = false;
    listenBtn.textContent = "Listen";
  }
}

function downloadTranslatedText() {
  const blob = new Blob([translatedText.value], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "translated_text.txt";
  link.click();
  URL.revokeObjectURL(url);
}

async function runBrowserFileFallback(file) {
  const extension = file.name.split(".").pop().toLowerCase();
  if (!browserFileTypes.includes(extension)) {
    throw new Error("Start the Django backend for PDF, DOCX, PPTX, JPG, PNG, and OCR processing.");
  }

  const text = await file.text();
  const translated = demoTranslate(text, targetLang.value);
  const blob = new Blob([translated], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  generatedBrowserDownloadUrl = url;
  fileDownload.href = url;
  fileDownload.download = `translated_${file.name.replace(/\.[^/.]+$/, "")}.txt`;
  fileDownload.classList.remove("d-none");
  fileProgress.style.width = "100%";
  fileProgress.textContent = "100%";
  fileStatus.textContent = "Backend unavailable. Browser demo translated this text-based file.";
  fileInput.value = "";
}

async function translateFile(event) {
  event.preventDefault();
  const file = fileInput.files[0];
  if (!file) {
    showToast("Choose a file first.");
    return;
  }
  resetFileOutput("Uploading and processing...");
  fileProgress.style.width = "20%";
  fileProgress.textContent = "20%";
  fileStatus.textContent = "Uploading and processing...";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("source_lang", sourceLang.value);
  formData.append("target_lang", targetLang.value);

  try {
    const response = await fetch(`${API_BASE}/translate-file/`, { method: "POST", body: formData, headers: { Accept: "application/json" } });
    fileProgress.style.width = "70%";
    fileProgress.textContent = "70%";
    const data = await parseJsonResponse(response);
    fileProgress.style.width = "100%";
    fileProgress.textContent = "100%";
    fileStatus.textContent = data.message;
    fileDownload.href = data.download_url;
    fileDownload.download = data.download_name;
    fileDownload.classList.remove("d-none");
    fileInput.value = "";
    showToast("Translation complete. Email sent to admin.");
  } catch (error) {
    try {
      await runBrowserFileFallback(file);
      showToast("Backend API is not returning JSON. Text-file browser demo completed.");
    } catch (fallbackError) {
      fileProgress.style.width = "0%";
      fileProgress.textContent = "0%";
      fileStatus.textContent = fallbackError.message || error.message || "Network error. Is Django running?";
    }
  }
}

fillLanguages();
AOS.init({ duration: 700, once: true });

translateBtn.addEventListener("click", translateText);
voiceBtn.addEventListener("click", recordVoice);
copyBtn.addEventListener("click", () => navigator.clipboard.writeText(translatedText.value).then(() => showToast("Copied to clipboard.")));
listenBtn.addEventListener("click", listenToResult);
downloadTextBtn.addEventListener("click", downloadTranslatedText);
fileForm.addEventListener("submit", translateFile);
fileInput.addEventListener("change", () => resetFileOutput(fileInput.files[0] ? "Ready to translate selected file." : "Waiting for file."));
clearFileBtn.addEventListener("click", () => clearFileForm());
fileDownload.addEventListener("click", () => window.setTimeout(() => clearFileForm("File downloaded. Ready for the next file."), 500));