"use client";

import { useState, useCallback } from "react";
import { Mic, MicOff, Languages, X, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

const languages = [
    { code: "en", name: "English" },
    { code: "ja", name: "Japanese" },
    { code: "zh", name: "Chinese" },
    { code: "ko", name: "Korean" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "tl", name: "Tagalog" }
];

// Map language codes to BCP 47 language tags for speech synthesis
const languageVoiceMappings: Record<string, string> = {
    en: "en-US",
    ja: "ja-JP",
    zh: "zh-CN",
    ko: "ko-KR",
    es: "es-ES",
    fr: "fr-FR",
    de: "de-DE",
    tl: "fil-PH"
};

export function TranslationButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [spokenText, setSpokenText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [sourceLanguage, setSourceLanguage] = useState("en");
    const [targetLanguage, setTargetLanguage] = useState("ja");

    const speakTranslation = useCallback((textToSpeak: string, language: string) => {
        if (!textToSpeak || !window.speechSynthesis) return;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = languageVoiceMappings[language];
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    }, []); // No dependencies needed anymore

    // Simulate speech recognition
    const startListening = () => {
        setIsListening(true);

        // Simulate receiving speech input
        const timer = setTimeout(() => {
            setSpokenText("Hello, can you tell me where the nearest train station is?");
            setIsListening(false);

            // Simulate translation after speech is captured
            setTimeout(() => {
                const translation = "こんにちは、最寄りの駅はどこですか？";
                setTranslatedText(translation);
                speakTranslation(translation, targetLanguage);
            }, 1000);
        }, 2000);

        return () => clearTimeout(timer);
    };

    const stopListening = () => {
        setIsListening(false);
    };

    const resetTranslation = () => {
        setSpokenText("");
        setTranslatedText("");
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    const handleSourceLanguageChange = (value: string) => {
        setSourceLanguage(value);
        resetTranslation();
    };

    const handleTargetLanguageChange = (value: string) => {
        setTargetLanguage(value);

        // Simulate translation changing based on target language
        if (spokenText) {
            setTranslatedText(""); // Clear first

            // Simulate translation delay
            setTimeout(() => {
                const translations: Record<string, string> = {
                    ja: "こんにちは、最寄りの駅はどこですか？",
                    zh: "你好，请问最近的火车站在哪里？",
                    ko: "안녕하세요, 가장 가까운 기차역이 어디인가요?",
                    es: "Hola, ¿puedes decirme dónde está la estación de tren más cercana?",
                    fr: "Bonjour, pouvez-vous me dire où se trouve la gare la plus proche ?",
                    de: "Hallo, können Sie mir sagen, wo der nächste Bahnhof ist?",
                    en: "Hello, can you tell me where the nearest train station is?",
                    tl: "Hello, pwede mo bang sabihin kung nasaan ang pinakamalapit na istasyon ng tren?"
                };

                const newTranslation = translations[value] || "Translation not available";
                setTranslatedText(newTranslation);
                speakTranslation(newTranslation, value);
            }, 800);
        }
    };

    return (
        <>
            <Button
                variant="default"
                size="icon"
                className="fixed right-3 bottom-3 z-50 rounded-full h-14 w-14 shadow-lg"
                onClick={() => setIsOpen(true)}
            >
                <Languages className="h-6 w-6" />
                <span className="sr-only">Open translator</span>
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Voice Translator</DialogTitle>
                        <DialogDescription>
                            Speak in one language and get instant translation.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Source Language</label>
                                <Select
                                    value={sourceLanguage}
                                    onValueChange={handleSourceLanguageChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {languages.map((lang) => (
                                            <SelectItem
                                                key={`source-${lang.code}`}
                                                value={lang.code}
                                            >
                                                {lang.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Target Language</label>
                                <Select
                                    value={targetLanguage}
                                    onValueChange={handleTargetLanguageChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {languages.map((lang) => (
                                            <SelectItem
                                                key={`target-${lang.code}`}
                                                value={lang.code}
                                            >
                                                {lang.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium">Your Speech</label>
                                <Button
                                    variant={isListening ? "destructive" : "outline"}
                                    size="sm"
                                    className="gap-1"
                                    onClick={isListening ? stopListening : startListening}
                                >
                                    {isListening ? (
                                        <>
                                            <MicOff className="h-4 w-4" />
                                            Stop
                                        </>
                                    ) : (
                                        <>
                                            <Mic className="h-4 w-4" />
                                            Start Speaking
                                        </>
                                    )}
                                </Button>
                            </div>

                            <div className="relative">
                                <Textarea
                                    placeholder={
                                        isListening
                                            ? "Listening..."
                                            : "Speak or type your text here"
                                    }
                                    value={spokenText}
                                    onChange={(e) => setSpokenText(e.target.value)}
                                    className="min-h-[80px]"
                                />
                                {spokenText && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2 h-6 w-6"
                                        onClick={() => setSpokenText("")}
                                    >
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Clear text</span>
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium">Translation</label>
                                {translatedText && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="gap-1"
                                        onClick={() => {
                                            if (isSpeaking) {
                                                window.speechSynthesis.cancel();
                                                setIsSpeaking(false);
                                            } else {
                                                speakTranslation(translatedText, targetLanguage);
                                            }
                                        }}
                                    >
                                        {isSpeaking ? (
                                            <>
                                                <VolumeX className="h-4 w-4" />
                                                Stop
                                            </>
                                        ) : (
                                            <>
                                                <Volume2 className="h-4 w-4" />
                                                Speak
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                            <div className="border rounded-md p-3 min-h-[80px] bg-muted/50">
                                {translatedText ? (
                                    <p>{translatedText}</p>
                                ) : (
                                    <p className="text-muted-foreground">
                                        {isListening
                                            ? "Listening for speech..."
                                            : "Translation will appear here"}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex justify-between">
                        <Button variant="outline" onClick={resetTranslation}>
                            Reset
                        </Button>
                        <Button onClick={() => setIsOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
