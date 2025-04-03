import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

const ViewMaterial = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get material URL from params
  const { materialUrl, materialId, title } = params;
  
  useEffect(() => {
    console.log("Material URL to load:", materialUrl);
  }, [materialUrl]);
  
  // Handle back button press
  const handleBack = () => {
    router.back();
  };

  // Generate appropriate source for the content type
  const getWebViewSource = () => {
    // Check if URL is a PDF
    if (materialUrl?.toLowerCase().endsWith('.pdf')) {
      // Return PDF with Google Docs viewer as fallback 
      return { 
        uri: `https://docs.google.com/viewer?url=${encodeURIComponent(materialUrl)}&embedded=true`,
        headers: {
          'Cache-Control': 'no-cache',
        }
      };
    }
    // Return original URL for other file types
    return { uri: materialUrl };
  };

  // Render loading state
  if (loading && !materialUrl) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0504aa" />
        <Text style={styles.loadingText}>Loading document...</Text>
      </View>
    );
  }

  // Render error state
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={50} color="#ff4d4d" />
        <Text style={styles.errorText}>Failed to load document</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButtonHeader} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#0504aa" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title || 'View Document'}
        </Text>
      </View>
      
      {/* Document viewer */}
      <WebView
        source={getWebViewSource()}
        style={styles.webview}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error("WebView error:", nativeEvent);
          setError(nativeEvent.description || 'Failed to load document');
          setLoading(false);
        }}
        startInLoadingState={true}
        originWhitelist={['*']} // Allow all origins for Expo testing
        renderLoading={() => (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#0504aa" />
          </View>
        )}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        mixedContentMode="always"
        scalesPageToFit={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButtonHeader: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#0504aa',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ViewMaterial;
