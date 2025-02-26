import { Box, VStack, Text, HStack, Icon, Button, useMediaQuery } from "@chakra-ui/react";
import { Home, BarChart, ClipboardList, Book, ShoppingCart, X, Aperture } from "lucide-react";
import { useState, useEffect } from "react";

const menuItems = [
  { label: "Dashboard", icon: Home },
  { label: "Data Lab", icon: BarChart },
  { label: "Surveys", icon: ClipboardList },
  { label: "Library", icon: Book },
  { label: "Marketplace", icon: ShoppingCart },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (isSmallScreen) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isSmallScreen]);

  return (
    <Box
      position="fixed"
      left={isOpen ? "0" : collapsed ? "-70px" : "-280px"}
      w={collapsed ? "70px" : "280px"}
      minH="100vh"
      bg="linear-gradient(180deg,rgb(0, 14, 34),rgb(0, 19, 66))"
      color="white"
      p={4}
      boxShadow="2xl"
      transition="left 0.3s ease-in-out, width 0.3s ease-in-out"
      borderRight="2px solid rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(8px)"
      onMouseEnter={() => isSmallScreen && setCollapsed(false)}
      onMouseLeave={() => isSmallScreen && setCollapsed(true)}
    >
      <HStack justifyContent="space-between" mb={6} px={collapsed ? 0 : 2}>
        <HStack spacing={collapsed ? 0 : 2}>
          <Icon as={Aperture} boxSize={7} color="cyan.300" />
          {!collapsed && (
            <Text
              fontSize="3xl"
              fontWeight="bold"
              textAlign="center"
              letterSpacing="wide"
              bgGradient="linear(to-r, #4F46E5, #2563EB)"
              bgClip="text"
            >
              InfoSphere
            </Text>
          )}
        </HStack>
        {!collapsed && (
          <Button onClick={toggleSidebar} bg="transparent" _hover={{ bg: "#1E3A8A" }}>
            <Icon as={X} color="white" boxSize={7} />
          </Button>
        )}
      </HStack>

      <VStack align="start" spacing={4} mt={2} w="100%">
        {menuItems.map((item, index) => (
          <HStack
            key={index}
            w="100%"
            p={3}
            borderRadius="lg"
            transition="0.3s"
            bg={activeItem === item.label ? "rgba(37, 99, 235, 0.3)" : "transparent"}
            _hover={{
              bg: "rgba(10, 33, 83, 0.6)",
              transform: "scale(1.05)",
              boxShadow: "0px 0px 15px rgba(0, 11, 34, 0.6)",
            }}
            cursor="pointer"
            onClick={() => setActiveItem(item.label)}
            justifyContent={collapsed ? "center" : "flex-start"}
          >
            <Icon as={item.icon} boxSize={6} color="white" />
            {!collapsed && <Text fontSize="lg" fontWeight="medium">{item.label}</Text>}
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
