import ReactHowler from 'react-howler'
import { useStoreActions } from 'easy-peasy'

import React, { useEffect, useRef, useState } from 'react'
import {
  Box,
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react'
import {
  MdShuffle,
  MdSkipPrevious,
  MdPlayCircleFilled,
  MdPauseCircleFilled,
  MdSkipNext,
  MdOutlineRepeat,
} from 'react-icons/md'
import { formatTime } from '../lib/formatters'

const Player = ({ songs, activeSong }) => {
  const [playing, setPlaying] = useState<boolean>(true)
  const [index, setIndex] = useState<number>(
    songs.findIndex((s: { id: number }) => s.id === activeSong.id)
  )
  const [seek, setSeek] = useState<number>(0.0)
  const [isSeeking, setIsSeeking] = useState<boolean>(false)
  const [repeat, setRepeat] = useState<boolean>(false)
  const [shuffle, setShuffle] = useState<boolean>(false)
  const [duration, setDuration] = useState<number>(0.0)
  const soundRef = useRef(null)
  const repeatRef = useRef(null)

  const setActiveSong = useStoreActions((state: any) => state.changeActiveSong)

  useEffect(() => {
    let timerId

    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current.seek())
        timerId = requestAnimationFrame(f)
      }
      timerId = requestAnimationFrame(f)
      return () => cancelAnimationFrame(timerId)
    }
    cancelAnimationFrame(timerId)
  }, [playing, isSeeking])

  useEffect(() => {
    setActiveSong(songs[index])
  }, [index, setActiveSong, songs])

  useEffect(() => {
    repeatRef.current = repeat
  }, [repeat])

  const setPlayState = (value: boolean) => {
    setPlaying(value)
  }

  const onShuffle = () => {
    setShuffle((state) => !state)
  }

  const onRepeat = () => {
    setRepeat((state) => !state)
  }

  const nextSong = () => {
    setIndex((state) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length)
        if (next === state) {
          nextSong()
        }
      } else {
        return state === songs.length - 1 ? 0 : state + 1
      }
    })
  }

  const prevSong = () => {
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1
    })
  }

  const onEnd = () => {
    if (repeatRef.current) {
      setSeek(0)
      soundRef.current.seek(0)
    } else {
      nextSong()
    }
  }

  const onLoad = () => {
    const songDuration = soundRef.current.duration()
    setDuration(songDuration)
  }

  const onSeek = (e) => {
    setSeek(parseFloat(e[0]))
    soundRef.current.seek(e[0])
  }

  return (
    <Box>
      <Box>
        <ReactHowler
          src={activeSong?.url}
          playing={playing}
          ref={soundRef}
          onLoad={onLoad}
          onEnd={onEnd}
        />
      </Box>
      <Center>
        <ButtonGroup>
          <IconButton
            outline="none"
            variant="link"
            aria-label="shuffle"
            fontSize="xl"
            color={shuffle ? 'white' : 'gray.600'}
            icon={<MdShuffle />}
            onClick={onShuffle}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="skip"
            fontSize="xl"
            icon={<MdSkipPrevious />}
            onClick={prevSong}
          />
          {playing ? (
            <IconButton
              outline="none"
              variant="link"
              aria-label="pause"
              fontSize="4xl"
              icon={<MdPauseCircleFilled />}
              onClick={() => setPlayState(false)}
            />
          ) : (
            <IconButton
              outline="none"
              variant="link"
              aria-label="play"
              fontSize="4xl"
              icon={<MdPlayCircleFilled />}
              onClick={() => setPlayState(true)}
            />
          )}
          <IconButton
            outline="none"
            variant="link"
            aria-label="next"
            fontSize="xl"
            icon={<MdSkipNext />}
            onClick={nextSong}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="repeat"
            fontSize="xl"
            color={repeat ? 'white' : 'gray.600'}
            icon={<MdOutlineRepeat />}
            onClick={onRepeat}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600" paddingTop="2">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="sm">{formatTime(seek)}</Text>
          </Box>
          <Box width="80%">
            <Slider
              id="player-range"
              aria-label={['min', 'max'] as unknown as string}
              min={0}
              step={0.1}
              colorScheme="gray"
              max={duration ? (duration.toFixed(2) as unknown as number) : 0}
              onChange={onSeek}
              value={[seek] as unknown as number}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <SliderTrack bg="gray.800">
                <SliderFilledTrack bg="gray.600" />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="sm">{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Player
