import React, { createContext, useContext, useEffect, ReactNode, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

// NOTE: In a production environment, this should come from configuration.
const SOCKET_URL = "http://localhost:4000";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);

  if (!socketRef.current) {
    socketRef.current = io(SOCKET_URL, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;
    
    socket.on('connect', () => {
      console.log('🟢 Conectado al Núcleo de Sincronización de OmniCorp (SocketProvider).');
    });

    socket.on('disconnect', () => {
      console.log('🔴 Desconectado del Núcleo de Sincronización de OmniCorp (SocketProvider).');
    });

    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};
