import {
  Box,
  Button,
  Flex,
  HStack,
  useDisclosure,
  VisuallyHidden,
  Container,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'
import { Logo } from './Logo'
import Link from '../../components/Link'
import { NavMenu } from './NavMenu'
import { Submenu } from './Submenu'
import { ToggleButton } from './ToggleButton'
import appConfig from '../../configs/appConfig'
import { PopupButton } from '@typeform/embed-react'

const MobileNavContext = (props) => {
  const { isOpen, onToggle } = useDisclosure()
  const { page } = props
  const { button1, button2, button1a } = page.header
  const { links } = page

  return (
    <>
      <Flex align="center" justify="space-between" className="nav-content__mobile" {...props}>
        <Link as="a" href="/" rel="home">
          <Logo iconColor="white" />
        </Link>
        <Box
          visibility={{
            base: 'hidden',
            sm: 'visible',
          }}
        >
        </Box>
        <Box>
          <ToggleButton isOpen={isOpen} onClick={onToggle} />
        </Box>
      </Flex>
      <NavMenu bg="linear-gradient(180deg, #111827 0%, #1A237E 100%)" animate={isOpen ? 'open' : 'closed'}>
        {links.map((link, idx) =>
          link.children ? (
            <Submenu.Mobile key={idx} link={link} />
          ) : (
            <Link type="link-mobile" mb={4} key={idx} href={link.href} dangerouslySetInnerHTML={{ __html: link.label }}>

            </Link>
          ),
        )}
        {button1a && (button1a.typeFormId ?
          <PopupButton id={button1a.typeFormId}><Link as="a" w="full" type="button" href={button1a.link} colorScheme="brand" mt="5">
            {button1a.name}
          </Link></PopupButton> : <Link as="a" w="full" type="button" href={button1a.link} colorScheme="brand" mt="5">
            {button1a.name}
          </Link>)
        }
        {button1 && (button1.typeFormId ?
          <PopupButton id={button1.typeFormId}><Link as="a" w="full" type="button" href={button1.link} colorScheme="brand" mt="5">
            {button1.name}
          </Link></PopupButton> : <Link as="a" w="full" type="button" href={button1.link} colorScheme="brand" mt="5">
            {button1.name}
          </Link>)
        }
        {button2 && (button2.typeFormId ?
          <PopupButton id={button2.typeFormId}><Link as="a" type="button" href={button2.link} variant="outline-grey" w="full" mt="5">
            {button2.name}
          </Link></PopupButton> : <Link as="a" type="button" href={button2.link} variant="outline-grey" w="full" mt="5">
            {button2.name}
          </Link>)
        }
      </NavMenu>
    </>
  )
}

const DesktopNavContent = (props) => {
  const { page } = props
  const { button1, button2, button1a } = page.header
  const { links } = page

  return (
    <Flex className="nav-content__desktop" align="center" justify="space-between" {...props}>
      <Link as="a" href="/" rel="home">
        <VisuallyHidden>Envelope</VisuallyHidden>
        <Logo iconColor="white" />
      </Link>
      <HStack spacing="8" minW="240px" justify="space-between">
        <HStack mr={10} as="ul" id="nav__primary-menu" aria-label="Main Menu" listStyleType="none">
          {links.map((link, idx) => (
            <Box as="li" key={idx} id={`nav__menuitem-${idx}`}>
              {link.children ? (
                <Submenu.Desktop link={link} />
              ) : (
                <Link type="link-desktop" href={link.href} dangerouslySetInnerHTML={{ __html: link.label }}></Link>
              )}
            </Box>
          ))}
        </HStack>
        {button1a && (button1a.typeFormId ?
          <PopupButton id={button1a.typeFormId}><Link as="a" type="button" href={button1a.link} colorScheme="brand">
            {button1a.name}
          </Link></PopupButton> : <Link as="a" type="button" href={button1a.link} colorScheme="brand">
            {button1a.name}
          </Link>)
        }
        {button1 && (button1.typeFormId ?
          <PopupButton id={button1.typeFormId}><Link as="a" type="button" href={button1.link} colorScheme="brand">
            {button1.name}
          </Link></PopupButton> : <Link as="a" type="button" href={button1.link} colorScheme="brand">
            {button1.name}
          </Link>)
        }
        {button2 && (button2.typeFormId ?
          <PopupButton id={button2.typeFormId}><Link as="a" type="button" href={button2.link} variant="outline-grey">
            {button2.name}
          </Link></PopupButton> : <Link as="a" type="button" href={button2.link} variant="outline-grey">
            {button2.name}
          </Link>)
        }
      </HStack>
    </Flex>
  )
}

export const NavContent = {
  Mobile: MobileNavContext,
  Desktop: DesktopNavContent,
}
