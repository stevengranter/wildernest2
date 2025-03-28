import {
  IconCards,
  IconHome,
  IconSearch,
  IconUsersGroup,
} from "@tabler/icons-react"

export const publicLinks = [
  { icon: IconHome, label: "Home", to: "/" },

  { icon: IconCards, label: "Collections", to: "/collections" },
  { icon: IconSearch, label: "Search", to: "/search" },
]

export const adminLinks = [
  { icon: IconUsersGroup, label: "Users", to: "/users" },
]
