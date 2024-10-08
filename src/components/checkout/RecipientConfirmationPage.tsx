
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

const RecipientConfirmationPage = () => {

    const navigate = useNavigate();


  return (
<div className="confirmation-page text-center p-8 bg-[#F1FAEB]">
  <h1 className="text-[#316a21] text-[40px] font-bold font-['Quicksand']">
    Your Gift is Almost Ready!
  </h1>
  <p className="text-[#2e4823] text-lg font-normal font-['Quicksand']">
  Thanks for providing your delivery details!
  The sender will now complete the final steps to ship your gift.  </p>

  <p className="text-[#2e4823] text-xl font-normal font-['Quicksand']">
  Stay tuned – we’ll send you an email with tracking information as soon as the gift is on its way.   </p>

<p>Keep an eye on your inbox for updates!</p>
  {/* Add margin for spacing between buttons */}
  <Button
    className="mt-4 w-1/2 md:w-1/3 py-2 px-4 rounded bg-[#4ca330] text-white hover:bg-green-900 ml-4"
    onClick={() => navigate("/")}
  >
    Go Home
  </Button>
</div>
  )
}

export default RecipientConfirmationPage
