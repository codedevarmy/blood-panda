import { Button } from "~/components/ui/button"

import { IconLogout } from "@tabler/icons-react"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { signOut } from "~/lib/auth-client"
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar"

type UserButtonProps = {
  user: {
    id: string
    createdAt: Date
    updatedAt: Date
    email: string
    emailVerified: boolean
    name: string
    image?: string | null | undefined
  } & {
    role: string
  } & {}
}

export default function UserButton({ user }: UserButtonProps) {
  const navigate = useNavigate()

  function handleSignOut() {
    toast.promise(signOut(), {
      loading: "Signing out...",
      success: ({ data }) => {
        if (data?.success) {
          setTimeout(() => {
            navigate("/", {
              viewTransition: true,
              replace: true,
              state: { from: window.location.pathname },
            })
          }, 1200)
        }
        return "Signed out successfully"
      },
      error: (err) => {
        return err.message || "Error signing out"
      },
    })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={"icon-sm"} className={"mt-1"}>
          <Avatar>
            <AvatarImage
              // src="https://github.com/shadcn.png"
              src={user.image!}
              alt={user.name}
            />
            <AvatarFallback>CN</AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link to="/profile" viewTransition>
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/cart" viewTransition>
              My Cart
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/booking" viewTransition>
              Booking
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Button className={"w-full"} onClick={handleSignOut}>
              Log out
              <IconLogout className={"size-4"} />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
