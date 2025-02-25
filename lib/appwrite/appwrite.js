import { Client, Account, ID, Storage } from 'react-native-appwrite';

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject('67bcccfe0010a29974a4')
    .setPlatform('com.gcek.eduarc');

const account = new Account(client);
const storage = new Storage(client);
export { account, ID, storage };

export default client;