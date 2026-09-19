import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  X,
  Check,
  Volume2,
} from "lucide-react";

export default function VoiceSearch({
  open,
  onClose,
  onResult,
  language = "en-US",
}) {
  const recognitionRef = useRef(null);

  const [supported, setSupported] =
    useState(true);

  const [listening, setListening] =
    useState(false);

  const [transcript, setTranscript] =
    useState("");

  useEffect(() => {
    if (!open) return;

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.lang = language;
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () =>
      setListening(true);

    recognition.onend = () =>
      setListening(false);

    recognition.onresult = (event) => {
      let text = "";

      for (
        let i = 0;
        i < event.results.length;
        i++
      ) {
        text +=
          event.results[i][0].transcript;
      }

      setTranscript(text);
    };

    recognition.onerror = () =>
      setListening(false);

    recognitionRef.current =
      recognition;
  }, [open, language]);

  const startListening = () => {
    setTranscript("");
    recognitionRef.current?.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  const submit = () => {
    if (transcript.trim()) {
      onResult?.(transcript);
    }

    onClose?.();
  };

  if (!open) return null;

  return (
    <AnimatePresence>

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        className="
          fixed
          inset-0
          z-[100]
          flex
          items-center
          justify-center
          bg-black/60
          backdrop-blur-xl
        "
      >
        <motion.div
          initial={{
            scale: .85,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: .9,
            opacity: 0,
          }}
          className="
            relative
            w-full
            max-w-xl
            rounded-[40px]
            border
            border-white/10
            bg-[#111827]
            p-10
            text-center
            shadow-2xl
          "
        >
          {/* Close */}

          <button
            onClick={onClose}
            className="
              absolute
              right-6
              top-6
              rounded-full
              p-2
              hover:bg-white/10
            "
          >
            <X />
          </button>

          <h2 className="text-3xl font-black">
            Voice Search
          </h2>

          <p className="mt-3 text-zinc-400">
            Speak naturally to search.
          </p>

          {!supported ? (
            <div className="mt-12 text-red-400">
              Speech Recognition is not
              supported in this browser.
            </div>
          ) : (
            <>
              {/* Animated Mic */}

              <div className="relative mt-12 flex justify-center">

                {listening && (
                  <>
                    <motion.div
                      animate={{
                        scale: [1, 1.8],
                        opacity: [0.6, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                      }}
                      className="
                        absolute
                        h-36
                        w-36
                        rounded-full
                        bg-[#FFD464]/20
                      "
                    />

                    <motion.div
                      animate={{
                        scale: [1, 2.2],
                        opacity: [0.4, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        delay: .5,
                      }}
                      className="
                        absolute
                        h-36
                        w-36
                        rounded-full
                        bg-[#FFD464]/15
                      "
                    />
                  </>
                )}

                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: .95,
                  }}
                  onClick={
                    listening
                      ? stopListening
                      : startListening
                  }
                  className={`
                    relative
                    z-10
                    flex
                    h-36
                    w-36
                    items-center
                    justify-center
                    rounded-full
                    transition

                    ${
                      listening
                        ? "bg-red-500"
                        : "bg-[#FFD464]"
                    }
                  `}
                >
                  {listening ? (
                    <MicOff
                      size={54}
                      color="white"
                    />
                  ) : (
                    <Mic
                      size={54}
                      color="black"
                    />
                  )}
                </motion.button>

              </div>

              {/* Transcript */}

              <div
                className="
                  mt-10
                  min-h-[90px]
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  p-6
                "
              >
                {transcript ? (
                  <p className="text-lg">
                    {transcript}
                  </p>
                ) : (
                  <p className="text-zinc-500">
                    {listening
                      ? "Listening..."
                      : "Tap the microphone to start."}
                  </p>
                )}
              </div>

              {/* Actions */}

              <div className="mt-8 flex justify-center gap-4">

                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: .95,
                  }}
                  onClick={submit}
                  disabled={!transcript}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    bg-[#FFD464]
                    px-6
                    py-3
                    font-semibold
                    text-black
                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  "
                >
                  <Check size={18} />
                  Use Result
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: .95,
                  }}
                  onClick={stopListening}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    px-6
                    py-3
                  "
                >
                  <Volume2 size={18} />
                  Stop
                </motion.button>

              </div>
            </>
          )}
        </motion.div>
      </motion.div>

    </AnimatePresence>
  );
}