import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALL_JOBS, ALL_USERS, MY_PROFILE, Job, User, MY_FRIENDS } from './mockData';

// --- NEW FEATURES ---
// 1. Loading state for async storage
// 2. removeFriend function
// 3. Persistence with AsyncStorage

const FRIENDS_STORAGE_KEY = 'my-friends-list';

interface IDataContext {
  loading: boolean; // <-- NEW
  profile: User;
  friends: User[];
  nonFriends: User[];
  jobs: Job[];
  addFriend: (user: User) => void;
  removeFriend: (user: User) => void; // <-- NEW
}

const defaultValue: IDataContext = {
  loading: true,
  profile: MY_PROFILE,
  friends: [],
  nonFriends: [],
  jobs: [],
  addFriend: () => {},
  removeFriend: () => {},
};

const DataContext = createContext<IDataContext>(defaultValue);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState<User[]>([]);
  const [nonFriends, setNonFriends] = useState<User[]>([]);

  // Load saved friends on app start
  useEffect(() => {
    const loadState = async () => {
      try {
        setLoading(true);
        // Simulate a network delay
        await new Promise(res => setTimeout(res, 1000)); 
        
        const savedFriendsJson = await AsyncStorage.getItem(FRIENDS_STORAGE_KEY);
        const savedFriends: User[] = savedFriendsJson ? JSON.parse(savedFriendsJson) : MY_FRIENDS;
        
        setFriends(savedFriends);

        // Calculate non-friends based on loaded friends
        const friendIds = new Set(savedFriends.map(f => f.id));
        setNonFriends(ALL_USERS.filter(u => !friendIds.has(u.id)));

      } catch (e) {
        console.error("Failed to load app state", e);
        setFriends(MY_FRIENDS); // Fallback
      } finally {
        setLoading(false);
      }
    };

    loadState();
  }, []);

  // Helper to save friends to storage
  const saveFriends = async (newFriends: User[]) => {
    try {
      const jsonValue = JSON.stringify(newFriends);
      await AsyncStorage.setItem(FRIENDS_STORAGE_KEY, jsonValue);
    } catch (e) {
      console.error("Failed to save friends", e);
    }
  };

  const addFriend = (user: User) => {
    const newFriends = [user, ...friends];
    setFriends(newFriends);
    setNonFriends(current => current.filter(u => u.id !== user.id));
    saveFriends(newFriends); // <-- Save on change
  };

  const removeFriend = (user: User) => {
    const newFriends = friends.filter(f => f.id !== user.id);
    setFriends(newFriends);
    setNonFriends(current => [user, ...current]);
    saveFriends(newFriends); // <-- Save on change
  };

  return (
    <DataContext.Provider
      value={{
        loading, // <-- Pass loading state
        profile: MY_PROFILE,
        jobs: ALL_JOBS,
        friends,
        nonFriends,
        addFriend,
        removeFriend, // <-- Pass remove function
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}