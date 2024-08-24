import Footer from './partials/footer';
import { NavigationBar } from './partials/NavigationBar';

export default function Home() {
  return (
    <div className="bg-gray-100 h-screen">
      <NavigationBar />
      <div className="w-auto px-8 py-12 flex flex-col items-center justify-center">
        <div className="max-w-3xl w-full px-8 py-6 bg-white shadow-lg rounded-lg">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
              Welcome to WalletInsight
            </h1>
            <p className="text-lg text-gray-700 mb-4">
              WalletInsight is your gateway to the world of cryptocurrency. Our
              platform offers seamless integration with MetaMask, allowing you
              to monitor your digital assets with ease. Whether you're keeping
              track of your wallet balance or staying updated on the latest
              Ethereum news, WalletInsight is designed to provide you with a
              streamlined and secure experience.
            </p>
            <p className="text-lg text-gray-700">
              Explore the future of finance with WalletInsight, where your
              cryptocurrency insights are just a click away.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
