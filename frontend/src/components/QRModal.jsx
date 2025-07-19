// import React, { useEffect, useRef, useState } from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import { Html5Qrcode } from 'html5-qrcode';
// import QRCode from 'qrcode';

// const QRModals = () => {
//   const [showScanModal, setShowScanModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [scanResult, setScanResult] = useState('');
//   const [qrImageUrl, setQrImageUrl] = useState('');
//   const html5QrCodeRef = useRef(null);
//   const qrCodeContainerId = 'reader';

//   const qrText = 'https://yourdomain.com/user/123';

//   useEffect(() => {
//     if (showViewModal) {
//       // Generate QR image when modal opens
//       QRCode.toDataURL(qrText)
//         .then(url => setQrImageUrl(url))
//         .catch(err => console.error(err));
//     }
//   }, [showViewModal]);

//   const startQrScanner = () => {
//     if (html5QrCodeRef.current) return;

//     html5QrCodeRef.current = new Html5Qrcode(qrCodeContainerId);
//     html5QrCodeRef.current
//       .start(
//         { facingMode: 'environment' },
//         {
//           fps: 10,
//           qrbox: { width: 250, height: 250 },
//         },
//         qrCodeMessage => {
//           setScanResult(qrCodeMessage);
//           stopQrScanner(); // Stop after successful scan
//         },
//         errorMessage => {
//           // console.log(`Scan error: ${errorMessage}`);
//         }
//       )
//       .catch(err => console.error('Start failed', err));
//   };

//   const stopQrScanner = () => {
//     if (html5QrCodeRef.current) {
//       html5QrCodeRef.current.stop().then(() => {
//         html5QrCodeRef.current.clear();
//         html5QrCodeRef.current = null;
//       });
//     }
//   };

//   return (
//     <div className="container text-center mt-5">
//       <h3>QR Code Modals (No React Packages)</h3>

//       <Button className="m-2" onClick={() => { setShowScanModal(true); setTimeout(startQrScanner, 300); }}>
//         Scan QR Code
//       </Button>
//       <Button className="m-2" variant="success" onClick={() => setShowViewModal(true)}>
//         Show QR Code
//       </Button>

//       {/* Scan QR Modal */}
//       <Modal
//         show={showScanModal}
//         onHide={() => {
//           setShowScanModal(false);
//           stopQrScanner();
//         }}
//         centered
//         size="lg"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Scan QR Code</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="d-flex justify-content-center flex-column align-items-center">
//             <div id={qrCodeContainerId} style={{ width: '100%', maxWidth: 400 }}></div>
//             <p className="mt-3">
//               {scanResult ? `Scanned: ${scanResult}` : 'Scanning...'}
//             </p>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => { setShowScanModal(false); stopQrScanner(); }}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Show QR Modal */}
//       <Modal
//         show={showViewModal}
//         onHide={() => setShowViewModal(false)}
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Your QR Code</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="text-center">
//           {qrImageUrl ? (
//             <img src={qrImageUrl} alt="QR Code" width="256" />
//           ) : (
//             <p>Loading QR...</p>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowViewModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default QRModals;
