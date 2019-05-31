import { AsyncStorage } from 'react-native';

const save = async (key, item) => 
    await AsyncStorage.setItem(key, item);

const load = async key => await AsyncStorage.getItem(key);

const loadAll = async () => {
    const keys = await AsyncStorage.getAllKeys();
    return await AsyncStorage.multiGet(keys);
}

const remove = async key => await AsyncStorage.removeItem(key);

export default {
    save,
    load,
    loadAll,
    remove,
}