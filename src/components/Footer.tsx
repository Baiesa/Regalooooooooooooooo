

const Footer = () => {
  return (
<footer className="bg-[#2E4823] text-white py-10">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 px-6">
    {/* Company Information */}
    <div>
      <h4 className="font-bold mb-4">Company Information</h4>
      <ul className="space-y-2">
        <li><a href="#" className="hover:underline">About Us</a></li>
        <li><a href="#" className="hover:underline">Careers</a></li>
        <li><a href="#" className="hover:underline">Corporate Gifting</a></li>
      </ul>
    </div>

    {/* Customer Support */}
    <div>
      <h4 className="font-bold mb-4">Customer Support</h4>
      <ul className="space-y-2">
        <li><a href="#" className="hover:underline">Contact Us</a></li>
        <li><a href="#" className="hover:underline">Help Center</a></li>
      </ul>
    </div>

    {/* Legal */}
    <div>
      <h4 className="font-bold mb-4">Legal</h4>
      <ul className="space-y-2">
        <li><a href="#" className="hover:underline">Privacy Policy</a></li>
        <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
      </ul>
    </div>

    {/* Follow Us */}
    <div>
      <h4 className="font-bold mb-4">Follow Us</h4>
      <div className="flex space-x-4">
        <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
        <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
        <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
        <a href="#" aria-label="Pinterest"><i className="fab fa-pinterest"></i></a>
        <a href="#" aria-label="TikTok"><i className="fab fa-tiktok"></i></a>
      </div>
    </div>

    {/* Newsletter Signup */}
    <div className="max-w-sm mx-auto">
  <h4 className="font-bold mb-4 text-center text-sm">Join our newsletter for exclusive offers!</h4>
  <form className="flex">
    <input
      type="email"
      placeholder="Enter your email"
      className="rounded-l-md text-black w-full"
    />
    <button
      type="submit"
      className="bg-gray-700 text-white  rounded-r-md hover:bg-gray-600"
    >
      Sign Up
    </button>
  </form>
</div>
  </div>
</footer>
  )
}

export default Footer
