import React from 'react'
import { Header, Title, MediaQuery, Burger } from '@mantine/core'

const Head = ({opened, onBurgerClick} : any) => {
  return (
    <Header height={80} p='xs'>
        <Title order={3}>Firestore Chat App</Title>
        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={onBurgerClick}
                size="sm"
                mr="xl"
              />
        </MediaQuery>
    </Header>
  )
}

export default Head