import { Navbar } from 'flowbite-react';
import OffCanvasSidebar from './OffCanvasSidebar';
import { Link } from 'react-router-dom';

export function NavigationBar() {
  return (
    <Navbar className="border my-1">
      <Navbar.Brand as={Link} to="/">
        <img
          src="/metamask-svgrepo-com.svg"
          alt="MetaMask"
          className="w-6 h-6"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          WalletInsight
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <OffCanvasSidebar />
      </div>
    </Navbar>
  );
}
