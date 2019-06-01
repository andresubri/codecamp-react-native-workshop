import { AsyncStorage } from 'react-native';

const save = async (key, item) => 
    await AsyncStorage.setItem(key, JSON.stringify(item));

const load = async key => JSON.parse(await AsyncStorage.getItem(key));

const loadAll = async () => {
    const keys = await AsyncStorage.getAllKeys();
    return await AsyncStorage.multiGet(keys);
}

const exist = async key => {
    const keys = await AsyncStorage.getAllKeys();
    return keys.includes(key);
}

const remove = key => AsyncStorage.removeItem(key);

export default {
    save,
    load,
    loadAll,
    remove,
    exist,
}