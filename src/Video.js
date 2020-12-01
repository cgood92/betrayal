import React, {useEffect, useRef} from 'react';

export default function Video({stream}) {
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <video autoPlay playsInline ref={videoRef} style={{maxWidth: '100%'}} />
  );
}
