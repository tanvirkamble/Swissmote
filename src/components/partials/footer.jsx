export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-gray-300 py-2">
      <div className="container mx-auto text-center">
        <p className="mb-2">
          &copy; {new Date().getFullYear()} Tanvir Kamble. All rights reserved.
          <a
            href="https://github.com/tanvirkamble"
            className="text-blue-400 hover:text-blue-600"
            target="_blank"
            rel="noopener noreferrer">
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
}
