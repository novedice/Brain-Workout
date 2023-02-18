import React, { useEffect } from 'react';
import { useRef } from 'react';
import { FormattedMessage } from 'react-intl';

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
      ctx!.fillRect(0, 250, 2, -250);
      ctx!.fillStyle = '#000000';
      ctx!.fillRect(0, 250, 500, -2);
      // ctx!.fillStyle = '#085a88';
      // ctx!.strokeStyle = '#085a88';
      // ctx!.font = '20px arial';
      // ctx!.strokeText(
      //   language === 'en' ? 'Your progress' : 'Ваш прогресс',
      //   8,
      //   20
      // );
      let startBarX = 30;
      let startBarY = 2;
      const maxHeight = 200;
      const barWidth = results.length < 5 ? 50 : results.length < 10 ? 25 : 15;
      const gap =
        results.length < 5
          ? barWidth * 1.5
          : results.length < 10
          ? barWidth * 2
          : barWidth * 3;
      for (let res of results) {
        const currentHeight =
          res.value < 50
            ? (res.value / 50) * maxHeight
            : (res.value / 10000) * maxHeight;

        ctx!.fillStyle = `#b3d5fc`;
        ctx!.font = '14px arial';
        ctx!.save();
        ctx!.translate(0, 250);
        ctx?.fillRect(startBarX, -startBarY, barWidth, -currentHeight);
        ctx!.fillStyle = '#085a88';
        ctx!.fillText(res.value.toString(), startBarX, -currentHeight - 30);
        ctx!.restore();
        startBarX += gap;
      }
    }
  }, []);
  return (
    <>
      <p className="upper-case text-blue-800">
        <FormattedMessage id="your_progress" />
      </p>
      <canvas width="500" ref={canvasRef} id={canvasId} height="250"></canvas>
    </>
  );
};
