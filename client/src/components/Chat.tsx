import { HubConnectionBuilder } from '@microsoft/signalr';
import { useEffect, useRef, useState } from 'react';

import ChatInput from './ChatInput';
import ChatWindow from './ChatWindow';

const Chat = () => {
    const [ connection, setConnection ] = useState<any>(null);
    const [ chat, setChat ] = useState<any>([]);
    const latestChat = useRef<any>(null);

    latestChat.current = chat;

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7067/hubs/chat')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then((result: any) => {
                    console.log('Connected!');
    
                    connection.on('ReceiveMessage', (message: any) => {
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);
                    
                        setChat(updatedChat);
                    });
                })
                .catch((e: any) => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const sendMessage = async (user: any, message: any) => {
        const chatMessage = {
            user: user,
            message: message
        };
        
        if (connection._connectionStarted) {
            try {
                await  fetch('https://localhost:7067/chat/messages', { 
                    method: 'POST', 
                    body: JSON.stringify(chatMessage),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            catch(e) {
                console.log(e);
            }
        }
        else {
            alert('No connection to server yet.');
        }
    }

    return (
        <div>
            <ChatInput sendMessage={sendMessage} />
            <hr />
            <ChatWindow chat={chat}/>
        </div>
    );
};

export default Chat;