import { Box, SimpleGrid, Text, VStack, HStack, Icon, useBreakpointValue } from "@chakra-ui/react";
import { FaUsers, FaClock, FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer as LineChartContainer } from "recharts";
import ActivityLog from "./ActivityLog";

const activityData = [
  { name: "1 Sep", users: 400 },
  { name: "2 Sep", users: 800 },
  { name: "3 Sep", users: 600 },
  { name: "4 Sep", users: 1000 },
  { name: "5 Sep", users: 500 },
  { name: "6 Sep", users: 700 },
];

const userCategories = [
  { name: "Staff", value: 101, color: "#8884d8" },
  { name: "Students", value: 180, color: "#82ca9d" },
  { name: "Other", value: 180, color: "#ff8042" },
];

const authMethods = [
  { name: "Microsoft", value: 100, color: "#3182ce" },
  { name: "Internal", value: 100, color: "#38a169" },
  { name: "SAML", value: 100, color: "#d69e2e" },
];

const DashboardContent = () => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <Box flex="1" p={15} bg="gray.50" minH="100vh">
      <SimpleGrid columns={[1, 3]} spacing={6}>
        {[
          { title: "Daily Active Users", value: "1,051", icon: FaUsers, color: "blue.500", bg: "blue.100" },
          { title: "Monthly Active Users", value: "1,200", icon: FaChartLine, color: "pink.500", bg: "pink.100" },
          { title: "Daily Time Per User", value: "1.5 hrs", icon: FaClock, color: "purple.500", bg: "purple.100" },
        ].map((item, index) => (
          <motion.div key={index} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <Box 
              p={5} 
              bg={item.bg} 
              borderRadius="lg" 
              shadow="md" 
              textAlign="center"
              borderLeftWidth="4px"
              borderLeftColor={item.color}
              color={"black"}
            >
              <Icon as={item.icon} boxSize={8} color={item.color} />
              <Text fontSize="lg" fontWeight="bold" mt={2}>{item.title}</Text>
              <Text fontSize="2xl" color={item.color} fontWeight="bold">{item.value}</Text>
            </Box>
          </motion.div>
        ))}
      </SimpleGrid>

      <SimpleGrid columns={isSmallScreen ? 1 : 2} spacing={6} mt={6} color={"black"}>
        <Box bg="white" p={6} borderRadius="lg" shadow="md">
          <Text fontSize="lg" fontWeight="bold" mb={4} color={"black"}>User Activity</Text>
          <LineChartContainer width="100%" height={isSmallScreen ? 250 : 300}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fill: "#4A5568" }} />
              <YAxis tick={{ fill: "#4A5568" }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#2D3748", color: "#fff", borderRadius: "8px" }}
                cursor={{ stroke: "#3182ce", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3182ce"
                strokeWidth={3}
                dot={{ r: 6, fill: "#3182ce", stroke: "#fff", strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </LineChartContainer>
        </Box>

        <Box bg="white" p={6} borderRadius="lg" shadow="md">
          <Text fontSize="lg" fontWeight="bold" mb={4} color={"black"}>Daily Active Users</Text>

          <HStack align="center" justify="space-between" flexDirection={isSmallScreen ? "column" : "row"}>
            <VStack align={isSmallScreen ? "center" : "start"} spacing={3} mb={isSmallScreen ? 4 : 0}>
              {userCategories.map((category, index) => (
                <Text key={index} fontSize="md" fontWeight="medium" color={"black"}>
                  <span style={{ color: category.color, fontSize: "1.2em" }}>●</span> {category.name} - {category.value}
                </Text>
              ))}
            </VStack>

            <ResponsiveContainer width={isSmallScreen ? "100%" : "60%"} height={isSmallScreen ? 250 : 300}>
              <PieChart>
                <Pie 
                  data={userCategories} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={isSmallScreen ? 80 : 90} 
                  label
                >
                  {userCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </HStack>

          <Text fontSize="md" fontWeight="bold" mt={6} mb={2} color={"black"}>By Authentication Method</Text>
          <VStack align="start" spacing={3} w="full">
            {authMethods.map((method, index) => (
              <HStack key={index} w="full">
                <Text fontSize="md" fontWeight="medium" flex="1" color={"black"}>{method.name}</Text>
                <Box flex="3" bg="gray.200" borderRadius="full" h="6px" overflow="hidden">
                  <Box bg={method.color} h="6px" w={`${method.value}%`} />
                </Box>
                <Text fontSize="md" fontWeight="bold" minW="50px" textAlign="right">{method.value}</Text>
              </HStack>
            ))}
          </VStack>
        </Box>
      </SimpleGrid>

      <ActivityLog />
    </Box>
  );
};

export default DashboardContent;
