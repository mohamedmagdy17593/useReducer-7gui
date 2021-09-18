import React from 'react';
import clsx from 'clsx';

type LayoutProps = React.PropsWithChildren<{
  size?: 'xs' | 'sm' | 'md' | 'lg';
}>;

function Layout({ children, size = 'md' }: LayoutProps) {
  return (
    <div className="min-h-screen bg-yellow-400 flex justify-center items-center">
      <div
        className={clsx(
          'w-full m-4 p-4 bg-white border-2 border-gray-900 rounded-md',
          {
            'max-w-xs': size === 'xs',
            'max-w-sm': size === 'sm',
            'max-w-md': size === 'md',
            'max-w-lg': size === 'lg',
          },
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
