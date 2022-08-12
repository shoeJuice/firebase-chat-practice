import React from 'react'
import { Header, Title, MediaQuery, Burger, useMantineTheme } from '@mantine/core'
import { ThemeContext } from '@emotion/react'

const Head = ({opened, onBurgerClick} : any) => {

  const theme = useMantineTheme();

  return (
    <Header height={80} p='xs'>
        <Title style={{color: theme.colorScheme == "light" ? "black" : theme.colors.gray[2]}} order={3}>Firestore Chat App</Title>
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