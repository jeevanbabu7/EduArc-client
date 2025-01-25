import {io} from 'socket.io-client';
import {useEffect, useState} from 'react';

const useSocket = () => {
    const [socket, setSocket] = useState(null);
    
    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);
    
        return () => newSocket.close();
    }, []);
    
    return socket;
}