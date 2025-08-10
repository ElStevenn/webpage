import './globals.css';
import '@/styles/background.css';

export const metadata = {
  title: 'Pau Mateu',
  description: 'Portfolio – DevOps & Backend'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0D1117] text-[#C9D1D9] antialiased relative">
        {/* subtle base background & grain */}
        <div className="bg-base-gradient" />
        <div className="bg-grain" />
        {children}
      </body>
    </html>
  );
} 