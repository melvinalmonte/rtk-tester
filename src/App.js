import React from "react";
import { connect } from "react-redux";
import { Box, HStack, Text, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { loadUsers } from "./redux/userSlice";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import {
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/stat";
import { decrement, increment } from "./redux/counterSlice";

function App({ loading, userData, loadUsers, count, decrement, increment }) {
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
              onClick={() => increment()}
              colorScheme="green"
              leftIcon={<AiOutlinePlus />}
            >
              Increase Counter{" "}
            </Button>
            <Button
              onClick={() => decrement()}
              colorScheme="red"
              leftIcon={<AiOutlineMinus />}
            >
              Decrease Counter
            </Button>
          </HStack>
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

const mapDispatchToProps = { loadUsers, decrement, increment };

export default connect(mapStateToProps, mapDispatchToProps)(App);
