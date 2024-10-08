import { RootState } from "@/store";
import { useSelector } from "react-redux";


const AccountPage = () => {
  
  const { user } = useSelector(
    (state: RootState) => state.auth
  );


  return (
    <div>
      {user && <p>Welcome, {user.name}!</p>}
    </div>
    
  )
}

export default AccountPage
