import { Dispatch, FC, SetStateAction } from "react";
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileMenu: FC<MobileMenuProps> = ({ setIsMenuOpen }) => {
  return (
    <div className="inset-0 absolute z-20 w-screen h-screen bg-background">
      <div
        className="inset-0 bg-background/50"
        onClick={() => setIsMenuOpen(false)}
      ></div>
      <div className="top-0 right-0 flex flex-col gap-3 p-4 pt-2 w-screen h-screen">
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="icon"
            className="min-w-[40px]"
            onClick={() => setIsMenuOpen(false)}
          >
            <XIcon size={20} />
          </Button>
        </div>
        <div className="flex flex-col gap-3 w-full flex-grow">
          <Link
            to={"/"}
            onClick={() => setIsMenuOpen(false)}
            className="group inline-flex h-10 items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
          >
            link
          </Link>
        </div>
      </div>
    </div>
  );
};

export { MobileMenu };
