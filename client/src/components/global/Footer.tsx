import { Button } from '@mui/material';

function Footer() {
  return (
    <footer className="bg-gray-900 py-20 mt-12">
      <div className="w-full mx-auto px-4 sm:px-6  lg:px-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="sm:col-span-1 col-span-3">
            <h3 className="text-white font-bold text-xl mb-4">About Us</h3>
            <p className="text-gray-400 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo euismod dolor, vel ultrices erat. Praesent vel lectus commodo, bibendum risus sit amet, tempus elit.</p>
            <p className="text-gray-400">© 2023 Tailwind CSS</p>
          </div>
          <div className="sm:col-span-1 col-span-3">
            <h3 className="text-white font-bold text-xl mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-4">123 Main St.<br />New York, NY 10001<br />555-555-5555</p>
            <div className="flex">
              <a href="#" className="text-gray-400 hover:text-white mr-4"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
          <div className="sm:col-span-1 col-span-3">
            <h3 className="text-white font-bold text-xl mb-4">Subscribe</h3>
            <form>
              <div className="flex items-center mb-4">
                <input type="email" className="bg-gray-800 border border-gray-700 rounded-lg py-2 px-3 text-gray-400 w-full" placeholder="Enter your email" />
                <Button variant="outlined" sx={{ color:'white',borderColor: 'white', borderWidth: 2,marginLeft:3,paddingLeft:4,paddingRight:4}}>Subscribe</Button>
              </div>
              <p className="text-gray-400">Get the latest news straight to your inbox.</p>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
