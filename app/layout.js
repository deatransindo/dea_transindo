// app/layout.js
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollArrows from '@/components/ScrollArrows';
import WhatsAppChat from '@/components/WhatsAppChat';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'Deatransindo - Global Freight Forwarding Solutions',
  description: 'Professional freight forwarding and logistics services',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={poppins.variable}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ScrollArrows />
        <WhatsAppChat />
      </body>
    </html>
  );
}
