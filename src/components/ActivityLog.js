import { Box, Text, HStack, Icon, Badge, Button } from "@chakra-ui/react";
import { FileText, CheckCircle, User, UserPlus, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const activities = [
  { id: 1, text: "John permissions changed to admin by admin123", time: "10:30 AM", icon: FileText, bgColor: "blue.200", textColor: "blue.700" },
  { id: 2, text: "Admin approved a request", time: "9:15 AM", icon: CheckCircle, bgColor: "green.200", textColor: "green.700" },
  { id: 3, text: "Sarah successfully logged in", time: "8:45 AM", icon: User, bgColor: "purple.200", textColor: "purple.700" },
  { id: 4, text: "Kumar successfully logged in", time: "8:00 AM", icon: UserPlus, bgColor: "orange.200", textColor: "orange.700" },
  { id: 5, text: "Emma shared a document", time: "6:50 AM", icon: FileText, bgColor: "pink.200", textColor: "pink.700" },
];

const ActivityLog = () => {
  const carouselRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (carouselRef.current) {
        setShowArrows(carouselRef.current.scrollWidth > carouselRef.current.clientWidth);
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  return (
    <Box bg="white" p={6} borderRadius="lg" mt={4} boxShadow="2xl" position="relative" w="1000px">
      <Text fontSize="xl" fontWeight="bold" mb={4} color="gray.700">
        Activity Log
      </Text>

      {showArrows && (
        <>
          <Button 
            position="absolute" left={0} top="50%" transform="translateY(-50%)" zIndex={2}
            bg="gray.300" _hover={{ bg: "gray.400" }} boxShadow="lg"
            onClick={scrollLeft}
          >
            <ArrowLeft />
          </Button>
          <Button 
            position="absolute" right={-30} top="50%" transform="translateY(-50%)" zIndex={2}
            bg="gray.300" _hover={{ bg: "gray.400" }} boxShadow="lg"
            onClick={scrollRight}
          >
            <ArrowRight />
          </Button>
        </>
      )}

      <HStack 
        ref={carouselRef} 
        spacing={5} 
        overflowX="auto" 
        w="100%" 
        p={2} 
        sx={{ scrollSnapType: "x mandatory", display: "flex", whiteSpace: "nowrap" }}
      >
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            whileHover={{ scale: 1.1, rotate: 1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Box 
              p={5} minW="180px" 
              bg={activity.bgColor} 
              borderRadius="lg" boxShadow="xl"
              _hover={{ bg: `${activity.bgColor.split('.')[0]}.300` }} 
              textAlign="center"
              transition="0.3s"
              sx={{ scrollSnapAlign: "center" }}
            >
              <Icon as={activity.icon} boxSize={7} color={activity.textColor} />
              <Text mt={2} fontSize="md" fontWeight="bold" color={activity.textColor}>{activity.text}</Text>
              <Badge colorScheme="gray" fontSize="0.8em" px={2} py={1} borderRadius="md" color={"black"}>{activity.time}</Badge>
            </Box>
          </motion.div>
        ))}
      </HStack>
    </Box>
  );
};

export default ActivityLog;
