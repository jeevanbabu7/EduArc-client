import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, ActivityIndicator, Image, SafeAreaView, Linking, Share, ToastAndroid, Platform, Alert, Clipboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import getEnvVars from '../config.js';
import { useLocalSearchParams } from 'expo-router';

export default function SuggestMaterial() {
  const [query, setQuery] = useState('');
  const [videoSuggestions, setVideoSuggestions] = useState([]);
  const [webResults, setWebResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('videos'); // 'videos' or 'web'
  const { courseData } = useLocalSearchParams();
  const course = courseData ? JSON.parse(courseData) : null;
  const { IP_ADDRESS } = getEnvVars();
  
  const searchVideos = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      // Call the API with the query in the body
      const response = await fetch(`${IP_ADDRESS}:3000/api/resources/videos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query })
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      
      const data = await response.json();
      setVideoSuggestions(data.videos || []);
    } catch (error) {
      console.error('Error searching for videos:', error);
      // Sample data as fallback
      setVideoSuggestions([
        {
          id: "L3Or435ozUs",
          title: "Sample Video About " + query,
          description: "This is a sample video description about " + query,
          thumbnail: "https://i.ytimg.com/vi/L3Or435ozUs/hqdefault.jpg",
          channelTitle: "Sample Channel",
          url: "https://www.youtube.com/watch?v=L3Or435ozUs"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  const searchWeb = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      // Call your backend API for web search results
      const response = await fetch(`${IP_ADDRESS}:3000/api/resources/web?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      
      if (response.ok && data.results) {
        setWebResults(data.results);
      } else {
        console.error('Failed to fetch web results:', data.message);
      }
    } catch (error) {
      console.error('Error searching the web:', error);
      // Expanded fallback sample data with more results
      setWebResults([
        {
          title: query + " - Wikipedia",
          link: "https://en.wikipedia.org/wiki/" + query.replace(/\s+/g, '_'),
          snippet: "This article is about " + query + ". " + query + " refers to a concept, idea, or topic that has been extensively documented...",
          source: "Wikipedia",
          favicon: "https://www.wikipedia.org/static/favicon/wikipedia.ico"
        },
        {
          title: "Understanding " + query + " | Educational Resource",
          link: "https://example.com/resource",
          snippet: "Learn about " + query + " with our comprehensive educational resources, examples, and practice materials.",
          source: "Educational Platform",
          favicon: "https://example.com/favicon.ico"
        },
        {
          title: query + " - Definition and Examples",
          link: "https://dictionary.com/" + query.toLowerCase(),
          snippet: "Definition of " + query + ": The term refers to a fundamental concept in the field of study related to education and learning.",
          source: "Dictionary.com",
          favicon: "https://www.dictionary.com/favicon.ico"
        },
        {
          title: "Learn " + query + " - Complete Course",
          link: "https://coursera.org/learn/" + query.toLowerCase(),
          snippet: "Master the fundamentals of " + query + " with this comprehensive online course. Includes practical exercises and quizzes.",
          source: "Coursera",
          favicon: "https://www.coursera.org/favicon.ico"
        },
        {
          title: query + " Tutorial for Beginners",
          link: "https://tutorialspoint.com/" + query.toLowerCase(),
          snippet: "This tutorial provides a complete understanding of " + query + " starting from the basics to advanced concepts.",
          source: "TutorialsPoint",
          favicon: "https://www.tutorialspoint.com/favicon.ico"
        },
        {
          title: "Latest Research on " + query,
          link: "https://scholar.google.com/scholar?q=" + query.replace(/\s+/g, '+'),
          snippet: "Recent academic papers and research publications related to " + query + " from leading researchers in the field.",
          source: "Google Scholar",
          favicon: "https://scholar.google.com/favicon.ico"
        },
        {
          title: query + " - Online Documentation",
          link: "https://docs.example.com/" + query.toLowerCase(),
          snippet: "Official documentation for " + query + " including API references, examples, and implementation guidelines.",
          source: "Official Documentation",
          favicon: "https://docs.example.com/favicon.ico"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSearch = () => {
    if (selectedTab === 'videos') {
      searchVideos();
    } else if (selectedTab === 'web') {
      searchWeb();
    }
  };
  
  // Handle opening videos in external app
  const openVideo = async (videoId) => {
    if (videoId) {
      const url = `https://www.youtube.com/watch?v=${videoId}`;
      // Check if the URL can be opened
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      }
    }
  };
  
  const openWebPage = async (url) => {
    // Check if the URL can be opened
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  };

  // Function to copy video URL to clipboard using React Native's Clipboard
  const copyVideoUrl = async (videoId) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    Clipboard.setString(videoUrl);
    
    // Show confirmation based on platform
    if (Platform.OS === 'android') {
      ToastAndroid.show('Video URL copied to clipboard', ToastAndroid.SHORT);
    } else {
      Alert.alert('Copied', 'Video URL copied to clipboard');
    }
  };
  
  // Function to share video URL
  const shareVideo = async (video) => {
    try {
      const videoUrl = `https://www.youtube.com/watch?v=${video.id}`;
      await Share.share({
        message: `Check out this video: ${video.title}\n${videoUrl}`,
        url: videoUrl, // iOS only
      });
    } catch (error) {
      console.error('Error sharing video:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{
          title: course ? `${course.name} - Suggestions` : 'Suggest Resources',
          headerBackTitle: 'Back',
        }}
      />
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter a topic or question..."
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'videos' && styles.activeTab]} 
          onPress={() => setSelectedTab('videos')}
        >
          <Text style={[styles.tabText, selectedTab === 'videos' && styles.activeTabText]}>Videos</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, selectedTab === 'web' && styles.activeTab]} 
          onPress={() => setSelectedTab('web')}
        >
          <Text style={[styles.tabText, selectedTab === 'web' && styles.activeTabText]}>Web</Text>
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0504aa" />
          <Text style={styles.loaderText}>Searching for resources...</Text>
        </View>
      ) : (
        <>
          {selectedTab === 'videos' ? (
            <FlatList
              data={videoSuggestions}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  {query ? "No videos found. Try a different search term." : "Search for YouTube videos above."}
                </Text>
              }
              renderItem={({ item }) => (
                <View style={styles.videoItem}>
                  <TouchableOpacity 
                    style={styles.thumbnailContainer}
                    onPress={() => openVideo(item.id)}
                  >
                    <Image 
                      source={{ uri: item.thumbnail }} 
                      style={styles.videoThumbnail}
                    />
                    <View style={styles.playButton}>
                      <Ionicons name="play" size={28} color="white" />
                    </View>
                  </TouchableOpacity>
                  <View style={styles.videoInfo}>
                    <Text style={styles.videoItemTitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <Text style={styles.channelTitle}>
                      {item.channelTitle}
                    </Text>
                    <Text style={styles.videoDescription} numberOfLines={2}>
                      {item.description}
                    </Text>
                    
                    {/* Add action buttons for videos */}
                    <View style={styles.videoActions}>
                      <TouchableOpacity 
                        style={styles.videoActionButton}
                        onPress={() => openVideo(item.id)}
                      >
                        <Ionicons name="play-circle-outline" size={20} color="#0504aa" />
                        <Text style={styles.videoActionText}>Watch</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        style={styles.videoActionButton}
                        onPress={() => copyVideoUrl(item.id)}
                      >
                        <Ionicons name="copy-outline" size={20} color="#0504aa" />
                        <Text style={styles.videoActionText}>Copy URL</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        style={styles.videoActionButton}
                        onPress={() => shareVideo(item)}
                      >
                        <Ionicons name="share-social-outline" size={20} color="#0504aa" />
                        <Text style={styles.videoActionText}>Share</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          ) : (
            <FlatList
              data={webResults}
              keyExtractor={(item, index) => `web-${index}`}
              ListEmptyComponent={
                <Text style={styles.emptyText}>
                  {query ? "No web results found. Try a different search term." : "Search for web results above."}
                </Text>
              }
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.webResultItem}
                  onPress={() => openWebPage(item.link)}
                >
                  <View style={styles.webResultHeader}>
                    {item.favicon && (
                      <Image 
                        source={{ uri: item.favicon }} 
                        style={styles.webResultFavicon} 
                        defaultSource={require('../assets/icons/analysis.png')}
                      />
                    )}
                    <View style={styles.webResultTitleContainer}>
                      <Text style={styles.webResultTitle} numberOfLines={2}>{item.title}</Text>
                      <Text style={styles.webResultSource}>{item.source}</Text>
                    </View>
                  </View>
                  <Text style={styles.webResultSnippet} numberOfLines={3}>
                    {item.snippet}
                  </Text>
                  <View style={styles.webResultFooter}>
                    <Text style={styles.webResultLink} numberOfLines={1}>{item.link}</Text>
                    <View style={styles.webResultActions}>
                      <TouchableOpacity style={styles.webResultAction}>
                        <Ionicons name="share-outline" size={18} color="#0504aa" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.webResultAction}>
                        <Ionicons name="bookmark-outline" size={18} color="#0504aa" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginRight: 8,
  },
  searchButton: {
    width: 48,
    height: 48,
    backgroundColor: '#0504aa',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0504aa',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#0504aa',
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  emptyText: {
    padding: 24,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  videoItem: {
    backgroundColor: 'white',
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 12,
  },
  thumbnailContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 60,
    height: 60,
    marginLeft: -30,
    marginTop: -30,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoInfo: {
    paddingTop: 6,
  },
  videoItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  channelTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  videoDescription: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
    marginBottom: 10,
  },
  videoActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  videoActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 4,
  },
  videoActionText: {
    fontSize: 12,
    color: '#0504aa',
    marginLeft: 4,
  },
  webResultItem: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    margin: 8,
    marginTop: 4,
    marginBottom: 12,
  },
  webResultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  webResultFavicon: {
    width: 16,
    height: 16,
    marginRight: 8,
    borderRadius: 2,
  },
  webResultTitleContainer: {
    flex: 1,
  },
  webResultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0504aa',
    marginBottom: 2,
  },
  webResultSource: {
    fontSize: 12,
    color: '#666',
  },
  webResultSnippet: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginBottom: 10,
  },
  webResultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  webResultLink: {
    fontSize: 12,
    color: '#0e7335',
    flex: 1,
  },
  webResultActions: {
    flexDirection: 'row',
  },
  webResultAction: {
    padding: 6,
    marginLeft: 10,
  },
});
