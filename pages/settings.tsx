import React from "react";
import {
  Box,
  useColorMode,
  Heading,
  Switch,
  Container,
  theme,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
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
          width="40%"
          margin="auto"
          
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
