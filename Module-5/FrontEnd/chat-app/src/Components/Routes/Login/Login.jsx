import React, { useRef } from "react";
import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  useBreakpointValue,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store/auth-slice";

export const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};

//----------------------------------------------------------------------------

const Login = () => {
  const navigate = useNavigate();
  const userName = useRef();
  const userEmail = useRef();
  const userPassword = useRef();
  const userPhoneno = useRef();

  const dispatch = useDispatch();

  const handleSign = () => {
    navigate("/sign");
  };

  const handleSubmit = async () => {
    if (
      userName.current.value === "" ||
      userEmail.current.value === "" ||
      userPassword.current.value === "" ||
      userPhoneno.current.value === ""
    ) {
      alert("Fill All Deatails");
    } else {
      try {
        const name = userName.current.value;
        const email = userEmail.current.value;
        const password = userPassword.current.value;
        const phoneNo = userPhoneno.current.value;
        let obj = {
          name,
          email,
          password,
          phoneNo,
        };
        let res = await axios.post("http://localhost:4000/user/login", obj);
        console.log(res);
        dispatch(
          authActions.login({
            token: res.data.token,
            name: res.data.userName,
            userId: res.data.userId,
          })
        );
        alert("Logged In");
        navigate("/");
      } catch (error) {
        console.log("error:", error);
        alert("User Not Found Or Network Error");
      }
    }
  };

  //-----------------------------------------------------------------------

  return (
    <>
      <Box position={"relative"}>
        <Container
          as={SimpleGrid}
          maxW={"7xl"}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}
        >
          <Stack spacing={{ base: 10, md: 20 }}>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
              m={"auto 0px"}
              zIndex={"1"}
            >
              Join Our App{" "}
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                &
              </Text>{" "}
              Stay Connect With Your{" "}
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                Near One's
              </Text>
            </Heading>
          </Stack>
          <Stack
            bg={"gray.50"}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
          >
            <Stack spacing={4}>
              <Heading
                color={"gray.800"}
                lineHeight={1.1}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              >
                Join our App{" "}
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text"
                >
                  !
                </Text>
              </Heading>
              <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
                More than 2 billion people in over 180 countries use our App to
                stay in touch with friends and family, anytime and anywhere.
              </Text>
            </Stack>
            <Box as={"form"} mt={10}>
              <Stack spacing={4}>
                <Input
                  ref={userName}
                  placeholder="Enter Your Name"
                  type="text"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Input
                  ref={userEmail}
                  type="email"
                  placeholder="Enter Your Gmail"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Input
                  type="password"
                  ref={userPassword}
                  placeholder="Enter Your Password"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Input
                  type="number"
                  ref={userPhoneno}
                  placeholder="Enter Your Phone No"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
              </Stack>
              <Button
                onClick={handleSubmit}
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, red.400,pink.400)",
                  boxShadow: "xl",
                }}
              >
                Login
              </Button>
              <Box>Or</Box>
              <Button
                onClick={handleSign}
                fontFamily={"heading"}
                w={"full"}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, red.400,pink.400)",
                  boxShadow: "xl",
                }}
              >
                SignUp
              </Button>
            </Box>
          </Stack>
        </Container>
        <Blur
          position={"absolute"}
          top={110}
          left={-10}
          style={{ filter: "blur(70px)" }}
        />
      </Box>
    </>
  );
};

export default Login;
