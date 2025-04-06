import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  Input, 
  InputField, 
  Button, 
  ButtonText, 
  HStack, 
  Divider,
  Tabs,
  TabsTab,
  TabsTabList,
  TabsTabPanel,
  TabsTabPanels
} from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

// Insert your API keys here
const GOOGLE_API_KEY = "AIzaSyCivqSn3k6vRxf30W5AN6QqOf2VuV-6t8U";
const CUSTOM_SEARCH_ENGINE_ID = "21211550423cd4fa1";

export default function SuggestMaterial() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [webResults, setWebResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchWeb = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${CUSTOM_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`
      );
      console.log("Web search response:", response.data);

      // Parse and set web results
      setWebResults(response.data.items || []);
    } catch (error) {
      console.error('Error searching the web:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!query.trim()) return;

    setLoading(true);
    console.log("searching....");
    searchWeb();
  };

  const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error('Error opening URL:', err));
  };

  const renderSearchResultItem = (item, index) => {
    return (
      <TouchableOpacity key={index} onPress={() => openLink(item.formattedUrl)}>
        <Box p="$3" borderWidth={1} borderColor="$gray200" borderRadius="$md" mb="$3">
          <Text color="$blue600" fontWeight="$bold" numberOfLines={1}>
            {item.title || "No title available"}
          </Text>
          <Text color="$green600" size="xs" numberOfLines={1}>
            {item.displayLink || "No link available"}
          </Text>
          <Text size="sm" numberOfLines={3} mt="$1">
            {item.snippet || "No description available"}
          </Text>
        </Box>
      </TouchableOpacity>
    );
  };

  const renderLoadingState = () => (
    <Box flex={1} justifyContent="center" alignItems="center">
      <ActivityIndicator size="large" color="#4D75F9" />
      <Text mt="$2" color="$gray600">Searching...</Text>
    </Box>
  );

  return (
    <Box flex={1} bg="$white" safeAreaTop>
      <VStack space="md" p="$4" flex={1}>
        {/* Header */}
        <Box>
          <HStack alignItems="center" space="sm">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#4D75F9" />
            </TouchableOpacity>
            <Heading size="xl" color="$blue600">Suggest Material</Heading>
          </HStack>
        </Box>
        
        {/* Search input */}
        <VStack space="sm" mb="$4">
          <HStack space="sm" alignItems="center">
            <Input flex={1} variant="outline" size="md" borderColor="$blue400">
              <InputField
                placeholder="Enter your query..." 
                value={query}
                onChangeText={setQuery}
              />
            </Input>
            <TouchableOpacity>
              <Button onPress={handleSearch} bg="$blue600">
                <ButtonText>Search</ButtonText>
              </Button>
            </TouchableOpacity>
          </HStack>
          <Text size="sm" color="$gray600">
            Search for educational resources, articles, and more
          </Text>
        </VStack>

        {/* Web Search Results */}
        <ScrollView showsVerticalScrollIndicator={false} flex={1}>
          {loading ? (
            <Box flex={1} justifyContent="center" alignItems="center">
              <ActivityIndicator size="large" color="#4D75F9" />
              <Text mt="$2" color="$gray600">Searching...</Text>
            </Box>
          ) : (
            <VStack space="md" p="$1">
              {webResults.length === 0 ? (
                <Text textAlign="center" py="$10">
                  {query ? "No results found" : "Search the web for educational resources"}
                </Text>
              ) : (
                <>
                  <Text size="xs" color="$gray600" mb="$2">
                    {`About ${webResults.length} results found`}
                  </Text>
                  {webResults.map((item, index) => renderSearchResultItem(item, index))}
                </>
              )}
            </VStack>
          )}
        </ScrollView>
      </VStack>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
