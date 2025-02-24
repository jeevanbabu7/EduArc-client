import { Client, Account, ID } from 'react-native-appwrite';

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject('67951a4700142083755e')
    .setPlatform('com.gcek.eduarc');

const account = new Account(client);
export { account, ID };

export default client;