import Footer from './partials/footer';
import { NavigationBar } from './partials/NavigationBar';

export default function Home() {
  return (
    <div>
      <NavigationBar />
      <div className="container mx-auto flex justify-center"></div>
      <Footer />
    </div>
  );
}
