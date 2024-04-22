import './global.css';
import { UiLayout } from '@/components/ui/ui-layout';
import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { ReactQueryProvider } from './react-query-provider';

export const metadata = {
  title: 'bark-dapp',
  description: 'Powered by Solana',
};

const links: { label: string; path: string }[] = [
  { label: 'Home', path: '/dashboard' },
  { label: 'About', path: '/about' },
  { label: 'Features', path: '/features' },
  { label: 'Account', path: '/account' },
  { label: 'Tokenomics', path: '/tokenomics' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Clusters', path: '/clusters' },
  { label: 'Program', path: '/app-1713693601' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
              <UiLayout links={links}>{children}</UiLayout>
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
