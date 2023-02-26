import React from 'react'
import {
  Box,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { MdPlayArrow, MdAvTimer } from 'react-icons/md'
import { formatDate, formatTime } from '../lib/formatters'

const SongsTable = ({ songs }) => {
  return (
    <Box bg="transparent">
      <Box padding="3" marginBottom="6">
        <IconButton
          icon={<MdPlayArrow fontSize="lg" />}
          fontSize="md"
          aria-label="play-button"
          colorScheme="green"
          isRound
        />
        <Table variant="unstyled" color="white">
          <Thead
            borderBottom="1px solid"
            borderColor="rgba(255, 255, 255, 0.2)"
          >
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date Added</Th>
              <Th>
                <MdAvTimer fontSize="large" />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, idx) => (
              <Tr
                sx={{
                  transision: 'all .3s',
                  '&:hover': {
                    bg: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
                key={song.id}
                cursor="cursor"
              >
                <Td>{idx + 1}</Td>
                <Td>{song.name}</Td>
                <Td>{formatDate(song.createdAt)}</Td>
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  )
}

export default SongsTable
