import {
  Center,
  Container,
  Grid,
  Group,
  Input,
  TextInput,
  Stack,
  Button,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { motion } from "framer-motion";
import styles from "../styles/Register.module.css";
import React from "react";
import { MotionConfig } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";

function Register() {
  const theme = useMantineTheme();
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, backgroundColor: "white" }}
      animate={{ opacity: 1, transition: { duration: 2 } }}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        backgroundColor: "white",
        zIndex: 0,
      }}
      className={styles.fullPage}
    >
      <motion.div
        animate={{
          backgroundPositionY: "-100px",
          transition: {
            duration: 10,
            ease: "linear",
            repeat: Infinity,
          },
        }}
        exit={{opacity: 0}}
        className={styles.chevron}
      ></motion.div>
      <motion.div
        initial={{x: "-100vw"}}
        animate={{x: 0, transition: {duration: 1.5, ease: "easeInOut", delay: 1}}}
        exit={{x: "-100vw", transition: {duration: 1.5, ease: "easeInOut"}}}
        style={{
          position: "relative",
          backgroundColor: "white",
          borderRadius: " 0 3rem 3rem 0",
          zIndex: 2,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          color: theme.colorScheme == "light" ? "black" : "white",
        }}
        className={styles.panel}
      >
        <Grid columns={24}>
          <Grid.Col span={20} p={40}>
            <Button mb={10} color='grape' onClick={() => router.push('/')}>Back</Button>
            <Title mb={20}>Register</Title>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Voluptates
              tempora ab maxime, quisquam dolores amet hic ipsa officiis. Nulla
              laborum aliquam nemo, sed dolore cum inventore dicta natus
              repudiandae quidem!
            </Text>
            <Stack my={20}>
              <Group grow>
                <TextInput placeholder="First Name" label="First Name" />
                <TextInput placeholder="Last Name" label="Last Name" />
              </Group>
              <TextInput placeholder="E-mail Address" label="E-mail Address" />
              <TextInput placeholder="Password" label="Password" />
              <TextInput placeholder="Verify Password" label="Verify Password" />
            </Stack>
            <Button color="grape" size="md">Register</Button>
          </Grid.Col>
        </Grid>
      </motion.div>

      <Container>
        <Group>
          <Stack>
            <Text>Register</Text>
            <Text>Register</Text>
          </Stack>
        </Group>
      </Container>
    </motion.div>
  );
}

export default Register;
