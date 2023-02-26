import { Box, Flex, Text } from '@chakra-ui/react'
import { Artist } from '@prisma/client'
import { GetServerSideProps } from 'next'
import NextImage from 'next/image'
import GradientLayout from '../components/gradientLayout'
import { useMe } from '../lib/hooks'
import prisma from '../lib/prisma'

const Home = ({ artists }) => {
  const { user } = useMe()
  return (
    <GradientLayout
      color="green"
      image="https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=0"
      roundImage
      subtitle="profile"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistsCount} public playlist`}
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artist this month
          </Text>
          <Text fontSize="md">only visible to you</Text>
        </Box>
        <Flex color="white">
          {artists.map((artist: Artist) => (
            <Box paddingX="3" key={artist.name}>
              <Box bg="gray.900" borderRadius="md" padding="4">
                <NextImage
                  src="https://placekitten.com/300/300"
                  alt={artist.name}
                  width={300}
                  height={300}
                  objectFit="cover"
                  style={{ overflow: 'hidden', borderRadius: '50%' }}
                />
                <Box marginTop="3">
                  <Text fontWeight="semibold" fontSize="sm">
                    {artist.name}
                  </Text>
                  <Text as="sub">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})
  return {
    props: { artists },
  }
}

export default Home
