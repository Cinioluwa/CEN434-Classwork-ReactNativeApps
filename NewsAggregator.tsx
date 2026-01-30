import type { JSX } from 'react';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface NewsItem {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

const NewsAggregator = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Replace 'YOUR_API_KEY' with your actual NewsAPI key
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=XXXXXXXXXXXXXX'); <- Removed the API key lol
        const data = await response.json();
        if (data.status === 'ok') {
          setNews(data.articles);
        } else {
          console.error('Error fetching news:', data.message);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const renderNewsItem: ({ item }: { item: NewsItem }) => JSX.Element = ({ item }) => (
    <TouchableOpacity style={styles.newsItem} onPress={() => Linking.openURL(item.url)}>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsDescription}>{item.description}</Text>
      <Text style={styles.newsSource}>{item.source.name} - {new Date(item.publishedAt).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>News Aggregator</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#1a4d2e" />
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderNewsItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginHorizontal: 15,
    backgroundColor: '#f0f9ff',
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
    color: '#065f46',
    textDecorationLine: 'underline',
  },
  newsItem: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#10b981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 5,
    borderLeftColor: '#10b981',
  },
  newsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1f2937',
  },
  newsDescription: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 10,
    lineHeight: 22,
  },
  newsSource: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
    textAlign: 'right',
  },
});

export default NewsAggregator;
