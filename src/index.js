import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const QuizApp = () => {
    const navigation = useNavigation()

    return(
        <View style={styles.container}>
            <View style={styles.categoryContainer}>
                <TouchableOpacity 
                style={styles.category}
                onPress={() => navigation.navigate('Playground', {category: 'science'})}>
                    <Text style={styles.categoryTitle}>Science</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.category}
                onPress={() => navigation.navigate('Playground', {category: 'technology'})}>
                    <Text style={styles.categoryTitle}>Technologie</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={styles.category}
                onPress={() => navigation.navigate('Playground', {category: 'sports'})}>
                    <Text style={styles.categoryTitle}>Sports</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default QuizApp

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    category: {
        width: 150,
        height: 150,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000000',
    }
  });