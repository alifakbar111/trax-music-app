import NextImage from 'next/image'
import NextLink from 'next/link'

import {
  Box,
  Divider,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem,
  Skeleton,
  Stack,
} from '@chakra-ui/react'
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from 'react-icons/md'
import { Playlist } from '@prisma/client'
import { Menu } from '../types/sidebar'
import { usePlaylist } from '../lib/hooks'

const navMenu: Menu[] = [
  {
    name: 'Home',
    icon: MdHome,
    route: '/',
  },
  {
    name: 'Search',
    icon: MdSearch,
    route: '/search',
  },
  {
    name: 'Your Library',
    icon: MdLibraryMusic,
    route: '/library',
  },
]

const musicMenu: Menu[] = [
  {
    name: 'Create Playlist',
    icon: MdPlaylistAdd,
    route: '/library',
  },
  {
    name: 'Favorites',
    icon: MdFavorite,
    route: '/favourite',
  },
]

const Sidebar = () => {
  const { playlists, isLoading } = usePlaylist()

  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <NextImage src="/logo.svg" height={60} width={120} />
        </Box>
        <Box marginBottom="20px">
          <List spacing={2}>
            {navMenu.map((menu: Menu) => (
              <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
                <LinkBox>
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={menu.icon}
                        color="white"
                        marginRight="20px"
                      />
                      {menu.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box marginY="20px">
          <List spacing={2}>
            {musicMenu.map((menu: Menu) => (
              <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
                <LinkBox>
                  <NextLink href={menu.route} passHref>
                    <LinkOverlay>
                      <ListIcon
                        as={menu.icon}
                        color="white"
                        marginRight="20px"
                      />
                      {menu.name}
                    </LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider color="gray.800" />
        <Box height="66%" overflowY="auto" paddingY="20px">
          <List spacing={2}>
            {isLoading ? (
              <Stack>
                <Skeleton height="20px" bg="gray.800" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
              </Stack>
            ) : (
              <Stack>
                {playlists.map((playlist: Playlist) => (
                  <ListItem paddingX="20px" key={playlist.id}>
                    <LinkBox>
                      <NextLink
                        href={{
                          pathname: '/playlist/[id]',
                          query: { id: playlist.id },
                        }}
                        passHref
                      >
                        <LinkOverlay>{playlist.name}</LinkOverlay>
                      </NextLink>
                    </LinkBox>
                  </ListItem>
                ))}
              </Stack>
            )}
          </List>
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar
