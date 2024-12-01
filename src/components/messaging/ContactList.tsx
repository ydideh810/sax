import React from 'react';
import { Contact } from '../../types/message';
import { User, Phone } from 'lucide-react';

interface ContactListProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
  selectedContactId?: string;
}

export function ContactList({ contacts, onSelectContact, selectedContactId }: ContactListProps) {
  return (
    <div className="space-y-2">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          onClick={() => onSelectContact(contact)}
          className={`
            flex items-center gap-3 p-2 rounded cursor-pointer
            border border-[#00ff9d] transition-colors duration-200
            ${selectedContactId === contact.id ? 'bg-[#00ff9d]/20' : 'hover:bg-[#00ff9d]/10'}
          `}
        >
          {contact.avatar ? (
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-8 h-8 rounded-full border border-[#00ff9d]"
            />
          ) : (
            <div className="w-8 h-8 rounded-full border border-[#00ff9d] flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="terminal-text text-[10px] md:text-xs truncate">{contact.name}</p>
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-[#00ff9d]/70" />
              <p className="terminal-text text-[8px] md:text-[10px] text-[#00ff9d]/70 truncate">
                {contact.phoneNumber}
              </p>
            </div>
            {contact.status === 'online' && (
              <p className="terminal-text text-[8px] md:text-[10px] text-[#00ff9d]">
                Online
              </p>
            )}
            {contact.status === 'typing' && (
              <p className="terminal-text text-[8px] md:text-[10px] text-[#00ff9d] animate-pulse">
                Typing...
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}