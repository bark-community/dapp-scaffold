'use client'

import { WalletButton } from '../solana/solana-provider';
import * as React from 'react';
import { ReactNode, Suspense, useEffect, useRef } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AccountChecker } from '../account/account-ui';
import { ClusterChecker, ClusterUiSelect, ExplorerLink } from '../cluster/cluster-ui';
import toast, { Toaster } from 'react-hot-toast';

export function UiLayout({ children, links }: { children: ReactNode; links: { label: string; path: string }[] }) {
  const pathname = usePathname();

  return (
    <div className="h-full flex flex-col">
      <div className="navbar bg-white text-neutral-content shadow-md flex-col md:flex-row space-y-2 md:space-y-0">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl" href="/">
            <img className="h-4 md:h-6" alt="Bark Logo" src="/bark-logo.svg" />
          </Link>
          <ul className="menu menu-horizontal px-1 space-x-2">
            {links.map(({ label, path }) => (
              <li key={path}>
                <Link className={pathname.startsWith(path) ? 'active' : ''} href={path}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-none space-x-2">
          <WalletButton />
          <ClusterUiSelect />
        </div>
      </div>
      <ClusterChecker>
        <AccountChecker />
      </ClusterChecker>
      <div className="flex-grow mx-4 lg:mx-auto bg-gray-100 p-8 rounded-md">
        <Suspense
          fallback={
            <div className="text-center my-32">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          }
        >
          {children}
        </Suspense>
        <Toaster position="bottom-right" />
      </div>
      <footer className="footer footer-center p-4 bg-white text-base-content shadow-md">
        <aside>
          <p>
            © {new Date().getFullYear()} BARK Protocol. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-600"
              title="Follow us on Facebook"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.3 3H6.7C5.52 3 4.55 3.9 4.55 5v14c0 1.1.97 2 2.15 2H12l1-7h-3V9h3V7.17c0-2.48 1.85-4.55 4.22-4.91A9.76 9.76 0 0 0 17.3 3Z"
                ></path>
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-600"
              title="Follow us on Twitter"
              aria-label="Twitter"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.006c7.1 0 11-5.88 11-11a11.29 11.29 0 0 0-1.7-6.104c.988-.615 1.85-1.4 2.538-2.3-.925.57-1.937.98-3.02 1.2a4.747 4.747 0 0 0-3.218-.99c-2.825 0-5.107 2.26-5.107 5.056 0 .396.046.78.127 1.15-4.24-.222-7.993-2.35-10.502-5.575-.44.765-.69 1.65-.69 2.59 0 1.77.895 3.33 2.257 4.245-.83-.022-1.62-.254-2.305-.633v.06c0 2.478 1.768 4.548 4.106 5.018-.43.12-.882.186-1.35.186-.332 0-.655-.035-.97-.105.655 2.056 2.572 3.552 4.837 3.595-1.773 1.42-4.006 2.27-6.44 2.27-.418 0-.83-.025-1.238-.074C2.73 18.67 5.062 20 7.737 20"></path>
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-600"
              title="Follow us on GitHub"
              aria-label="GitHub"
            
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 3a9 9 0 0 0-2.85 17.529c.45.083.616-.196.616-.438 0-.216-.008-.784-.012-1.537-2.515.457-3.046-1.214-3.046-1.214-.41-1.037-1.004-1.313-1.004-1.313-.82-.562.063-.55.063-.55.905.064 1.38.928 1.38.928.804 1.375 2.11.978 2.627.748.083-.583.312-.977.567-1.202-1.986-.225-4.072-.993-4.072-4.422 0-.977.345-1.775.915-2.402-.092-.226-.39-1.136.086-2.366 0 0 .748-.24 2.45.915.71-.197 1.472-.294 2.226-.297.752.003 1.516.1 2.226.297 1.7-1.155 2.447-.915 2.447-.915.477 1.23.18 2.14.089 2.366.57.627.914 1.425.914 2.402 0 3.438-2.088 4.195-4.08 4.415.32.276.608.82.608 1.65 0 1.192-.01 2.152-.01 2.445 0 .242.164.526.622.437A9 9 0 0 0 12 3Z"
                ></path>
              </svg>
            </a>
          </div>
        </aside>
      </footer>
    </div>
  );
}

export function AppModal({
  children,
  title,
  hide,
  show,
  submit,
  submitDisabled,
  submitLabel,
}: {
  children: ReactNode;
  title: string;
  hide: () => void;
  show: boolean;
  submit?: () => void;
  submitDisabled?: boolean;
  submitLabel?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!dialogRef.current) return;
    if (show) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [show, dialogRef]);

  return (
    <dialog className="modal" ref={dialogRef}>
      <div className="modal-box space-y-5">
        <h3 className="font-bold text-lg">{title}</h3>
        {children}
        <div className="modal-action flex justify-end mt-4">
          <div className="flex items-center space-x-4">
            {submit ? (
              <button
                className="btn btn-primary py-2 px-4 rounded-md"
                onClick={submit}
                disabled={submitDisabled}
              >
                {submitLabel || 'Save'}
              </button>
            ) : null}
            <button onClick={hide} className="btn btn-secondary py-2 px-4 rounded-md">
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export function AppHero({
  children,
  title,
  subtitle,
}: {
  children?: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
}) {
  return (
    <div className="hero py-20 bg-gray-100">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          {typeof title === 'string' ? <h1 className="text-5xl font-bold">{title}</h1> : title}
          {typeof subtitle === 'string' ? <p className="py-6">{subtitle}</p> : subtitle}
          {children}
        </div>
      </div>
    </div>
  );
}

export function ellipsify(str = '', len = 4) {
  if (str.length > 30) {
    return str.substring(0, len) + '..' + str.substring(str.length - len, str.length);
  }
  return str;
}

export function useTransactionToast() {
  return (signature: string) => {
    toast.success(
      <div className={'text-center'}>
        <div className="text-lg">Transaction sent</div>
        <ExplorerLink path={`tx/${signature}`} label={'View Transaction'} className="btn btn-xs btn-primary" />
      </div>
    );
  };
}
