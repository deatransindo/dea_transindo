// app/layout.js
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollArrows from '@/components/ScrollArrows';
import WhatsAppChat from '@/components/WhatsAppChat';

export const metadata = {
  title: 'Deatransindo - Global Freight Forwarding Solutions',
  description: 'Professional freight forwarding and logistics services',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
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
