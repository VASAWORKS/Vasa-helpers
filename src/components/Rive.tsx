import { useEffect, useRef, useState } from 'react';
import type * as rive from '@rive-app/canvas/rive';
import { isInViewport } from '../utils';

type RiveProps = {
  src: string;
  autoPlay?: boolean;
  loadingBackground: string;
  loadingSpinnerColor: string;
  fontSource?: string;
  startOnView: boolean;
  stateMachine: string;
  fit:
    | 'Cover'
    | 'Contain'
    | 'Fill'
    | 'None'
    | 'Scale-down'
    | 'Fit-Width'
    | 'Fit-Height'
    | 'Layout';
};

export const Rive = ({
  src,
  startOnView,
  fontSource,
  autoPlay,
  loadingSpinnerColor = '#ffffff',
  loadingBackground = '#303030',
  stateMachine = 'State Machine 1',
  fit = 'Cover',
}: RiveProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const riveCanvas = useRef<HTMLCanvasElement>(null);
  const riveInstance = useRef<rive.Rive | null>(null);
  const loadingSpinner = useRef<HTMLOrSVGElement>(null);

  useEffect(() => {
    (async () => {
      gsap
        .timeline({
          repeat: -1,
        })
        .to(loadingSpinner.current, {
          duration: 1,
          ease: 'none',
          rotate: 360,
        });

      if (typeof window === 'undefined') {
        setError('Window is not defined');
        return;
      }

      console.log('rive: ', rive);
      if (!rive) {
        setError('Rive is not defined');
        return;
      }
      if (!gsap) {
        setError('GSAP is not defined');
        return;
      }
      if (!src) {
        setError('Rive Source is not defined');
        return;
      }

      // Fetchin rive fonts
      if (fontSource) {
        if (!window.riveFonts[fontSource]) {
          const fontResponse = await fetch(fontSource);
          if (!fontResponse.ok) {
            setError('Failed to fetch font');
            return;
          }

          const arrayBuffer = await fontResponse.arrayBuffer();
          window.riveFonts[fontSource] = await rive.decodeFont(
            new Uint8Array(arrayBuffer)
          );
        }
      }

      let riveFit: rive.Fit;
      switch (fit) {
        case 'Cover':
          riveFit = rive.Fit.Cover;
          break;
        case 'Contain':
          riveFit = rive.Fit.Contain;
          break;
        case 'Fill':
          riveFit = rive.Fit.Fill;
          break;
        case 'None':
          riveFit = rive.Fit.None;
          break;
        case 'Scale-down':
          riveFit = rive.Fit.ScaleDown;
          break;
        case 'Fit-Width':
          riveFit = rive.Fit.FitWidth;
          break;
        case 'Fit-Height':
          riveFit = rive.Fit.FitHeight;
          break;
        case 'Layout':
          riveFit = rive.Fit.Layout;
          break;
        default:
          setError('Invalid fit');
          return;
      }

      console.log('rive fit: ', riveFit);

      riveInstance.current = new rive.Rive({
        canvas: riveCanvas.current!,
        src,
        autoPlay,
        onLoad: () => {
          setError(null);
          setLoading(false);
          riveInstance.current.resizeDrawingSurfaceToCanvas();
          riveInstance.current!.play(stateMachine);
        },
        layout: new rive.Layout({
          fit: riveFit,
        }),
        assetLoader: async (asset, bytes) => {
          if (asset.isImage) {
            const image = await rive.decodeImage(new Uint8Array(bytes));
            console.log('image asset name: ', asset.name);
            asset.setRenderImage(image);
            image.unref();
            return true;
          }
          if (asset.cdnUuid.length > 0 || bytes.length > 0) {
            return false;
          }
          if (asset.isFont && fontSource) {
            try {
              asset.setFont(window.riveFonts[fontSource]);
              window.riveFonts[fontSource].unref();
            } catch (error) {
              console.error('Error setting asset font:', error);
            }

            return true;
          }

          return false;
        },
      });

      const onResize = () => {
        riveInstance.current.resizeDrawingSurfaceToCanvas();
      };

      window.addEventListener('resize', onResize);

      // start on view
      let alreadyStartedOnView = false;
      const onStartOnView = () => {
        if (startOnView && !alreadyStartedOnView) {
          if (isInViewport(riveCanvas.current))
            riveInstance.current.play(stateMachine);
          else riveInstance.current.pause();
        }
      };

      onStartOnView();
      const onScroll = () => {
        onStartOnView();
      };

      window.addEventListener('scroll', onScroll);

      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
      };
    })();
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <canvas
        ref={riveCanvas}
        style={{
          display: loading || error ? 'none' : 'block',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      ></canvas>

      {error && (
        <div
          style={{
            color: 'red',
            background: '#303030',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {error}
        </div>
      )}

      {loading && !error && (
        <div
          style={{
            background: loadingBackground,
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            style={{
              width: '20%',
              height: '30%',
            }}
            ref={loadingSpinner}
            fill={loadingSpinnerColor}
            width='800px'
            height='800px'
            viewBox='0 0 32 32'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M16 0.75c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0c7.042 0.001 12.75 5.71 12.75 12.751 0 3.521-1.427 6.709-3.734 9.016v0c-0.226 0.226-0.365 0.538-0.365 0.883 0 0.69 0.56 1.25 1.25 1.25 0.346 0 0.659-0.14 0.885-0.367l0-0c2.759-2.76 4.465-6.572 4.465-10.782 0-8.423-6.828-15.251-15.25-15.251h-0z'></path>
          </svg>
        </div>
      )}
    </div>
  );
};
