import React, { useEffect, useState } from "react";
import {
  Box,
  ColorModeScript,
  useColorMode,
  useChakra,
  Heading,
  Text,
  Flex,
  Switch,
  Container,
  theme,
  VStack,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import nookies from "nookies";
import { MainLayout } from "../modules/layout/MainLayout";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { ChevronDownIcon } from "@chakra-ui/icons";

const SettingsPage: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <MainLayout>
      <Container p={5} maxW={"container.lg"} height={["max", "container.md"]}>
        <Box
          borderRadius={8}
          backgroundColor={
            colorMode == "dark"
              ? theme.colors.whiteAlpha[500]
              : theme.colors.purple[200]
          }
          color={theme.colors.whiteAlpha[800]}
          px={5}
          py={10}
          boxShadow="xl"
          width="100%"
          height="100%"
        >
          <Heading mb={3} as="h1" size="lg">
            Settings
          </Heading>
          <VStack width="100%" alignItems="flex-start">
            <>
              <Heading as="h3" size="md">
                Dark Mode
              </Heading>
              <Switch
                colorScheme="purple"
                isChecked={colorMode == "dark" ? true : false}
                onChange={toggleColorMode}
              />
            </>
            <>
              <Heading as="h3" size="md">
                Font Size
              </Heading>
              <Switch colorScheme="purple" />
            </>
            <>
              <Heading as="h3" size="md">
                Language
              </Heading>
              <Menu colorScheme="purple">
                <MenuButton
                  as={Button}
                  backgroundColor={
                    colorMode == "dark"
                      ? theme.colors.blackAlpha[400]
                      : theme.colors.purple[400]
                  }
                  sx={{
                    _hover: {
                      backgroundColor:
                        colorMode == "dark"
                          ? theme.colors.blackAlpha[600]
                          : theme.colors.purple[600],
                    },
                    _active: {
                      backgroundColor:
                        colorMode == "dark"
                          ? theme.colors.blackAlpha[600]
                          : theme.colors.purple[600],
                    },
                  }}
                  rightIcon={<ChevronDownIcon />}
                >
                  Select a Language
                </MenuButton>
                <MenuList
                  backgroundColor={
                    colorMode == "dark"
                      ? theme.colors.blackAlpha[400]
                      : theme.colors.purple[400]
                  }
                  border="none"
                >
                  <MenuItem
                    sx={{
                      _hover: {
                        backgroundColor:
                          colorMode == "dark"
                            ? theme.colors.blackAlpha[600]
                            : theme.colors.purple[600],
                      },
                      _focus: {
                        backgroundColor:
                          colorMode == "dark"
                            ? theme.colors.blackAlpha[600]
                            : theme.colors.purple[600],
                      },
                    }}
                  >
                    English
                  </MenuItem>
                  <MenuItem
                    sx={{
                      _hover: {
                        backgroundColor:
                          colorMode == "dark"
                            ? theme.colors.blackAlpha[600]
                            : theme.colors.purple[600],
                      },
                      _focus: {
                        backgroundColor:
                          colorMode == "dark"
                            ? theme.colors.blackAlpha[600]
                            : theme.colors.purple[600],
                      },
                    }}
                  >
                    Spanish
                  </MenuItem>
                  <MenuItem
                    sx={{
                      _hover: {
                        backgroundColor:
                          colorMode == "dark"
                            ? theme.colors.blackAlpha[600]
                            : theme.colors.purple[600],
                      },
                      _focus: {
                        backgroundColor:
                          colorMode == "dark"
                            ? theme.colors.blackAlpha[600]
                            : theme.colors.purple[600],
                      },
                    }}
                  >
                    French
                  </MenuItem>
                </MenuList>
              </Menu>
            </>
          </VStack>
        </Box>
      </Container>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const cookies = nookies.get(context);
    const { token } = cookies;
    if (!token) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
        props: {
          token: null,
        },
      };
    }
    return {
      props: {
        token,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
};

export default SettingsPage;
