import { Box, Flex, Button, Icon, useMediaQuery } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import DashboardContent from "./components/DashboardContent";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (isSmallScreen) {
      setIsSidebarOpen(false);
    }
  }, [isSmallScreen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Flex align="stretch">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      {!isSidebarOpen && (
        <Button
          position="absolute"
          top="20px"
          left="20px"
          bg="gray.700"
          color="white"
          onClick={toggleSidebar}
          _hover={{ bg: "gray.600" }}
        >
          <Icon as={Menu} />
        </Button>
      )}

      {/* Main Content */}
      <Box flex="1" p={4} ml={isSidebarOpen ? "260px" : "70px"} transition="margin-left 0.3s ease-in-out">
        <DashboardContent />
      </Box>
    </Flex>
  );
}

export default App;
