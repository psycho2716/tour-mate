"use client"

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    // Get the navbar height to offset the scroll position
    const navbar = document.querySelector("header")
    const navbarHeight = navbar ? navbar.clientHeight : 0

    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    })
  }
}

