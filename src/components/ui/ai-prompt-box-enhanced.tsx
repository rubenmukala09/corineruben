import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowUp, Paperclip, Square, X, StopCircle, Mic, Globe, Settings, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Embedded CSS for minimal custom styles
const styles = `
  *:focus-visible {
    outline-offset: 0 !important;
    --ring-offset: 0 !important;
  }
  .ai-prompt-textarea::-webkit-scrollbar {
    width: 6px;
  }
  .ai-prompt-textarea::-webkit-scrollbar-track {
    background: transparent;
  }
  .ai-prompt-textarea::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
  .ai-prompt-textarea::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;
const usePromptBoxStyles = () => {
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("ai-prompt-box-styles")) return;
    const styleSheet = document.createElement("style");
    styleSheet.id = "ai-prompt-box-styles";
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }, []);
};

// Textarea Component
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  className,
  ...props
}, ref) => <textarea className={cn("ai-prompt-textarea flex w-full rounded-md border-none bg-transparent px-3 py-2.5 text-base text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] resize-none", className)} ref={ref} rows={1} {...props} />);
Textarea.displayName = "Textarea";

// Tooltip Components
const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef<React.ElementRef<typeof TooltipPrimitive.Content>, React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>>(({
  className,
  sideOffset = 4,
  ...props
}, ref) => <TooltipPrimitive.Content ref={ref} sideOffset={sideOffset} className={cn("z-50 overflow-hidden rounded-md border border-white/20 bg-black/80 backdrop-blur-sm px-3 py-1.5 text-sm text-white shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className)} {...props} />);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Dialog Components
const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>>(({
  className,
  ...props
}, ref) => <DialogPrimitive.Overlay ref={ref} className={cn("fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className)} {...props} />);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>(({
  className,
  children,
  ...props
}, ref) => <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content ref={ref} className={cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-[90vw] md:max-w-[800px] translate-x-[-50%] translate-y-[-50%] gap-4 border border-white/20 bg-[#121212] p-0 shadow-xl duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-2xl", className)} {...props}>
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 hover:bg-white/20 transition-all">
        <X className="h-5 w-5 text-gray-200 hover:text-white" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>);
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogTitle = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Title>, React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>(({
  className,
  ...props
}, ref) => <DialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight text-gray-100", className)} {...props} />);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

// Voice Listening Indicator Component
interface VoiceListeningIndicatorProps {
  isRecording: boolean;
  interimText: string;
}
const VoiceListeningIndicator: React.FC<VoiceListeningIndicatorProps> = ({
  isRecording,
  interimText
}) => {
  const [time, setTime] = React.useState(0);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  React.useEffect(() => {
    if (isRecording) {
      setTime(0);
      timerRef.current = setInterval(() => setTime(t => t + 1), 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setTime(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  return <AnimatePresence>
    {isRecording && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="flex flex-col items-center justify-center w-full py-3 gap-3"
      >
        {/* Listening pulse animation */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <motion.div
              className="absolute w-10 h-10 rounded-full bg-red-500/20"
              animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-7 h-7 rounded-full bg-red-500/30"
              animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.2, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
            <div className="relative w-4 h-4 rounded-full bg-red-500 z-10" />
          </div>
          <span className="text-sm text-white/80 font-medium">Listening...</span>
          <span className="font-mono text-xs text-white/50">{formatTime(time)}</span>
        </div>

        {/* Sound wave bars */}
        <div className="w-full h-8 flex items-center justify-center gap-[3px] px-8">
          {[...Array(24)].map((_, i) => (
            <motion.div
              key={i}
              className="w-[3px] rounded-full bg-gradient-to-t from-red-500/60 to-red-400/90"
              animate={{
                height: ["8px", `${12 + Math.random() * 20}px`, "8px"],
              }}
              transition={{
                duration: 0.6 + Math.random() * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.04,
              }}
            />
          ))}
        </div>

        {/* Live transcription preview */}
        {interimText && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-white/60 italic px-4 text-center max-w-full truncate"
          >
            "{interimText}"
          </motion.p>
        )}
      </motion.div>
    )}
  </AnimatePresence>;
};

// Image View Dialog Component
interface ImageViewDialogProps {
  imageUrl: string | null;
  onClose: () => void;
}
const ImageViewDialog: React.FC<ImageViewDialogProps> = ({
  imageUrl,
  onClose
}) => {
  if (!imageUrl) return null;
  return <Dialog open={!!imageUrl} onOpenChange={onClose}>
      <DialogContent className="p-0 border-none bg-transparent shadow-none max-w-[90vw] md:max-w-[800px]">
        <DialogTitle className="sr-only">Image Preview</DialogTitle>
        <motion.div initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} transition={{
        duration: 0.2,
        ease: "easeOut"
      }} className="relative bg-[#121212] rounded-2xl overflow-hidden shadow-2xl">
          <img src={imageUrl} alt="Full preview" className="w-full max-h-[80vh] object-contain rounded-2xl" />
        </motion.div>
      </DialogContent>
    </Dialog>;
};

// Prompt Input Context
interface PromptInputContextType {
  isLoading: boolean;
  value: string;
  setValue: (value: string) => void;
  maxHeight: number | string;
  onSubmit?: () => void;
  disabled?: boolean;
}
const PromptInputContext = React.createContext<PromptInputContextType>({
  isLoading: false,
  value: "",
  setValue: () => {},
  maxHeight: 240,
  onSubmit: undefined,
  disabled: false
});
function usePromptInput() {
  const context = React.useContext(PromptInputContext);
  if (!context) throw new Error("usePromptInput must be used within a PromptInput");
  return context;
}
interface PromptInputProps {
  isLoading?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  maxHeight?: number | string;
  onSubmit?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onDragOver?: (e: React.DragEvent) => void;
  onDragLeave?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
}
const PromptInput = React.forwardRef<HTMLDivElement, PromptInputProps>(({
  className,
  isLoading = false,
  maxHeight = 240,
  value,
  onValueChange,
  onSubmit,
  children,
  disabled = false,
  onDragOver,
  onDragLeave,
  onDrop
}, ref) => {
  const [internalValue, setInternalValue] = React.useState(value || "");
  const handleChange = (newValue: string) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
  };
  return <TooltipProvider>
        <PromptInputContext.Provider value={{
      isLoading,
      value: value ?? internalValue,
      setValue: onValueChange ?? handleChange,
      maxHeight,
      onSubmit,
      disabled
    }}>
          <div ref={ref} className={cn("rounded-3xl border border-white/10 bg-[#121212] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300", isLoading && "border-red-500/70", className)} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
            {children}
          </div>
        </PromptInputContext.Provider>
      </TooltipProvider>;
});
PromptInput.displayName = "PromptInput";
interface PromptInputTextareaProps {
  disableAutosize?: boolean;
  placeholder?: string;
}
const PromptInputTextarea: React.FC<PromptInputTextareaProps & React.ComponentProps<typeof Textarea>> = ({
  className,
  onKeyDown,
  disableAutosize = false,
  placeholder,
  ...props
}) => {
  const {
    value,
    setValue,
    maxHeight,
    onSubmit,
    disabled
  } = usePromptInput();
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  React.useEffect(() => {
    if (disableAutosize || !textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = typeof maxHeight === "number" ? `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px` : `min(${textareaRef.current.scrollHeight}px, ${maxHeight})`;
  }, [value, maxHeight, disableAutosize]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit?.();
    }
    onKeyDown?.(e);
  };
  return <Textarea ref={textareaRef} value={value} onChange={e => setValue(e.target.value)} onKeyDown={handleKeyDown} className={cn("text-base", className)} disabled={disabled} placeholder={placeholder} {...props} />;
};
interface PromptInputActionsProps extends React.HTMLAttributes<HTMLDivElement> {}
const PromptInputActions: React.FC<PromptInputActionsProps> = ({
  children,
  className,
  ...props
}) => <div className={cn("flex items-center gap-2", className)} {...props}>
    {children}
  </div>;
interface PromptInputActionProps extends React.ComponentProps<typeof Tooltip> {
  tooltip: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}
const PromptInputAction: React.FC<PromptInputActionProps> = ({
  tooltip,
  children,
  className,
  side = "top",
  ...props
}) => {
  const {
    disabled
  } = usePromptInput();
  return <Tooltip {...props}>
      <TooltipTrigger asChild disabled={disabled}>
        {children}
      </TooltipTrigger>
      <TooltipContent side={side} className={className}>
        {tooltip}
      </TooltipContent>
    </Tooltip>;
};

// Main Enhanced Prompt Input Box Component
interface EnhancedPromptInputBoxProps {
  onSend?: (message: string, files?: File[]) => void;
  onFileSelect?: (file: File) => void;
  isLoading?: boolean;
  placeholder?: string;
  className?: string;
  hasFile?: boolean;
  onClearFile?: () => void;
  onRequestPayment?: () => void;
  canAnalyze?: boolean;
}
export const EnhancedPromptInputBox = React.forwardRef<HTMLDivElement, EnhancedPromptInputBoxProps>((props, ref) => {
  const {
    onSend = () => {},
    onFileSelect,
    isLoading = false,
    placeholder = "Drop file to scan or type a message...",
    className,
    hasFile = false,
    onClearFile,
    onRequestPayment,
    canAnalyze = false
  } = props;
  usePromptBoxStyles();
  const [input, setInput] = React.useState("");
  const [files, setFiles] = React.useState<File[]>([]);
  const [filePreviews, setFilePreviews] = React.useState<{
    [key: string]: string;
  }>({});
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [isRecording, setIsRecording] = React.useState(false);
  const [interimTranscript, setInterimTranscript] = React.useState("");
  const uploadInputRef = React.useRef<HTMLInputElement>(null);
  const recognitionRef = React.useRef<any>(null);

  // Initialize speech recognition with continuous + interim results
  React.useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      recognition.onresult = (event: any) => {
        let interim = "";
        let final = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += transcript;
          } else {
            interim += transcript;
          }
        }
        if (final) {
          setInput(prev => (prev ? prev + " " : "") + final.trim());
          setInterimTranscript("");
        } else {
          setInterimTranscript(interim);
        }
      };
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        if (event.error !== "aborted") {
          setIsRecording(false);
          setInterimTranscript("");
          toast.error("Voice recognition failed. Please try again.");
        }
      };
      recognition.onend = () => {
        // If still supposed to be recording, restart (browser auto-stops sometimes)
        if (recognitionRef.current?._shouldBeRecording) {
          try {
            recognition.start();
          } catch (e) {
            setIsRecording(false);
            setInterimTranscript("");
          }
        } else {
          setIsRecording(false);
          setInterimTranscript("");
        }
      };
      recognitionRef.current = recognition;
    }
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current._shouldBeRecording = false;
        recognitionRef.current.stop();
      }
    };
  }, []);
  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      toast.error("Voice recognition is not supported in this browser.");
      return;
    }
    if (isRecording) {
      recognitionRef.current._shouldBeRecording = false;
      recognitionRef.current.stop();
      setIsRecording(false);
      setInterimTranscript("");
    } else {
      try {
        recognitionRef.current._shouldBeRecording = true;
        recognitionRef.current.start();
        setIsRecording(true);
        setInterimTranscript("");
      } catch (error) {
        console.error("Failed to start recognition:", error);
        toast.error("Failed to start voice recognition.");
      }
    }
  };
  const isImageFile = (file: File) => file.type.startsWith("image/");
  const processFile = (file: File) => {
    if (onFileSelect) {
      onFileSelect(file);
      return;
    }
    if (!isImageFile(file)) {
      toast.error("Only image files are allowed");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large (max 10MB)");
      return;
    }
    setFiles([file]);
    const reader = new FileReader();
    reader.onload = e => setFilePreviews({
      [file.name]: e.target?.result as string
    });
    reader.readAsDataURL(file);
  };
  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleDrop = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) processFile(droppedFiles[0]);
  }, []);
  const handleRemoveFile = (index: number) => {
    const fileToRemove = files[index];
    if (fileToRemove && filePreviews[fileToRemove.name]) setFilePreviews({});
    setFiles([]);
    onClearFile?.();
  };
  const openImageModal = (imageUrl: string) => setSelectedImage(imageUrl);
  const handlePaste = React.useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          processFile(file);
          break;
        }
      }
    }
  }, []);
  React.useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [handlePaste]);
  const handleSubmit = () => {
    if (hasFile && canAnalyze && onRequestPayment) {
      onRequestPayment();
      return;
    }
    if (input.trim() || files.length > 0) {
      onSend(input, files);
      setInput("");
      setFiles([]);
      setFilePreviews({});
    }
  };
  const hasContent = input.trim() !== "" || files.length > 0 || hasFile;
  return <>
        <PromptInput value={input} onValueChange={setInput} isLoading={isLoading} onSubmit={handleSubmit} className={cn("w-full max-w-[600px] bg-[#121212] border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 ease-in-out", isRecording && "border-red-500/70", className)} disabled={isLoading} ref={ref} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
          {files.length > 0 && !isRecording && <div className="flex flex-wrap gap-2 p-0 pb-1 transition-all duration-300">
              {files.map((file, index) => <div key={index} className="relative group">
                  {file.type.startsWith("image/") && filePreviews[file.name] && <div className="w-16 h-16 rounded-xl overflow-hidden cursor-pointer transition-all duration-300" onClick={() => openImageModal(filePreviews[file.name])}>
                      <img src={filePreviews[file.name]} alt={file.name} className="h-full w-full object-cover" />
                      <button onClick={e => {
              e.stopPropagation();
              handleRemoveFile(index);
            }} className="absolute top-1 right-1 rounded-full bg-black/70 p-0.5 opacity-100 transition-opacity">
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </div>}
                </div>)}
            </div>}

          <div className={cn("transition-all duration-300", isRecording ? "h-0 overflow-hidden opacity-0" : "opacity-100")}>
            <PromptInputTextarea placeholder={placeholder} className="text-base" />
          </div>

          <VoiceListeningIndicator isRecording={isRecording} interimText={interimTranscript} />

          <PromptInputActions className="flex items-center justify-between gap-2 p-0 pt-2">
            <div className={cn("flex items-center gap-1 transition-all duration-300", isRecording ? "opacity-40 pointer-events-none" : "opacity-100")}>
              {/* File Upload */}
              <PromptInputAction tooltip="Attach file">
                <button onClick={() => uploadInputRef.current?.click()} className="flex h-8 w-8 text-white/60 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-white/10 hover:text-white/90" disabled={isRecording} type="button">
                  <Paperclip className="h-[18px] w-[18px] transition-colors" />
                  <input ref={uploadInputRef} type="file" className="hidden" onChange={e => {
                if (e.target.files && e.target.files.length > 0) processFile(e.target.files[0]);
                if (e.target) e.target.value = "";
              }} accept="*/*" />
                </button>
              </PromptInputAction>

              {/* Web Search */}
              <PromptInputAction tooltip="Web search (coming soon)">
                <button type="button" className="text-white/60 hover:text-white/90 hover:bg-white/10 transition h-8 w-8 rounded-full flex items-center justify-center" onClick={() => toast.info("Web search feature coming soon!")} disabled={isRecording}>
                  <Globe className="h-[18px] w-[18px]" />
                </button>
              </PromptInputAction>

              {/* Settings */}
              <PromptInputAction tooltip="Settings (coming soon)">
                <button type="button" className="text-white/60 hover:text-white/90 hover:bg-white/10 transition h-8 w-8 rounded-full flex items-center justify-center" onClick={() => toast.info("Settings panel coming soon!")} disabled={isRecording}>
                  <Settings className="h-[18px] w-[18px]" />
                </button>
              </PromptInputAction>
            </div>

            <div className="flex items-center gap-2">
              {/* Mic / Stop Button */}
              <PromptInputAction tooltip={isRecording ? "Stop listening" : "Voice input"}>
                <button type="button" onClick={toggleVoiceInput} className={cn(
                  "flex h-9 w-9 cursor-pointer items-center justify-center rounded-full transition-all duration-200",
                  isRecording
                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30 ring-2 ring-red-500/50"
                    : "text-white/60 hover:bg-white/10 hover:text-white/90"
                )} disabled={isLoading}>
                  {isRecording ? <StopCircle className="h-5 w-5" /> : <Mic className="h-[18px] w-[18px]" />}
                </button>
              </PromptInputAction>

              {/* Send Button */}
              {!isRecording && (
                <PromptInputAction tooltip={isLoading ? "Stop generation" : hasFile && canAnalyze ? "Scan file" : hasContent ? "Send message" : "Send"}>
                  <button type="button" onClick={() => {
                    if (hasContent) handleSubmit();
                  }} disabled={!hasContent && !isLoading} className={cn("h-9 w-9 rounded-full transition-all duration-200 flex items-center justify-center", hasContent ? "bg-[#4ADE80] text-[#121212] shadow-[0_0_18px_rgba(74,222,128,0.55)]" : "bg-transparent text-white/30 cursor-not-allowed")}>
                    {isLoading ? <Square className="h-4 w-4 fill-current animate-pulse" /> : hasFile && canAnalyze ? <ShieldCheck className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
                  </button>
                </PromptInputAction>
              )}
            </div>
          </PromptInputActions>
        </PromptInput>

        <ImageViewDialog imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
      </>;
});
EnhancedPromptInputBox.displayName = "EnhancedPromptInputBox";