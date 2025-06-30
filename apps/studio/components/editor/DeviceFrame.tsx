'use client';

import { ReactNode } from 'react';

interface DeviceFrameProps {
  device: 'mobile' | 'tablet' | 'desktop';
  children: ReactNode;
  showFrame?: boolean;
}

export function DeviceFrame({ device, children, showFrame = true }: DeviceFrameProps) {
  const getDeviceStyles = () => {
    switch (device) {
      case 'mobile':
        return {
          width: '375px',
          height: '812px', // iPhone X/11/12/13
          scale: 0.8
        };
      case 'tablet':
        return {
          width: '768px',
          height: '1024px', // iPad
          scale: 0.7
        };
      case 'desktop':
        return {
          width: '100%',
          height: '100%',
          scale: 1
        };
    }
  };

  const styles = getDeviceStyles();

  if (device === 'desktop') {
    return <div className="w-full h-full">{children}</div>;
  }

  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-100 p-8">
      <div 
        className="relative mx-auto transition-all duration-300"
        style={{
          transform: `scale(${styles.scale})`,
          transformOrigin: 'center center'
        }}
      >
        {showFrame && (
          <>
            {/* Device Frame */}
            <div 
              className={`
                absolute inset-0 rounded-[2.5rem] bg-gray-900
                ${device === 'mobile' ? 'p-3' : 'p-6'}
              `}
              style={{
                width: styles.width,
                height: styles.height,
              }}
            >
              {/* Screen */}
              <div className="relative w-full h-full bg-white rounded-[2rem] overflow-hidden">
                {/* Status Bar */}
                {device === 'mobile' && (
                  <div className="absolute top-0 left-0 right-0 h-11 bg-white z-10 flex items-center justify-between px-6">
                    <span className="text-xs font-medium">9:41</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-3 border border-gray-900 rounded-sm">
                        <div className="w-full h-full bg-gray-900 rounded-sm scale-x-75 origin-left"></div>
                      </div>
                      <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                      <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                    </div>
                  </div>
                )}
                
                {/* Content */}
                <div 
                  className={`
                    w-full h-full overflow-auto
                    ${device === 'mobile' ? 'pt-11' : ''}
                  `}
                >
                  {children}
                </div>
              </div>
              
              {/* Home Indicator (iPhone) */}
              {device === 'mobile' && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full opacity-50"></div>
              )}
            </div>
          </>
        )}
        
        {!showFrame && (
          <div 
            className="bg-white shadow-2xl overflow-hidden"
            style={{
              width: styles.width,
              height: styles.height,
              borderRadius: device === 'mobile' ? '2rem' : '1rem'
            }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}