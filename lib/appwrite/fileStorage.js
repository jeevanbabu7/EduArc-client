import { ID } from './appwrite';
import axios from 'axios';
import { Platform } from 'react-native';

// Appwrite API endpoint
const endpoint = "https://cloud.appwrite.io/v1";

/**
 * Uploads a file to Appwrite storage
 * @param {Object} file - The file object containing uri, name, mimeType
 * @param {String} projectId - The Appwrite project ID
 * @param {String} bucketId - The Appwrite storage bucket ID
 * @returns {Promise<Object>} - The upload response including fileId and fileUrl
 */
export const uploadFileToAppwrite = async (file, projectId, bucketId) => {
  if (!file) {
    throw new Error('No file provided');
  }
  
  if (!projectId || !bucketId) {
    throw new Error('Missing Appwrite configuration (projectId or bucketId)');
  }

  const uri = file.uri;
  const filename = file.name;
  const fileId = ID.unique();
  
  // Create headers with the correct authentication
  const headers = {
    'Content-Type': 'multipart/form-data',
    'X-Appwrite-Project': projectId,
  };
  
  // Direct upload using axios with formData
  const uploadUrl = `${endpoint}/storage/buckets/${bucketId}/files`;

  // Create a FormData object that includes the fileId
  const formData = new FormData();
  formData.append('fileId', fileId);
  formData.append('file', {
    uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
    name: filename,
    type: file.mimeType || 'application/pdf'
  });

  try {
    // Make the request
    const uploadResponse = await axios.post(uploadUrl, formData, { headers });
    console.log('Upload response:', uploadResponse.data);
    
    // Get the file URL
    const fileUrl = `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
    
    return {
      response: uploadResponse.data,
      fileId,
      fileUrl
    };
  } catch (error) {
    console.error('Error in uploadFileToAppwrite:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to upload file to Appwrite');
  }
};

/**
 * Deletes a file from Appwrite storage
 * @param {String} fileId - The ID of the file to delete
 * @param {String} projectId - The Appwrite project ID
 * @param {String} bucketId - The Appwrite storage bucket ID
 * @returns {Promise<Object>} - The deletion response
 */
export const deleteFileFromAppwrite = async (fileId, projectId, bucketId) => {
  if (!fileId || !projectId || !bucketId) {
    throw new Error('Missing required parameters (fileId, projectId, or bucketId)');
  }
  
  const headers = {
    'X-Appwrite-Project': projectId,
  };
  
  const deleteUrl = `${endpoint}/storage/buckets/${bucketId}/files/${fileId}`;
  
  try {
    const response = await axios.delete(deleteUrl, { headers });
    return response.data;
  } catch (error) {
    console.error('Error in deleteFileFromAppwrite:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to delete file from Appwrite');
  }
};

/**
 * Gets a file preview URL from Appwrite
 * @param {String} fileId - The ID of the file
 * @param {String} projectId - The Appwrite project ID
 * @param {String} bucketId - The Appwrite storage bucket ID
 * @returns {String} - The preview URL
 */
export const getFilePreviewUrl = (fileId, projectId, bucketId) => {
  if (!fileId || !projectId || !bucketId) {
    throw new Error('Missing required parameters (fileId, projectId, or bucketId)');
  }
  
  return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
};
