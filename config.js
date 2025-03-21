import Constants from 'expo-constants';

const ENV = {
  dev: {
    IP_ADDRESS: 'http://192.168.43.187',
    COLLEGE_IP_ADDRESS: "http://172.16.33.57",
    PORT: '5000',
    APPWRITE_PROJECT_ID: '67bcccfe0010a29974a4',
    APPWRITE_PLATFORM: 'com.gcek.eduarc',
    PDF_BUCKET_ID: '67bccd990005a5d175c4',
    COHERE_API_KEY: 'BXwcyHn8jv7a1Rk1TxZmrIc7bTlmGKVHTsRgu53h',
    HOME_IP_ADDRESS: '192.168.1.7'
  },
  prod: {
    API_URL: 'https://your-production-url.com',
    PORT: '80',
    PDF_BUCKET_ID: 'your-pdf-bucket-id',
  },
};

const getEnvVars = (env = Constants.manifest2?.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  } else if (env === 'production') {
    return ENV.prod;
  } else {
    return ENV.dev;
  }
};

export default getEnvVars;
