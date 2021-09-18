import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

type LayoutProps = React.PropsWithChildren<{
  size?: 'xs' | 'sm' | 'md' | 'lg';
  noBack?: boolean;
}>;

function Layout({ children, size = 'md', noBack = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-yellow-400 flex justify-center items-center">
      <div className="flex flex-col m-4">
        {!noBack && (
          <div className="mb-2">
            <Link href="/">
              <a>
                <span>&#8592;</span> Back
              </a>
            </Link>
          </div>
        )}

        {/* Card */}
        <div
          className={clsx(
            'w-full  p-4 bg-white border-2 border-gray-900 rounded-md',
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

        {/* for balancing */}
        {!noBack && <div className="mb-2 h-6"></div>}
      </div>
    </div>
  );
}

export default Layout;
