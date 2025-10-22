import { useEffect, useRef, useState } from 'react';

export const Timer = ({
  backgroundColor
}: {
  backgroundColor: 'cornsilk'
}) => {
  const [time, setTime] = useState(0);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const workerCode = `
    self.onmessage = function(e) {
      // Worker logic here
      setInterval(() => {
        self.postMessage(undefined);  
      }, 1000)
    };
  `;
    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);
    const worker = new Worker(workerUrl);

    worker.onmessage = function (e) {
      setTime(e.data);
    };
    workerRef.current = worker;
    worker.postMessage('Worker started');

    worker.onmessage = () => setTime((p) => p + 1);

    return () => {
      workerRef.current?.terminate();
      URL.revokeObjectURL(workerUrl);
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor,
        padding: '1rem',
        fontSize: '1.5rem',
        borderRadius: '3px',
        color: '#24b108',
      }}
    >
      <p>Time: {time}</p>
    </div>
  );
};
