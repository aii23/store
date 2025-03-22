import Footer from '@zknoid/sdk/components/widgets/Footer';
import Header from '@zknoid/sdk/components/widgets/Header';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
