import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const PlayerBar = () => {
  return (
    <Box height="100px" width="100vw" bg="gray.900">
      <Flex align="center">
        <Box padding="6" color="white">
          <Text fontSize="large">Song Name</Text>
          <Text fontSize="sm">Artist Name</Text>
        </Box>
        <Box width="40%">controls</Box>
      </Flex>
    </Box>
  )
}

export default PlayerBar
