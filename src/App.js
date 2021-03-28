import React from "react";
import { connect } from "react-redux";
import { Box, HStack, Text, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { loadUsers } from "./redux/userSlice";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { CgMoon, CgSun } from "react-icons/cg";
import {
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/stat";
import {
  decrement,
  decrementByAmount,
  increment,
  incrementByAmount,
} from "./redux/counterSlice";
import { FormControl } from "@chakra-ui/form-control";
import { FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useColorMode } from "@chakra-ui/color-mode";
import { IconButton } from "@chakra-ui/button";

function App({
  loading,
  userData,
  loadUsers,
  count,
  decrement,
  increment,
  incrementByAmount,
  decrementByAmount,
}) {
  const [increaseBy, setIncreaseBy] = React.useState(0);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box p={3}>
      <VStack spacing={3}>
        <Box w="100%">
          <HStack>
            <Button
              colorScheme="blue"
              isLoading={loading}
              onClick={() => loadUsers()}
            >
              {userData.length > 0 ? "Reload" : "Load"}
            </Button>
            <Button
              onClick={() =>
                increaseBy !== 0 ? incrementByAmount(increaseBy) : increment()
              }
              colorScheme="green"
              leftIcon={<AiOutlinePlus />}
            >
              {increaseBy !== 0
                ? `Increase counter by ${increaseBy}`
                : "Increase Counter"}
            </Button>
            <Button
              onClick={() =>
                increaseBy !== 0 ? decrementByAmount(increaseBy) : decrement()
              }
              colorScheme="red"
              leftIcon={<AiOutlineMinus />}
            >
              {increaseBy !== 0
                ? `Decrease counter by ${increaseBy}`
                : "Decrease Counter"}
            </Button>
            <IconButton
              onClick={() => toggleColorMode()}
              icon={colorMode === "light" ? <CgMoon /> : <CgSun />}
            />
          </HStack>
        </Box>
        <Box w="100%">
          <FormControl>
            <FormLabel>Increase/Decrease count by:</FormLabel>
            <Input
              w="10%"
              type="number"
              onChange={(e) => setIncreaseBy(e.target.valueAsNumber)}
            />
          </FormControl>
        </Box>
        <Box w="100%">
          <Stat>
            <StatLabel>Counter</StatLabel>
            <StatNumber>{count}</StatNumber>
            <StatHelpText>
              {count === 0 && "--"}
              {count > 0 && <StatArrow type="increase" />}
              {count < 0 && <StatArrow type="decrease" />}
            </StatHelpText>
          </Stat>
        </Box>

        {loading ? (
          <Box w="100%">
            {" "}
            <Text fontSize="sm">Loading user list...</Text>
          </Box>
        ) : (
          <Box w="100%">
            {userData.length === 0 ? null : (
              <>
                <Table as="table" variant="striped">
                  <Thead>
                    <Tr as="tr">
                      <Th>Username</Th>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Phone</Th>
                      <Th>Website</Th>
                    </Tr>
                  </Thead>
                  <Tbody as="tbody">
                    {userData.map((user) => (
                      <Tr as="tr" key={user.id}>
                        <Td>{user.username}</Td>
                        <Td>{user.name}</Td>
                        <Td>{user.email}</Td>
                        <Td>{user.phone}</Td>
                        <Td>{user.website}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </>
            )}
          </Box>
        )}
      </VStack>
    </Box>
  );
}
const mapStateToProps = (state) => ({
  count: state.counter.value,
  loading: state.users.loading,
  userData: state.users.data,
});

const mapDispatchToProps = {
  loadUsers,
  decrement,
  increment,
  incrementByAmount,
  decrementByAmount,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
