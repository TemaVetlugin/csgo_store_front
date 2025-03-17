import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const AvatarLabel = ({
  className = "",
  user = { name: "", email: "", className: "" },
  avatar = {
    fallback: "",
    src: "",
  },
}) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatar?.src} alt="User's avatar images" />
        <AvatarFallback className="text-body bg-[#E24E4E] bg-opacity-20 text-[#E24E4E]">
          {avatar.fallback}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-center">
        <p className="text-body text-left !leading-4">{user.name}</p>
        <p
          className={cn(
            "!text-tiny !leading-4 text-secondary-700",
            user.className
          )}
        >
          {user.email}
        </p>
      </div>
    </div>
  );
};
