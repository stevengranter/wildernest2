import { useState } from "react"
import { Link } from "react-router-dom"

import { Divider, Stack, Title } from "@mantine/core"

import { publicLinks, adminLinks } from "./NavbarLinks.js"
import classes from "./NavbarSimple.module.css"

type NavBarParams = {
  onClick?: () => void
}

export function NavbarSimple({ onClick }: NavBarParams) {
  const [active, setActive] = useState("")

  function handleClick(label: string) {
    if (!onClick) return
    setActive(label)
    setTimeout(onClick, 500)
  }

  const links = publicLinks.map((item) => (
    <Link
      data-active={item.label === active || undefined}
      onClick={() => handleClick(item.label)}
      className={classes.link}
      key={item.label}
      to={item.to}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ))

  const otherLinks = adminLinks.map((item) => (
    <Link
      data-active={item.label === active || undefined}
      onClick={() => handleClick(item.label)}
      className={classes.link}
      key={item.label}
      to={item.to}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ))

  return (
    <>
      <nav className={classes.navbar}>
        <Stack h="100%" justify="space-between" align="left">
          <div>{links}</div>
          <Divider my="md" />
          <div className={classes.admin_links}>
            <Title order={5} pl="md">
              Admin
            </Title>
            {otherLinks}
          </div>
        </Stack>
      </nav>
    </>
  )
}
