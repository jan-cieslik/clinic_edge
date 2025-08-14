'use client';
import { useState, useRef, useEffect } from "react";
import AppCard from "../elements/appcard";
import { ArrowPathIcon, MicrophoneIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { getWaveBlob } from "webm-to-wav-converter";
const ReactMediaRecorder = dynamic(() => import("react-media-recorder").then((mod) => mod.ReactMediaRecorder), {
    ssr: false, // Disable SSR for this component
});

async function sendMessageServer(url, payload, file = null) {
    let options = {};

    if (file) {
        const formData = new FormData();
        formData.append("audio", file);
        formData.append("metadata", JSON.stringify(payload));

        options = {
            method: "POST",
            body: formData,
        };
    } else {
        options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        };
    }

    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    return res.json();
}


export default function PatChat({ patid, pre_messages, dict }) {
    async function sendMessage() {
        if (inputMessage.trim() !== '') {
            var previous_messages = messages
            setMessages([...messages, { "role": "user", "content": inputMessage, id: -1 }]);
            setLoading(true)
            var res = await sendMessageServer(url, { content: inputMessage });
            setMessages([...previous_messages, ...res]);
            setInputMessage('');
            setLoading(false)
            setShouldFocusInput(true);
        }
    }
    async function sendVoiceMessage(audioUrl) {
        setLoading(true);
        var previous_messages = messages
        setMessages([...messages, { role: "user", content: "(Voice Message)", audioUrl, type: "audio", id: -1 }]);
        const response = await fetch(audioUrl);
        const blob = await response.blob();
        const blobWave = await getWaveBlob(blob)
        const file = new File([blobWave], `voice_message_${Date.now()}.wav`, { type: blobWave.type });
        const res = await sendMessageServer(url, { content: "(Voice Message)", type: "audio" }, file);
        setMessages([...previous_messages, ...res]);
        setLoading(false);
    }
    const inputRef = useRef(null);
    const [isLoading, setLoading] = useState(false);
    const [messages, setMessages] = useState(pre_messages);
    const [inputMessage, setInputMessage] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [shouldFocusInput, setShouldFocusInput] = useState(false);
    const url = "/api/pat/" + patid + "/chat";
    useEffect(() => {
        if (shouldFocusInput) {
            inputRef.current?.focus();
            setShouldFocusInput(false); // Reset the flag
        }
    }, [shouldFocusInput]);
    return (
        <AppCard title={dict.chat.anamnesis}>
            <div className="flex flex-col">
                {/* Chat messages */}
                <div className="flex-grow overflow-y-auto p-4">
                    {messages ? messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
                        >
                            <div
                                className={`max-w-xs rounded-lg px-4 py-2 text-white ${message.role === 'user' ? 'bg-blue-700' : 'bg-gray-700 text-black'
                                    }`}
                            >
                                {message.content !== "(Voice Message)" && message.content}
                                {message.audioUrl != null && <audio controls>
                                    <source src={message.audioUrl} type="audio/webm" />
                                    Your browser does not support the audio element.
                                </audio>}
                                {message.audio_base64 != null && <audio controls>
                                    <source src={`data:audio/wav;base64,${message.audio_base64}`} type="audio/wav" />
                                    Your browser does not support the audio element.
                                </audio>}
                            </div>
                        </div>
                    )) : null}

                    {/* Loading bubble */}
                    {isLoading && (
                        <div className="flex justify-start mb-2">
                            <div className="flex items-center space-x-2 max-w-xs rounded-lg bg-gray-300 px-4 py-2 text-black">
                                <ArrowPathIcon className="h-5 w-5 animate-spin text-gray-600" />
                                <span>Loading...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input box */}
                <div className="border-t border-gray-300 bg-white p-4">
                    <div className="flex items-center">
                        <input
                            ref={inputRef}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault(); // Prevents new line
                                    sendMessage();
                                }
                            }}
                            disabled={isLoading}
                            value={inputMessage}
                            type="text"
                            placeholder={dict.chat.message}
                            className="flex-grow rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={isLoading}
                            className="ml-2 rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
                        >
                            {dict.general.submit}
                        </button>
                        <ReactMediaRecorder
                            audio={true}
                            blobPropertyBag={
                                {
                                    "type": "audio/webm"
                                }
                            }
                            render={({ startRecording, stopRecording, mediaBlobUrl }) => (
                                <>
                                    {/* Start Recording Button */}
                                    <button
                                        onMouseDown={() => { startRecording(); setIsRecording(true); }}
                                        onMouseUp={() => { stopRecording(); setIsRecording(false); }}
                                        className={`ml-2 rounded-full p-3 text-white ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                                    >
                                        <MicrophoneIcon className="h-5 w-5" />
                                    </button>

                                    {/* Send Voice Message */}
                                    {mediaBlobUrl && (
                                        <button
                                            onClick={() => sendVoiceMessage(mediaBlobUrl)}
                                            className="ml-2 rounded-full bg-blue-500 p-3 text-white hover:bg-blue-600"
                                        >
                                            <PaperAirplaneIcon className="h-5 w-5" />
                                        </button>
                                    )}
                                </>
                            )}
                        />
                    </div>
                </div>
            </div>
        </AppCard>
    )
}