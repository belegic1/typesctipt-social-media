import { communityState } from '@/atoms/CommunitiesAtom'
import { DirectoryMenuItem, directoryMenuState } from '@/atoms/directoryMenuAtom'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaReddit } from 'react-icons/fa'
import { useRecoilState, useRecoilValue } from 'recoil'

const useDirectory = () => {
  const router = useRouter()
  const [directoryState, setDirectoryState] = useRecoilState(directoryMenuState)
  const communityStateValue = useRecoilValue(communityState)


  const toggleMenuOPen = () => {
    setDirectoryState(prev => ({...prev, isOpen: !prev.isOpen}))
  }

  const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState(prev => ({ ...prev, selectedMenuItem: menuItem }))
    router.push(menuItem.link)
    toggleMenuOPen()
  }

  useEffect(() => {
    const { currentCommunity } = communityStateValue;
    if (currentCommunity) {
      setDirectoryState(prev => ({
        ...prev,
        selectedMenuItem: {
          displayText: `r/${currentCommunity.id}`,
          link: `/r/${currentCommunity.id}`,
          imageURL: currentCommunity.imageURL,
          icon: FaReddit,
          iconColor: 'blue.500'
        }
      }))
    }
  }, [communityStateValue.currentCommunity])
  return {
    directoryState,
    toggleMenuOPen,
    onSelectMenuItem
  }
}

export default useDirectory