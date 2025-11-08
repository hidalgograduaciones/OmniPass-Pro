import React, { useState } from 'react';
import ScannerView from './ScannerView';
import ValidationAura from './ValidationAura';
import { QRTokenPayload } from '../../types';

const ScannerPage: React.FC = () => {
  const [scanResult, setScanResult] = useState<QRTokenPayload | null>(null);
  const [scannedCodes, setScannedCodes] = useState<Set<string>>(new Set());
  const [isDuplicate, setIsDuplicate] = useState(false);
  
  const handleScanSuccess = (decodedData: QRTokenPayload) => {
    if (scannedCodes.has(decodedData.id)) {
      setIsDuplicate(true);
    } else {
      setScannedCodes(prev => new Set(prev).add(decodedData.id));
      setIsDuplicate(false);
    }
    setScanResult(decodedData);
  };

  const handleScanFailure = (error: string) => {
    // Could add more robust error handling here, e.g., showing a toast notification.
    console.error(`QR scan error: ${error}`);
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
