import React from 'react'
import { Text } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import prisma from '../../lib/prisma'
import { validateToken } from '../../lib/auth'
import GradientLayout from '../../components/gradientLayout'

const getBGColor = (id: number) => {
  const colors = [
    'red',
    'green',
    'blue',
    'orange',
    'purple',
    'gray',
    'teal',
    'yellow',
  ]
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}

const Playlist = ({ playlist }) => {
  const bgColor = getBGColor(playlist.id)
  return (
    <GradientLayout
      color={bgColor}
      image={`https://picsum.photos/400?random=${playlist.id}`}
      subtitle="PLAYLIST"
      title={playlist.name}
      description={`${playlist.songs.length} songs - A daily selection`}
      roundImage={false}
    >
      <Text>test</Text>
    </GradientLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  let user
  try {
    user = validateToken(req.cookies.TRAX_ACCESS_TOKEN)
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    }
  }
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  })

  return {
    props: { playlist },
  }
}

export default Playlist
