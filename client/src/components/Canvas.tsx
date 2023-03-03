import React, { useEffect } from 'react';
import { useRef } from 'react';
import { FormattedMessage } from 'react-intl';

const WIDTH = 350;
const HEIGHT = 180;

interface ICanvasProps {
  canvasId: string;
  results: { value: number; createdAt: string }[];
}
export const Canvas = ({ canvasId, results }: ICanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  canvasRef.current?.getContext('2d');
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      let ctx = canvasCtxRef.current;
      ctx!.beginPath();
      ctx!.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx!.fillStyle = '#000000';
      ctx!.fillRect(0, HEIGHT, 2, -HEIGHT);
      ctx!.fillStyle = '#000000';
      ctx!.fillRect(0, HEIGHT, WIDTH, -2);
      let startBarX = 30;
      let startBarY = 2;
      const maxHeight = HEIGHT * 0.8;
      const barWidth = results.length < 5 ? 35 : results.length < 10 ? 20 : 15;
      const gap =
        results.length < 5
          ? barWidth * 1.5
          : results.length < 10
          ? barWidth * 2
          : barWidth * 3;
      for (let res of results) {
        const currentHeight =
          (res.value /
            Math.max.apply(
              null,
              results.map((result) => result.value)
            )) *
          maxHeight;

        ctx!.fillStyle = `#000000`;
        ctx!.font = '16px Inter';
        ctx!.save();
        ctx!.translate(0, HEIGHT);
        ctx?.fillRect(startBarX, -startBarY, barWidth, -currentHeight);
        ctx!.fillStyle = '#056294';
        ctx!.fillText(res.value.toString(), startBarX, -currentHeight - 20);
        ctx!.restore();
        startBarX += gap;
      }
    }
  }, []);
  return (
    <>
      <p className="upper-case your-progress">
        <FormattedMessage id="your_progress" />
      </p>
      <canvas width="350" ref={canvasRef} id={canvasId} height="200"></canvas>
    </>
  );
};
