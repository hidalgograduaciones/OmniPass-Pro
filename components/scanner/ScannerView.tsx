import React, { useEffect, useRef, useState } from 'react';
import { decodeInvitationToken } from '../../utils/invitationUtils';
import { QRTokenPayload } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';

// Declare the type for the external library
declare const Html5Qrcode: any;

interface ScannerViewProps {
  onScanSuccess: (decodedData: QRTokenPayload) => void;
  onScanFailure: (error: string) => void;
}

const ScannerView: React.FC<ScannerViewProps> = ({ onScanSuccess, onScanFailure }) => {
  const { t } = useLanguage();
  const scannerRef = useRef<any>(null);
  const [cameras, setCameras] = useState<{ id: string; label: string }[]>([]);
  const [selectedCameraId, setSelectedCameraId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initScanner = async () => {
      try {
        const devices = await Html5Qrcode.getCameras();
        if (devices && devices.length) {
          setCameras(devices);
          // Prefer back camera
          const backCamera = devices.find((device: any) => device.label.toLowerCase().includes('back'));
          const initialCameraId = backCamera ? backCamera.id : devices[0].id;
          setSelectedCameraId(initialCameraId);
        } else {
          setError(t('scanner.errorNoCamera'));
        }
      } catch (err) {
        console.error("Error getting cameras:", err);
        setError(t('scanner.errorAccessCamera'));
      }
    };
    initScanner();
  }, [t]);
  
  useEffect(() => {
    if (selectedCameraId) {
      const html5QrCode = new Html5Qrcode("qr-reader");
      scannerRef.current = html5QrCode;

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      };

      const qrCodeSuccessCallback = (decodedText: string, decodedResult: any) => {
        const payload = decodeInvitationToken(decodedText);
        if (payload) {
          onScanSuccess(payload);
          scannerRef.current.stop();
        } else {
          onScanFailure("Invalid QR code format.");
        }
      };
      
      html5QrCode.start({ deviceId: { exact: selectedCameraId } }, config, qrCodeSuccessCallback, onScanFailure)
        .catch((err: any) => {
          setError(t('scanner.errorStartScanner'));
          console.error("Scanner start error:", err);
        });

      return () => {
        if (scannerRef.current && scannerRef.current.isScanning) {
          scannerRef.current.stop().catch((err: any) => console.error("Failed to stop scanner", err));
        }
      };
    }
  }, [selectedCameraId, onScanSuccess, onScanFailure, t]);
  

  return (
    <div className="w-full max-w-2xl mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold text-white mb-2">{t('scanner.title')}</h1>
      <p className="text-omni-blue mb-6">{t('scanner.subtitle')}</p>
      
      {error ? (
        <div className="bg-red-900/50 border border-red-500 text-red-300 p-4 rounded-lg">
          <p>{error}</p>
        </div>
      ) : (
        <div id="qr-reader" className="w-full rounded-lg overflow-hidden border-2 border-omni-gray-light relative">
            <div className="absolute inset-0 z-10 scanner-overlay"></div>
        </div>
      )}

      {cameras.length > 1 && (
        <div className="mt-4">
            <select 
                onChange={(e) => setSelectedCameraId(e.target.value)} 
                value={selectedCameraId || ''}
                className="bg-omni-gray border border-omni-gray-light rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-omni-blue"
            >
                {cameras.map(camera => (
                    <option key={camera.id} value={camera.id}>{camera.label}</option>
                ))}
            </select>
        </div>
      )}
      <style>{`
        #qr-reader video {
          width: 100% !important;
          height: auto !important;
          border-radius: 6px;
        }
        .scanner-overlay {
          box-shadow: inset 0 0 0 50vmax rgba(0, 0, 0, 0.7);
        }
      `}</style>
    </div>
  );
};

export default ScannerView;
