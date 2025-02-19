import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { VoiceButton } from '../VoiceButton';
import { VoiceRecorder } from './VoiceRecorder';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';

interface MessageComposerProps {
  onSendMessage: (content: string) => void;
  onSendVoiceNote: (audioBlob: Blob) => void;
  recipientName: string;
}

export function MessageComposer({ onSendMessage, onSendVoiceNote, recipientName }: MessageComposerProps) {
  const [message, setMessage] = useState('');
  const { isListening, transcript, startListening, stopListening, error } = useSpeechRecognition();

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Message ${recipientName}...`}
          className="terminal-input flex-1 min-h-[40px] max-h-[120px] resize-y"
          rows={1}
        />
        <div className="flex flex-col gap-2">
          <VoiceButton
            isListening={isListening}
            onClick={isListening ? stopListening : startListening}
            disabled={!!error}
          />
          <button
            onClick={handleSend}
            className="terminal-button h-9 md:h-10 px-2 md:px-3"
            aria-label="Send message"
          >
            <Send className="h-3 w-3 md:h-4 md:w-4" />
          </button>
          <VoiceRecorder onSendVoiceNote={onSendVoiceNote} />
        </div>
      </div>
      {error && (
        <p className="text-red-500 terminal-text text-[8px] md:text-[10px]">{error}</p>
      )}
      {isListening && (
        <p className="text-[#00ff9d] terminal-text text-[8px] md:text-[10px] animate-pulse">
          Listening...
        </p>
      )}
    </div>
  );
}