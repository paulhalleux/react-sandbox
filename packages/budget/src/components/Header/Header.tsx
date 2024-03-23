import { Avatar, Button } from "@paulhalleux/sandbox";
import { Link } from "@tanstack/react-router";

import Logo from "../../assets/logo.svg";

export function Header() {
  return (
    <header className="flex items-center justify-between h-12 bg-contrast border-b px-4">
      <Link to="/">
        <img src={Logo} alt="Budget logo" className="h-[22px] -mb-1.5" />
      </Link>
      <div className="flex items-center gap-2">
        <Link to="/settings">
          <Button>Settings</Button>
        </Link>
        <Avatar name={"John Doe"} />
      </div>
    </header>
  );
}
