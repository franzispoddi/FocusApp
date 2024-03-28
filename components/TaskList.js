import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const userToken = await AsyncStorage.getItem('userToken'); // Assuming you've saved the token as 'userToken'
      if (!userToken) {
        console.error('No user token found');
        return;
      }

      try {
        const response = await fetch(`${Config.API_URL}/api/tasks`, { // Use your API URL from .env
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={styles.taskItem}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          {/* Add more details as needed */}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  taskItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  taskTitle: {
    fontSize: 18,
  },
  // Add more styles as needed
});

export default TaskList;