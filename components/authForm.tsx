import { Box, Button, Flex, Input, Stack, Text, Link } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import NextImage from 'next/image'
import { auth } from '../lib/mutation'

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    await auth(mode, { email, password })
    setIsLoading(false)
    router.push('/')
  }

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="white 1px solid"
        aria-label="logo"
      >
        <NextImage src="/logo.svg" height={60} width={120} />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="md">
          <form onSubmit={handleSubmit}>
            <Stack spacing={8}>
              <Input
                placeholder="email"
                aria-label="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="password"
                aria-label="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                bg="green.500"
                isLoading={isLoading}
                _hover={{ bg: 'green.300' }}
              >
                {mode}
              </Button>
              {mode === 'signin' ? (
                <Text>
                  Dont have an account ?{' '}
                  <Link color="teal.500" href="/signup">
                    lets signup
                  </Link>
                </Text>
              ) : (
                <Text>
                  Have an account ?{' '}
                  <Link color="teal.500" href="/signin">
                    lets signin
                  </Link>
                </Text>
              )}
            </Stack>
          </form>
        </Box>
      </Flex>
    </Box>
  )
}

export default AuthForm
