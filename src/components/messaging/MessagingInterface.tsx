import React, { useState, useEffect } from 'react';
import { ContactList } from './ContactList';
import { MessageThread } from './MessageThread';
import { MessageComposer } from './MessageComposer';
import { AddContactModal } from './AddContactModal';
import { Contact, Message } from '../../types/message';
import { createMessage } from '../../utils/messageUtils';
import { useContacts } from '../../hooks/useContacts';
import { UserPlus } from 'lucide-react';

const CURRENT_USER_ID = 'current_user';

export function MessagingInterface() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showAddContact, setShowAddContact] = useState(false);
  const { contacts, loadContacts, saveContact } = useContacts();

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleSendMessage = (content: string) => {
    if (selectedContact) {
      const newMessage = createMessage(content, CURRENT_USER_ID, selectedContact.id);
      setMessages([...messages, newMessage]);
    }
  };

  const handleAddContact = async (contactData: { name: string; avatar?: string }) => {
    try {
      await saveContact(contactData);
    } catch (error) {
      console.error('Failed to add contact:', error);
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-64">
        <div className="mb-4 pb-2 border-b border-[#00ff9d] flex justify-between items-center">
          <h2 className="terminal-text text-[10px] md:text-xs">CONTACTS</h2>
          <button
            onClick={() => setShowAddContact(true)}
            className="terminal-button p-1"
            aria-label="Add contact"
          >
            <UserPlus className="h-3 w-3 md:h-4 md:w-4" />
          </button>
        </div>
        <ContactList
          contacts={contacts}
          onSelectContact={setSelectedContact}
          selectedContactId={selectedContact?.id}
        />
      </div>
      
      <div className="flex-1">
        {selectedContact ? (
          <>
            <div className="mb-4 pb-2 border-b border-[#00ff9d]">
              <h2 className="terminal-text text-[10px] md:text-xs">
                CHAT WITH {selectedContact.name.toUpperCase()}
              </h2>
            </div>
            <MessageThread
              messages={messages.filter(
                msg =>
                  (msg.senderId === CURRENT_USER_ID && msg.receiverId === selectedContact.id) ||
                  (msg.receiverId === CURRENT_USER_ID && msg.senderId === selectedContact.id)
              )}
              currentUserId={CURRENT_USER_ID}
            />
            <div className="mt-4">
              <MessageComposer
                onSendMessage={handleSendMessage}
                recipientName={selectedContact.name}
              />
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="terminal-text text-[10px] md:text-xs text-[#00ff9d]/70">
              Select a contact to start messaging
            </p>
          </div>
        )}
      </div>

      {showAddContact && (
        <AddContactModal
          onClose={() => setShowAddContact(false)}
          onSave={handleAddContact}
        />
      )}
    </div>
  );
}