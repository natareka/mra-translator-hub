import { ChangeEvent, DragEvent, useEffect, useMemo, useRef, useState } from "react";

type Language = {
  code: string;
  name: string;
  speech?: string;
};

type SpeechRecognitionConstructor = new () => SpeechRecognition;

type SpeechRecognition = EventTarget & {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
};

type SpeechRecognitionEvent = {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
};

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

const languages: Language[] = [
  { code: "auto", name: "Auto Detect", speech: "en-US" },
  { code: "en", name: "English", speech: "en-US" },
  { code: "ta", name: "Tamil", speech: "ta-IN" },
  { code: "af", name: "Afrikaans" },
  { code: "sq", name: "Albanian" },
  { code: "am", name: "Amharic" },
  { code: "ar", name: "Arabic", speech: "ar-SA" },
  { code: "hy", name: "Armenian" },
  { code: "az", name: "Azerbaijani" },
  { code: "eu", name: "Basque" },
  { code: "be", name: "Belarusian" },
  { code: "bn", name: "Bengali" },
  { code: "bs", name: "Bosnian" },
  { code: "bg", name: "Bulgarian" },
  { code: "ca", name: "Catalan" },
  { code: "ceb", name: "Cebuano" },
  { code: "ny", name: "Chichewa" },
  { code: "zh-CN", name: "Chinese Simplified", speech: "zh-CN" },
  { code: "zh-TW", name: "Chinese Traditional", speech: "zh-TW" },
  { code: "co", name: "Corsican" },
  { code: "hr", name: "Croatian" },
  { code: "cs", name: "Czech" },
  { code: "da", name: "Danish" },
  { code: "nl", name: "Dutch" },
  { code: "eo", name: "Esperanto" },
  { code: "et", name: "Estonian" },
  { code: "tl", name: "Filipino" },
  { code: "fi", name: "Finnish" },
  { code: "fr", name: "French", speech: "fr-FR" },
  { code: "fy", name: "Frisian" },
  { code: "gl", name: "Galician" },
  { code: "ka", name: "Georgian" },
  { code: "de", name: "German", speech: "de-DE" },
  { code: "el", name: "Greek" },
  { code: "gu", name: "Gujarati" },
  { code: "ht", name: "Haitian Creole" },
  { code: "ha", name: "Hausa" },
  { code: "haw", name: "Hawaiian" },
  { code: "iw", name: "Hebrew" },
  { code: "hi", name: "Hindi", speech: "hi-IN" },
  { code: "hmn", name: "Hmong" },
  { code: "hu", name: "Hungarian" },
  { code: "is", name: "Icelandic" },
  { code: "ig", name: "Igbo" },
  { code: "id", name: "Indonesian" },
  { code: "ga", name: "Irish" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese", speech: "ja-JP" },
  { code: "jw", name: "Javanese" },
  { code: "kn", name: "Kannada" },
  { code: "kk", name: "Kazakh" },
  { code: "km", name: "Khmer" },
  { code: "rw", name: "Kinyarwanda" },
  { code: "ko", name: "Korean" },
  { code: "ku", name: "Kurdish" },
  { code: "ky", name: "Kyrgyz" },
  { code: "lo", name: "Lao" },
  { code: "la", name: "Latin" },
  { code: "lv", name: "Latvian" },
  { code: "lt", name: "Lithuanian" },
  { code: "lb", name: "Luxembourgish" },
  { code: "mk", name: "Macedonian" },
  { code: "mg", name: "Malagasy" },
  { code: "ms", name: "Malay" },
  { code: "ml", name: "Malayalam" },
  { code: "mt", name: "Maltese" },
  { code: "mi", name: "Maori" },
  { code: "mr", name: "Marathi" },
  { code: "mn", name: "Mongolian" },
  { code: "my", name: "Myanmar" },
  { code: "ne", name: "Nepali" },
  { code: "no", name: "Norwegian" },
  { code: "or", name: "Odia" },
  { code: "ps", name: "Pashto" },
  { code: "fa", name: "Persian" },
  { code: "pl", name: "Polish" },
  { code: "pt", name: "Portuguese" },
  { code: "pa", name: "Punjabi" },
  { code: "ro", name: "Romanian" },
  { code: "ru", name: "Russian" },
  { code: "sm", name: "Samoan" },
  { code: "gd", name: "Scots Gaelic" },
  { code: "sr", name: "Serbian" },
  { code: "st", name: "Sesotho" },
  { code: "sn", name: "Shona" },
  { code: "sd", name: "Sindhi" },
  { code: "si", name: "Sinhala" },
  { code: "sk", name: "Slovak" },
  { code: "sl", name: "Slovenian" },
  { code: "so", name: "Somali" },
  { code: "es", name: "Spanish", speech: "es-ES" },
  { code: "su", name: "Sundanese" },
  { code: "sw", name: "Swahili" },
  { code: "sv", name: "Swedish" },
  { code: "tg", name: "Tajik" },
  { code: "tt", name: "Tatar" },
  { code: "te", name: "Telugu" },
  { code: "th", name: "Thai" },
  { code: "tr", name: "Turkish" },
  { code: "tk", name: "Turkmen" },
  { code: "uk", name: "Ukrainian" },
  { code: "ur", name: "Urdu" },
  { code: "ug", name: "Uyghur" },
  { code: "uz", name: "Uzbek" },
  { code: "vi", name: "Vietnamese" },
  { code: "cy", name: "Welsh" },
  { code: "xh", name: "Xhosa" },
  { code: "yi", name: "Yiddish" },
  { code: "yo", name: "Yoruba" },
  { code: "zu", name: "Zulu" },
];

const phraseBook: Record<string, Record<string, string>> = {
  ta: {
    hello: "வணக்கம்",
    "good morning": "காலை வணக்கம்",
    "how are you": "நீங்கள் எப்படி இருக்கிறீர்கள்?",
    "thank you": "நன்றி",
    welcome: "வரவேற்கிறோம்",
    "translate this file": "இந்த கோப்பை மொழிபெயர்க்கவும்",
    "i need help": "எனக்கு உதவி வேண்டும்",
    "mra translator hub": "எம்.ஆர்.ஏ மொழிபெயர்ப்பாளர் மையம்",
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

const supportedFileTypes = ["txt", "md", "csv", "json", "html"];

function getLanguageName(code: string) {
  return languages.find((language) => language.code === code)?.name ?? code.toUpperCase();
}

function getSpeechCode(code: string) {
  return languages.find((language) => language.code === code)?.speech ?? code ?? "en-US";
}

function detectLanguage(text: string) {
  if (/[\u0B80-\u0BFF]/.test(text)) return "Tamil";
  if (/[\u0900-\u097F]/.test(text)) return "Hindi";
  if (/[\u0600-\u06FF]/.test(text)) return "Arabic";
  if (/[\u3040-\u30FF]/.test(text)) return "Japanese";
  if (/[\u4E00-\u9FFF]/.test(text)) return "Mandarin";
  return "English";
}

function demoTranslate(text: string, target: string) {
  const clean = text.trim();
  if (!clean) return "";
  if (target === "auto") return clean;
  if (target === "en") return clean;

  const dictionary = phraseBook[target] ?? {};
  const translatedLines = clean.split("\n").map((line) => {
    const key = line.trim().toLowerCase().replace(/[.!?]+$/, "");
    return dictionary[key] ?? `${getLanguageName(target)} demo: ${line}`;
  });

  return translatedLines.join("\n");
}

function App() {
  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("ta");
  const [sourceText, setSourceText] = useState("Hello\nHow are you\nTranslate this file");
  const [translatedText, setTranslatedText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("Ready for browser voice input");
  const [toast, setToast] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileText, setFileText] = useState("");
  const [fileProgress, setFileProgress] = useState(0);
  const [fileOutputUrl, setFileOutputUrl] = useState("");
  const [fileOutputName, setFileOutputName] = useState("");
  const [fileMessage, setFileMessage] = useState("Upload TXT, MD, CSV, JSON, or HTML for the browser demo. The Django backend handles PDF, DOCX, PPTX, and OCR images.");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const detectedLanguage = useMemo(() => detectLanguage(sourceText), [sourceText]);

  useEffect(() => {
    setTranslatedText(demoTranslate(sourceText, targetLang));
  }, [sourceText, targetLang]);

  useEffect(() => {
    return () => {
      if (fileOutputUrl) URL.revokeObjectURL(fileOutputUrl);
    };
  }, [fileOutputUrl]);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 3200);
  }

  function copyResult() {
    if (!translatedText) return;
    navigator.clipboard
      .writeText(translatedText)
      .then(() => showToast("Translated text copied to clipboard."))
      .catch(() => showToast("Copy failed. Select the text and copy manually."));
  }

  function downloadText() {
    const blob = new Blob([translatedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "translated_text.txt";
    link.click();
    URL.revokeObjectURL(url);
    showToast("Translated text download started.");
  }

  function speak(text = translatedText) {
    if (!text) return;
    if (!("speechSynthesis" in window)) {
      showToast("Text-to-speech is not supported in this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getSpeechCode(targetLang);
    utterance.rate = 0.94;
    window.speechSynthesis.speak(utterance);
  }

  function toggleVoice() {
    const SpeechRecognitionApi = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SpeechRecognitionApi) {
      setVoiceStatus("Voice recognition needs Chrome, Edge, or another Web Speech API browser.");
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognitionApi();
    recognition.lang = sourceLang === "auto" ? "en-US" : getSpeechCode(sourceLang);
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? "")
        .join(" ");
      setSourceText((current) => `${current ? `${current}\n` : ""}${transcript}`.trim());
      setVoiceStatus("Voice captured and translated.");
    };
    recognition.onerror = (event) => {
      setVoiceStatus(`Voice error: ${event.error}`);
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    setVoiceStatus("Listening now. Speak clearly into the microphone.");
  }

  function onFileInput(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) void readFile(file);
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) void readFile(file);
  }

  async function readFile(file: File) {
    setFileName(file.name);
    setFileOutputUrl("");
    setFileOutputName("");
    setFileProgress(14);
    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";

    if (!supportedFileTypes.includes(extension)) {
      setFileProgress(0);
      setFileText("");
      setFileMessage("This file type is ready for the Django backend pipeline: extract text, OCR if needed, translate, email admin, and return a download URL.");
      return;
    }

    try {
      const text = await file.text();
      setFileText(text.slice(0, 2500));
      setFileProgress(48);
      window.setTimeout(() => {
        const translated = demoTranslate(text, targetLang);
        const blob = new Blob([translated], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        setFileOutputUrl(url);
        setFileOutputName(`translated_${file.name.replace(/\.[^/.]+$/, "")}.txt`);
        setFileProgress(100);
        setFileMessage("Translation complete. Demo admin email notification queued for owner@mra-translator.com.");
        showToast("Translation complete. Email sent to admin.");
      }, 520);
    } catch {
      setFileProgress(0);
      setFileMessage("Unable to read this file in the browser. Try the Django backend route for server-side extraction.");
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f4ec] text-slate-950">
      <section className="relative isolate min-h-screen overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(20,184,166,0.36),transparent_28%),radial-gradient(circle_at_82%_12%,rgba(249,115,22,0.34),transparent_26%),linear-gradient(135deg,#06111f_0%,#111827_48%,#312e1f_100%)]" />
        <div className="hero-grid absolute inset-0 opacity-35" />
        <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div className="max-w-2xl animate-rise">
            <p className="mb-5 font-mono text-sm uppercase tracking-[0.36em] text-teal-200">Production blueprint</p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.08em] sm:text-7xl lg:text-8xl">
              MRA Translator Hub
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-200 sm:text-xl">
              A multilingual translator and voice assistant for text, speech, files, OCR, downloads, and automated admin email notifications.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a className="group inline-flex items-center justify-center bg-teal-300 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-slate-950 transition hover:bg-white" href="#translator">
                Open translator
                <span className="ml-3 transition group-hover:translate-x-1">→</span>
              </a>
              <a className="inline-flex items-center justify-center border border-white/35 px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white/10" href="#project-files">
                View project files
              </a>
            </div>
          </div>

          <div id="translator" className="animate-float rounded-none border border-white/15 bg-white/[0.07] p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">
            <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-orange-200">Universal translator</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight">Text and voice workspace</h2>
              </div>
              <button onClick={toggleVoice} className={`inline-flex items-center justify-center px-5 py-3 text-sm font-bold transition ${isListening ? "bg-orange-400 text-slate-950" : "bg-white text-slate-950 hover:bg-teal-200"}`}>
                {isListening ? "Stop listening" : "Record voice"}
              </button>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-300">Source</span>
                <select value={sourceLang} onChange={(event) => setSourceLang(event.target.value)} className="w-full border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none focus:border-teal-300">
                  {languages.map((language) => (
                    <option key={language.code} value={language.code}>
                      {language.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-300">Target</span>
                <select value={targetLang} onChange={(event) => setTargetLang(event.target.value)} className="w-full border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none focus:border-teal-300">
                  {languages.filter((language) => language.code !== "auto").map((language) => (
                    <option key={language.code} value={language.code}>
                      {language.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <label className="block">
                <span className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-[0.22em] text-slate-300">
                  Input <span className="text-[10px] normal-case tracking-normal text-teal-200">Detected: {detectedLanguage}</span>
                </span>
                <textarea value={sourceText} onChange={(event) => setSourceText(event.target.value)} className="min-h-56 w-full resize-none border border-white/10 bg-slate-950/70 p-4 leading-7 text-white outline-none transition focus:border-teal-300" placeholder="Type text, paste content, or record voice..." />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-300">Translated output</span>
                <textarea readOnly value={translatedText} className="min-h-56 w-full resize-none border border-white/10 bg-white p-4 leading-7 text-slate-950 outline-none" />
              </label>
            </div>

            <div className="mt-5 flex flex-col gap-3 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
              <p>{voiceStatus}</p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => speak()} className="border border-white/20 px-4 py-3 font-bold text-white transition hover:bg-white/10">Listen</button>
                <button onClick={copyResult} className="border border-white/20 px-4 py-3 font-bold text-white transition hover:bg-white/10">Copy</button>
                <button onClick={downloadText} className="bg-teal-300 px-4 py-3 font-black text-slate-950 transition hover:bg-white">Download</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl animate-rise-slow">
            <p className="font-mono text-sm uppercase tracking-[0.32em] text-teal-700">Smart file converter</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-6xl">Upload, extract, translate, notify.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">The browser demo reads common text files. The included Django project adds PDF, DOCX, PPTX, image OCR, generated downloads, and SMTP email automation.</p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <label onDragOver={(event) => event.preventDefault()} onDrop={onDrop} className="group flex min-h-80 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-slate-950/25 bg-white/40 p-8 text-center transition hover:border-teal-700 hover:bg-white/70">
              <input className="sr-only" type="file" onChange={onFileInput} accept=".txt,.md,.csv,.json,.html,.pdf,.docx,.pptx,.jpg,.jpeg,.png" />
              <svg className="h-16 w-16 text-slate-950 transition group-hover:-translate-y-1 group-hover:text-teal-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 3v12" />
                <path d="m7 8 5-5 5 5" />
                <path d="M4 15v3a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-3" />
              </svg>
              <span className="mt-6 text-2xl font-black tracking-tight">Drag and drop a file</span>
              <span className="mt-3 max-w-md text-slate-600">PDF, DOCX, TXT, JPG, PNG, and PPTX are part of the production backend plan.</span>
              <span className="mt-6 bg-slate-950 px-5 py-3 text-sm font-black uppercase tracking-[0.18em] text-white">Choose file</span>
            </label>

            <div className="border-y border-slate-950/15 py-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.26em] text-slate-500">Processing status</p>
                  <h3 className="mt-2 text-3xl font-black tracking-tight">{fileName || "No file selected"}</h3>
                </div>
                <span className="text-4xl font-black tracking-[-0.06em] text-teal-700">{fileProgress}%</span>
              </div>
              <div className="mt-6 h-3 bg-slate-950/10">
                <div className="h-full bg-teal-600 transition-all duration-500" style={{ width: `${fileProgress}%` }} />
              </div>
              <p className="mt-5 leading-7 text-slate-700">{fileMessage}</p>

              {fileText && (
                <div className="mt-6 bg-slate-950 p-5 text-white">
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-teal-200">Extracted preview</p>
                  <pre className="max-h-52 overflow-auto whitespace-pre-wrap text-sm leading-6 text-slate-200">{fileText}</pre>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                {fileOutputUrl && (
                  <a href={fileOutputUrl} download={fileOutputName} className="bg-slate-950 px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-teal-700">
                    Download translated file
                  </a>
                )}
                <button onClick={() => showToast("Backend endpoint: POST /api/translate-file/")} className="border border-slate-950/20 px-5 py-3 text-sm font-black uppercase tracking-[0.16em] transition hover:border-slate-950">
                  API route
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="project-files" className="bg-white px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.32em] text-orange-700">Full-stack deliverable</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-6xl">Project files are included.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">A copy-paste-ready Django REST Framework backend and Bootstrap frontend scaffold has been generated in the repository so it can be used on Windows, macOS, and mobile browsers.</p>
          </div>
          <div className="bg-slate-950 p-5 text-white sm:p-8">
            <pre className="overflow-auto text-sm leading-7 text-slate-200">{`mra-translator-hub/
  README.md
  .env.example
  backend/
    manage.py
    requirements.txt
    mra_backend/settings.py
    mra_backend/urls.py
    translator/models.py
    translator/views.py
    translator/utils.py
    translator/urls.py
  frontend/
    index.html
    static/css/styles.css
    static/js/app.js`}</pre>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="font-mono text-sm uppercase tracking-[0.32em] text-teal-700">Backend API</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-6xl">Django routes for production.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {["POST /api/translate-text/", "POST /api/translate-file/", "POST /api/speak-text/"].map((route) => (
              <div key={route} className="border-t border-slate-950/20 py-5">
                <p className="font-mono text-sm font-bold text-orange-700">{route}</p>
                <p className="mt-3 leading-7 text-slate-700">Handles validation, error responses, logging, and downloadable output for the translator workflow.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 px-5 py-8 text-white sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-black text-white">MRA Translator Hub</p>
          <p>Responsive React demo plus generated Django and Bootstrap project files.</p>
        </div>
      </footer>

      {toast && (
        <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 bg-slate-950 px-5 py-4 text-center text-sm font-bold text-white shadow-2xl sm:bottom-8">
          {toast}
        </div>
      )}
    </main>
  );
}

export default App;