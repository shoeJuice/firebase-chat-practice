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
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        zIndex: 0,
      }}
      animate={{
        backgroundPositionY: "-2000%",
        transition: { duration: 100, ease: "linear", loop: Infinity },
      }}
      className={styles.fullPage}
    >
      <motion.div
        style={{
          position: "relative",
          backgroundColor: "white",
          zIndex: 2,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          color: theme.colorScheme == "light" ? "black" : "white",
        }}
        className={styles.panel}
      >
        <Grid columns={24}>
          <Grid.Col span={24} p={40}>
            <Button mb={10} color='grape' onClick={() => router.push('/')}>Back</Button>
            <Title mb={20}>Register</Title>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. 
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
    </motion.div>
  );
}

export default Register;
