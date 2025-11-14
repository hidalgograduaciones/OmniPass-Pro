import React, { useState } from 'react';
import ScannerView from './ScannerView';
import ValidationAura from './ValidationAura';
import { QRTokenPayload } from '../../types';
import { useSocket } from '../../hooks/useSocket';


const ScannerPage: React.FC = () => {
  const { socket } = useSocket();
  const [scanResult, setScanResult] = useState<QRTokenPayload | null>(null);
  const [scannedCodes, setScannedCodes] = useState<Set<string>>(new Set());
  const [isDuplicate, setIsDuplicate] = useState(false);
  
  const handleScanSuccess = (decodedData: QRTokenPayload) => {
    const isNewScan = !scannedCodes.has(decodedData.id);

    if (isNewScan) {
      setScannedCodes(prev => new Set(prev).add(decodedData.id));
      setIsDuplicate(false);
    } else {
      setIsDuplicate(true);
    }
    
    setScanResult(decodedData);

    // Enviar el evento de escaneo al servidor de sincronía.
    // Esto permite que el dashboard y los sistemas de proyección reaccionen en tiempo real.
    if (socket) {
      socket.emit("qrScanned", { 
        payload: decodedData, 
        timestamp: Date.now(),
        isDuplicate: !isNewScan,
      });
    }
  };

  const handleScanFailure = (error: string) => {
    // Aquí se podría implementar un sistema de notificaciones más robusto.
    console.error(`Error de escaneo QR: ${error}`);
  };

  const resetScanner = () => {
    setScanResult(null);
    setIsDuplicate(false);
  };

  return (
    <div className="w-full h-screen bg-omni-black flex flex-col items-center justify-center relative">
      {!scanResult ? (
        <ScannerView 
          onScanSuccess={handleScanSuccess} 
          onScanFailure={handleScanFailure} 
        />
      ) : (
        <ValidationAura 
          scanResult={scanResult}
          isDuplicate={isDuplicate}
          onReset={resetScanner} 
        />
      )}
    </div>
  );
};

export default ScannerPage;