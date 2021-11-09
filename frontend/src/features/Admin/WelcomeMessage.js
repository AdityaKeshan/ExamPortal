import { useSelector } from "react-redux";
import List from "../utilities/List/LinkedList";

const WelcomeMessage = () => {
  const admin = useSelector((store) => store.loginAdmin.admin);
  const items = ["Register Course", "View Your Courses"];
  const links = ["#", "#"];
  return (
    <div className="w-3/5 blue-component border-4 space-y-4">
      <h1 className="header-1">Welcome, {admin.name}! </h1>
      <p className="text-xl pl-4">You can :</p>
      <List items={items} links={links} />
    </div>
  );
};

export default WelcomeMessage;
