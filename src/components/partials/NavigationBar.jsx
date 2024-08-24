import { Navbar } from 'flowbite-react';
import OffCanvasSidebar from './OffCanvasSidebar';

export function NavigationBar() {
  return (
    <Navbar className="border my-1">
      <Navbar.Brand>
        <div className="flex items-center space-x-2">
          <img
            src="/metamask-svgrepo-com.svg"
            alt="MetaMask"
            className="w-6 h-6"
          />
          {/* Static SVG */}
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            WalletInsight
          </span>
        </div>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <OffCanvasSidebar />
      </div>
    </Navbar>
  );
}
