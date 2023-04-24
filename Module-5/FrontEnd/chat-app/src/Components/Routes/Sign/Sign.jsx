import React, { useRef } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sign = () => {
  const userName = useRef();
  const userEmail = useRef();
  const userPassword = useRef();
  const userAvatar = useRef();
  const userPhone = useRef();
  const navigate = useNavigate();

  // ----------------------------------------------------------------------

  const handleSubmit = async () => {
    if (
      userName.current.value === "" ||
      userEmail.current.value === "" ||
      userPassword.current.value === "" ||
      userAvatar.current.value === "" ||
      userPhone.current.value === ""
    ) {
      alert("Fill Fill All Deatails");
    } else {
      try {
        const name = userName.current.value;
        const email = userEmail.current.value;
        const password = userPassword.current.value;
        const url = userAvatar.current.value;
        const phoneNo = userPhone.current.value;
        const obj = {
          name,
          email,
          password,
          url,
          phoneNo,
        };
        let res = await axios.post("http://localhost:4000/user/signup", obj);
        console.log(res);
        if (res.status === 201) {
          alert(res.data.message);
          localStorage.setItem("url", url);
          navigate("/login");
        }
        if (res.status === 401) {
          console.log("hey");
        }
      } catch (error) {
        console.log("error:", error.message);
        alert("User Already have Account Or Network Error");
      }
    }
  };

  // ----------------------------------------------------------------------

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool App ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input ref={userName} type="text" required />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input ref={userEmail} type="email" required />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input ref={userPassword} type="password" required />
            </FormControl>
            <FormControl>
              <FormLabel>Avatar</FormLabel>
              <Input ref={userAvatar} type="text" required />
            </FormControl>
            <FormControl>
              <FormLabel>Phone No</FormLabel>
              <Input ref={userPhone} type="number" required />
            </FormControl>
            <Stack spacing={10}>
              <Button
                onClick={handleSubmit}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Sign;
