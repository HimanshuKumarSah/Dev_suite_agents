import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { getProducts } from '../services/api';
import useStore from '../store/useStore';

const HomeScreen = ({ navigation }) => {
  const [featured, setFeatured] = useState([]);
  const [trending, setTrending] = useState([]);
  const categories = ['Decks', 'Wheels', 'Apparel', 'Accessories'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProducts();
        setFeatured(res.data.filter(p => p.featured));
        setTrending(res.data.filter(p => p.trending));
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView className="flex-1 bg-background">
      {/* Hero Section */}
      <View className="bg-primary p-6 h-64 justify-end">
        <Text className="text-secondary text-3xl font-bold">New Drop: Pro Series</Text>
        <TouchableOpacity 
          className="mt-4 bg-secondary w-32 py-2 items-center rounded"
          onPress={() => navigation.navigate('Products', { category: 'Decks' })}
        >
          <Text className="font-bold">Shop Now</Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View className="py-6">
        <Text className="px-4 text-xl font-bold mb-4">Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
          {categories.map(cat => (
            <TouchableOpacity 
              key={cat} 
              className="bg-white px-6 py-3 rounded-full mr-3 border border-gray-200"
              onPress={() => navigation.navigate('Products', { category: cat })}
            >
              <Text className="font-bold">{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Trending Grid */}
      <View className="px-4 pb-10">
        <Text className="text-xl font-bold mb-4">Trending Now</Text>
        <View className="flex-row flex-wrap justify-between">
          {trending.map(item => (
            <TouchableOpacity 
              key={item._id} 
              className="bg-white w-[48%] mb-4 rounded-lg overflow-hidden shadow-sm"
              onPress={() => navigation.navigate('ProductDetail', { id: item._id })}
            >
              <Image source={{ uri: item.images[0] }} className="h-40 w-full" />
              <View className="p-2">
                <Text className="font-bold" numberOfLines={1}>{item.name}</Text>
                <Text className="text-accent font-bold">${item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;